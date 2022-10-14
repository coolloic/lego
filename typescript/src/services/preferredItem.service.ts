import { Injectable } from '@nestjs/common';
import { Item } from '../interfaces/item';
import { ItemService } from './item.service';
import { MasterDataService } from './master-data.service';
import { MasterData } from '../interfaces/masterData';
import { dataSets, DataSetType, generateDataSet } from '../mock/dataset';

@Injectable()
export class PreferredItemService {
  constructor(
    private readonly itemService: ItemService,
    private readonly masterDataService: MasterDataService,
  ) {}

  cherryPickItems(brickIds: number[]): Item[] {
    return [];
  }

  getDataCollection(
    givenBrickAmount?: number,
    itemAmount?: number,
  ): DataCollection {
    const dateSetRecord =
      itemAmount > 0
        ? generateDataSet({ itemAmount, givenBrickAmount })
        : dataSets;
    return {
      brickIds: dateSetRecord[DataSetType.GIVEN_BRICKS],
      itemCollection: this.itemService.list(dateSetRecord),
      masterDataCollection: this.masterDataService.list(dateSetRecord),
    };
  }
}

export interface DataCollection {
  brickIds: number[];
  itemCollection: Item[];
  masterDataCollection: MasterData[];
}
