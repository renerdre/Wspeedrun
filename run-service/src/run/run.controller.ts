import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RunService } from './run.service';
import { CreateRunDto } from './dto/create-run.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Runs & Comments Management')
@Controller()
export class RunController {
  constructor(private readonly runService: RunService) {}

  @Get('runs/:id/category')
  @ApiOperation({ summary: 'Melihat seluruh daftar speedrun yang di-accept berdasarkan kategori' })
  getRunsByCategory(@Param('id') id: string) {
    return this.runService.getRunsByCategory(id);
  }

  @Get('runs/:id')
  @ApiOperation({ summary: 'Melihat detail komprehensif dari sebuah speedrun' })
  getRunDetails(@Param('id') id: string) {
    return this.runService.getRunDetails(id);
  }

  @Get('runs/:id/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Melihat histori speedrun berdasarkan user ID' })
  getRunsByUser(@Param('id') targetUserId: string, @Request() req: any) {
    return this.runService.getRunsByUser(targetUserId, req.user.userId);
  }

  @Post('runs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mensubmit entri speedrun baru' })
  createRun(@Body() createRunDto: CreateRunDto, @Request() req: any) {
    return this.runService.createRun(createRunDto, req.user.userId);
  }

  @Post('comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Menambahkan komentar pada sebuah run' })
  createComment(@Body() createCommentDto: CreateCommentDto, @Request() req: any) {
    return this.runService.createComment(createCommentDto, req.user.userId);
  }

  @Delete('comments/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Menghapus komentar (hanya milik sendiri)' })
  deleteComment(@Param('id') id: string, @Request() req: any) {
    return this.runService.deleteComment(id, req.user.userId);
  }

  @Get('admin/runs/:status')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Memfilter seluruh run berdasarkan status (Khusus Admin)' })
  getRunsByStatus(@Param('status') status: string) {
    return this.runService.getRunsByStatus(status);
  }

  @Post('admin/runs/:id/accept')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Menerima (Accept) submisi run (Khusus Admin)' })
  acceptRun(@Param('id') id: string) {
    return this.runService.acceptRun(id);
  }

  @Post('admin/runs/:id/reject')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Menolak (Reject) submisi run (Khusus Admin)' })
  rejectRun(@Param('id') id: string) {
    return this.runService.rejectRun(id);
  }
}