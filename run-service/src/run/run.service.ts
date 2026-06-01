import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import axios from 'axios';

@Injectable()
export class RunService {
  constructor(private prisma: PrismaService) {}

  private formatRunData(run: any) {
    const seconds = Number(run.run_duration);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return {
      ...run,
      run_duration: seconds,
      run_duration_formatted: `${h} Hour(s) ${m} Minute(s) ${s} Second(s)`,
    };
  }

  async getRunsByCategory(categoryId: string) {
    try {
      await axios.get(`http://localhost:3001/categories/${categoryId}`);
    } catch (error) {
      throw new NotFoundException('Run category id does not exist.');
    }

    const runs = await this.prisma.runs.findMany({
      where: { run_category_id: categoryId, status: 'ACCEPTED' },
      orderBy: { run_duration: 'asc' },
    });

    return await Promise.all(runs.map(async (run) => {
      let runner = null;
      try {
        const userRes = await axios.get(`http://localhost:3000/users/${run.user_id}/profile`);
        runner = userRes.data;
      } catch(e) {}
      return { ...this.formatRunData(run), runner };
    }));
  }

  async getRunsByUser(targetUserId: string, authUserId: string) {
    const isOwner = targetUserId === authUserId;
    const whereClause: any = { user_id: targetUserId };

    if (!isOwner) {
      whereClause.status = 'ACCEPTED';
    }

    const runs = await this.prisma.runs.findMany({
      where: whereClause,
      orderBy: { submitted_at: 'desc' },
    });

    return runs.map(run => this.formatRunData(run));
  }

  async getRunDetails(runId: string) {
    const run = await this.prisma.runs.findUnique({
      where: { run_id: runId },
    });

    if (!run) throw new NotFoundException('Run not found.');

    const comments = await this.prisma.comments.findMany({
      where: { run_id: runId },
    });

    let runnerInfo = null;
    let categoryInfo = null;
    try {
      const userRes = await axios.get(`http://localhost:3000/users/${run.user_id}/profile`);
      runnerInfo = userRes.data;
      const catRes = await axios.get(`http://localhost:3001/categories/${run.run_category_id}`);
      categoryInfo = catRes.data;
    } catch(e) {}

    return {
      ...this.formatRunData(run),
      runnerInfo,
      categoryInfo,
      comments,
    };
  }

  async createRun(dto: CreateRunDto, userId: string) {
    try {
      await axios.get(`http://localhost:3001/categories/${dto.run_category_id}`);
    } catch (error) {
      throw new BadRequestException('Run category id does not exist.');
    }

    await this.prisma.runs.create({
      data: {
        run_category_id: dto.run_category_id,
        user_id: userId,
        vod_url: dto.vod_url,
        run_duration: dto.run_duration,
        submitted_at: new Date(),
        status: 'PENDING',
      },
    });
    return { message: 'Run entry created successfully. Status: PENDING.' };
  }

  async createComment(dto: CreateCommentDto, authUserId: string) {
    if (dto.user_id !== authUserId) {
      throw new ForbiddenException('User ID does not match the authenticated user.');
    }

    const runExists = await this.prisma.runs.findUnique({ where: { run_id: dto.run_id } });
    if (!runExists) throw new NotFoundException('Run ID does not exist.');

    await this.prisma.comments.create({
      data: {
        run_id: dto.run_id,
        user_id: authUserId,
        comment: dto.comment,
        created_at: new Date(),
      },
    });
    return { message: 'Comment created successfully.' };
  }

  async deleteComment(commentId: string, authUserId: string) {
    const comment = await this.prisma.comments.findUnique({ where: { comment_id: commentId } });
    if (!comment) throw new NotFoundException('Comment not found.');

    if (comment.user_id !== authUserId) {
      throw new ForbiddenException('You can only delete your own comments.');
    }

    await this.prisma.comments.delete({ where: { comment_id: commentId } });
    return { message: 'Comment deleted successfully.' };
  }

  async getRunsByStatus(status: string) {
    const runs = await this.prisma.runs.findMany({
      where: { status: status.toUpperCase() },
    });
    return runs.map(run => this.formatRunData(run));
  }

  async acceptRun(runId: string) {
    await this.prisma.runs.update({
      where: { run_id: runId },
      data: { status: 'ACCEPTED', verified_at: new Date() },
    });
    return { message: 'Run accepted.' };
  }

  async rejectRun(runId: string) {
    await this.prisma.runs.update({
      where: { run_id: runId },
      data: { status: 'REJECTED', verified_at: new Date() },
    });
    return { message: 'Run rejected.' };
  }
}