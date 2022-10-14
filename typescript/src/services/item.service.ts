import { Injectable } from '@nestjs/common';
import { Item } from '../interfaces/item';
import { DataSetRecord, DataSetType } from '../mock/dataset';

@Injectable()
export class ItemService {
  list(dataSetRecord: DataSetRecord): Item[] {
    return dataSetRecord[DataSetType.ITEM];
  }
}
