import { Injectable } from '@nestjs/common';

import { Item, ItemRecord } from '../interfaces/item';
import { Color, COLOR_PK, ColorRecord } from '../interfaces/color';
import { BasicRepository } from '../models/basicRepository';
import { MasterData, MasterDataRecord } from '../interfaces/masterData';
import { Brick, BrickRecord } from '../interfaces/brick';
import { DataSet, generateColorRecord } from '../mock/dataset';

export enum RepositoryName {
  ITEM = 'item',
  MASTER_DATA = 'master_data',
  COLOR = 'color',
  BRICK = 'brick',
}

const colorRecord = generateColorRecord(10);

export const DataSetRecord: Record<RepositoryName, () => any> = {
  [RepositoryName.COLOR]: (): ColorRecord => colorRecord,
  [RepositoryName.ITEM]: (): ItemRecord => ({}),
  [RepositoryName.BRICK]: () => ({}),
  [RepositoryName.MASTER_DATA]: () => ({}),
};

const Repositories: Record<RepositoryName, () => BasicRepository<any, any>> = {
  [RepositoryName.ITEM]: () => {
    return new BasicRepository<Item, ItemRecord>(
      new DataSet<Item, ItemRecord>(DataSetRecord[RepositoryName.ITEM]()),
    );
  },
  [RepositoryName.BRICK]: () => {
    return new BasicRepository<Brick, BrickRecord>(
      new DataSet<Brick, BrickRecord>(DataSetRecord[RepositoryName.BRICK]()),
    );
  },
  [RepositoryName.COLOR]: () => {
    const record = DataSetRecord[RepositoryName.COLOR]();
    return new BasicRepository<Color, ColorRecord>(
      new DataSet<Color, ColorRecord>(record),
    );
  },
  [RepositoryName.MASTER_DATA]: () => {
    return new BasicRepository<MasterData, MasterDataRecord>(
      new DataSet<MasterData, MasterDataRecord>(
        DataSetRecord[RepositoryName.MASTER_DATA](),
      ),
    );
  },
};

const colorRepo = Repositories[RepositoryName.COLOR]();
const itemRepo = Repositories[RepositoryName.ITEM]();

@Injectable()
export class RepositoryService {
  putItem(item: Item, pk: string, id?: string): ItemRecord {
    return itemRepo.put(item, pk, id);
  }

  putColor(color: Color, id?: string): ColorRecord {
    return colorRepo.put(color, COLOR_PK, id);
  }

  listColor(): ColorRecord {
    return colorRepo.list();
  }
}
