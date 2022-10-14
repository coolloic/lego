import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryService } from './services/repositoryService';
import { BasicRepository } from './models/basicRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RepositoryService, BasicRepository],
})
export class AppModule {}
