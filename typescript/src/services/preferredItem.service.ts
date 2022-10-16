import { Injectable } from '@nestjs/common';
import { PreferredItemRequest } from '../interfaces/item';
import { ItemService } from './item.service';
import { MasterDataService } from './master-data.service';
import {
  dataSets,
  DataSetType,
  generateDataSet,
  GenerationConfiguration,
} from '../mock/dataset';
import { findOutPreferredItems } from '../helpers/services.utils';

@Injectable()
export class PreferredItemService {
  constructor(
    private readonly itemService: ItemService,
    private readonly masterDataService: MasterDataService,
  ) {}

  lookupPreferredItems(config: GenerationConfiguration): any {
    return findOutPreferredItems(this.getDataCollection(config));
  }

  getDataCollection(config: GenerationConfiguration): PreferredItemRequest {
    const dateSetRecord =
      config?.itemAmount > 0 ? generateDataSet(config) : dataSets;
    return {
      brickIds: dateSetRecord[DataSetType.GIVEN_BRICKS],
      itemCollection: this.itemService.list(dateSetRecord),
      masterDataCollection: this.masterDataService.list(dateSetRecord),
    };
  }
}
