import { Controller, Get, Query } from '@nestjs/common';
import { PreferredItemService } from '../services/preferredItem.service';
import { PreferredItemRequest } from '../interfaces/item';
import { GenerationConfiguration } from '../mock/dataset';

@Controller()
export class AppController {
  constructor(private readonly preferredItemService: PreferredItemService) {}

  @Get('mock')
  listMockRequest(
    @Query('itemAmount') itemAmount: number = 10,
    @Query('brickAmount') brickAmount: number = 10,
    @Query('colorAmount') colorAmount: number = 10,
    @Query('maxBricksPerItem') maxBricksPerItem: number = 3,
    @Query('maxPricePerItem') maxPricePerItem: number = 100,
    @Query('givenBrickAmount') givenBrickAmount: number = 5,
  ): PreferredItemRequest {
    const config: GenerationConfiguration = {
      itemAmount,
      brickAmount,
      colorAmount,
      maxBricksPerItem,
      maxPricePerItem,
      givenBrickAmount,
    };
    return this.preferredItemService.getDataCollection(config);
  }

  @Get('preferredItems')
  lookPreferredItems(
    @Query('itemAmount') itemAmount: number = 10,
    @Query('brickAmount') brickAmount: number = 10,
    @Query('colorAmount') colorAmount: number = 10,
    @Query('maxBricksPerItem') maxBricksPerItem: number = 3,
    @Query('maxPricePerItem') maxPricePerItem: number = 100,
    @Query('givenBrickAmount') givenBrickAmount: number = 5,
  ) {
    const config: GenerationConfiguration = {
      itemAmount,
      brickAmount,
      colorAmount,
      maxBricksPerItem,
      maxPricePerItem,
      givenBrickAmount,
    };
    return this.preferredItemService.lookupPreferredItems(config);
  }
}
