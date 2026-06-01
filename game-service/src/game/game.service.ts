import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async getAllGames() {
    return this.prisma.games.findMany();
  }

  async getGameById(id: string) {
    const game = await this.prisma.games.findUnique({
      where: { game_id: id },
    });

    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    const categories = await this.prisma.run_categories.findMany({
      where: { game_id: id },
    });

    return {
      ...game,
      associated_run_categories: categories,
    };
  }

  async createGame(createGameDto: CreateGameDto) {
    const { game_name, description } = createGameDto;

    await this.prisma.games.create({
      data: {
        game_name,
        description,
      },
    });

    return { message: 'Game record created successfully.' };
  }

  async updateGame(id: string, updateData: Partial<CreateGameDto>) {
    const game = await this.prisma.games.findUnique({
      where: { game_id: id },
    });

    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    await this.prisma.games.update({
      where: { game_id: id },
      data: updateData,
    });

    return { message: 'Game record updated successfully.' };
  }

  async deleteGame(id: string) {
    const game = await this.prisma.games.findUnique({
      where: { game_id: id },
    });

    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    await this.prisma.games.delete({
      where: { game_id: id },
    });

    return { message: 'Game record removed successfully.' };
  }
  async getCategoryById(id: string) {
    const category = await this.prisma.run_categories.findUnique({
      where: { run_category_id: id },
    });

    if (!category) {
      throw new NotFoundException('Run category not found.');
    }

    return category;
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { game_id, run_category_name } = createCategoryDto;

    const gameExists = await this.prisma.games.findUnique({
      where: { game_id: game_id },
    });

    if (!gameExists) {
      throw new NotFoundException('Game ID does not exist. Cannot create category.');
    }

    await this.prisma.run_categories.create({
      data: {
        game_id,
        run_category_name,
      },
    });

    return { message: 'Run category record created successfully.' };
  }

  async updateCategory(id: string, updateData: Partial<CreateCategoryDto>) {
    const category = await this.prisma.run_categories.findUnique({
      where: { run_category_id: id },
    });

    if (!category) {
      throw new NotFoundException('Run category not found.');
    }

    if (updateData.game_id) {
      const gameExists = await this.prisma.games.findUnique({
        where: { game_id: updateData.game_id },
      });
      if (!gameExists) {
        throw new NotFoundException('New Game ID does not exist.');
      }
    }

    await this.prisma.run_categories.update({
      where: { run_category_id: id },
      data: updateData,
    });

    return { message: 'Run category record updated successfully.' };
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.run_categories.findUnique({
      where: { run_category_id: id },
    });

    if (!category) {
      throw new NotFoundException('Run category not found.');
    }

    await this.prisma.run_categories.delete({
      where: { run_category_id: id },
    });

    return { message: 'Run category record removed successfully.' };
  }
}