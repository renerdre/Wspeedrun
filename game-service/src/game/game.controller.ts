import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateCategoryDto } from './dto/create-category.dto'; // Tambahkan baris ini
import { AdminGuard } from './admin.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Games Catalog & Management')
@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('games')
  @ApiOperation({ summary: 'Melihat seluruh daftar game (Akses Publik)' })
  getAllGames() {
    return this.gameService.getAllGames();
  }

  @Get('games/:id')
  @ApiOperation({ summary: 'Melihat detail spesifik game beserta kategori speedrun di dalamnya' })
  getGameById(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  @Post('admin/games')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Membuat rekaman data game baru (Khusus Admin)' })
  createGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Patch('admin/games/:id/update')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Memperbarui data detail game (Khusus Admin)' })
  updateGame(@Param('id') id: string, @Body() updateGameDto: Partial<CreateGameDto>) {
    return this.gameService.updateGame(id, updateGameDto);
  }

  @Delete('admin/games/:id/delete')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Menghapus data game dari sistem (Khusus Admin)' })
  deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  }
  @Get('categories/:id')
  @ApiOperation({ summary: 'Melihat detail spesifik kategori run (Akses Publik)' })
  getCategoryById(@Param('id') id: string) {
    return this.gameService.getCategoryById(id);
  }

  @Post('admin/categories')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Membuat kategori run baru untuk game tertentu (Khusus Admin)' })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.gameService.createCategory(createCategoryDto);
  }

  @Patch('admin/categories/:id/update')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Memperbarui detail data kategori run (Khusus Admin)' })
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: Partial<CreateCategoryDto>) {
    return this.gameService.updateCategory(id, updateCategoryDto);
  }

  @Delete('admin/categories/:id/delete')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Menghapus data kategori run dari sistem (Khusus Admin)' })
  deleteCategory(@Param('id') id: string) {
    return this.gameService.deleteCategory(id);
  }
}