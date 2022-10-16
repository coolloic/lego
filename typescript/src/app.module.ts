import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { RepositoryService } from './services/repositoryService';
import { BasicRepository } from './models/basicRepository';
import { MasterDataService } from './services/master-data.service';
import { ItemService } from './services/item.service';
import { PreferredItemService } from './services/preferredItem.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    RepositoryService,
    BasicRepository,
    MasterDataService,
    ItemService,
    PreferredItemService,
  ],
})
export class AppModule {}
