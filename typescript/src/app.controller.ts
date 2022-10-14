import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Color, ColorRecord } from './interfaces/color';
import { RepositoryService } from './services/repositoryService';

@Controller()
export class AppController {
  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly appService: AppService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('color')
  async addColor(@Body() color: Color): Promise<ColorRecord> {
    return this.repositoryService.putColor(color);
  }

  @Get('color')
  listColors(): ColorRecord {
    return this.repositoryService.listColor();
  }
}
