import { Injectable } from '@nestjs/common';
import { MasterData } from '../interfaces/masterData';
import { DataSetRecord, dataSets, DataSetType } from '../mock/dataset';

@Injectable()
export class MasterDataService {
  list(dataSetRecord: DataSetRecord): MasterData[] {
    return dataSetRecord[DataSetType.MASTER_DATA];
  }
}
