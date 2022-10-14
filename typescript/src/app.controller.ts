import { Controller, Get, Query } from '@nestjs/common';
import {
  DataCollection,
  PreferredItemService,
} from './services/preferredItem.service';

@Controller()
export class AppController {
  constructor(private readonly preferredItemService: PreferredItemService) {}

  @Get('collection')
  listColors(
    @Query('item_amount') itemAmount: number,
    @Query('given_bricks_amount') givenBricksAmount: number,
  ): DataCollection {
    return this.preferredItemService.getDataCollection(
      itemAmount,
      givenBricksAmount,
    );
  }
}
