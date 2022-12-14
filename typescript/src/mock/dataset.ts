import { Injectable } from '@nestjs/common';
import { Repository } from '../interfaces/repository';
import { COLOR_PK, ColorRecord } from '../interfaces/color';
import { Brick, BrickRecord } from '../interfaces/brick';
import { MasterDataRecord } from '../interfaces/masterData';
import { EStatus } from '../interfaces/status';
import { ItemRecord } from '../interfaces/item';

@Injectable()
export class DataSet<T, R> implements Repository<T, R> {
  record: R;

  constructor(record: R = {} as R) {
    this.record = record;
  }

  list(): R {
    return this.record;
  }

  put(item: T, pk: string, id: string | number): R {
    item[pk] = item[pk] ?? id ?? Object.keys(this.record).length + 1;
    this.record[pk] = item;
    return this.record;
  }

  delete(pk: string): R {
    delete this.record[pk];
    return this.record;
  }
}

export const len = (record: {}): number => Object.keys(record).length;
const randomNumber = (max: number) => Math.floor(Math.random() * max);
const randomPrice = (max: number, decimals: number = 2) =>
  Math.floor(Math.random() * max * Math.pow(10, decimals)) /
  Math.pow(10, decimals);

const randomColorCode = (range: number): string =>
  `${randomNumber(range)},${randomNumber(range)}`;

export const generateColorRecord = (
  amount: number,
  colorRange: number = 255,
): ColorRecord => {
  const colorRecord: ColorRecord = {};
  while (len(colorRecord) < amount) {
    const code = randomColorCode(colorRange);
    colorRecord[code] = {
      code,
    };
  }
  return colorRecord;
};

const randomEStatus = (): EStatus => {
  const statusRecord = {
    0: EStatus.NORMAL,
    1: EStatus.NOVELTY,
    2: EStatus.OUTGOING,
    3: EStatus.DISCONTINUED,
  };
  return statusRecord[randomNumber(4)];
};

export const generateBrickRecord = (
  amount: number,
  colorRecord: ColorRecord = generateColorRecord(10),
): BrickRecord => {
  const brickRecord: BrickRecord = {};
  const length = len(colorRecord);
  const colors = Object.values(colorRecord);
  for (let i = 0; i < amount; i++) {
    brickRecord[i] = {
      id: i,
      color: colors[randomNumber(length)][COLOR_PK],
    };
  }
  return brickRecord;
};

export const randomBricks = (
  amount: number,
  brickRecord: BrickRecord,
): Brick[] => {
  const bricks: Brick[] = [];
  const maxIndex = len(brickRecord);
  const num = randomNumber(amount);
  const length = num > 0 ? num : 1;
  for (let i = 0; i < length; i++) {
    bricks.push(brickRecord[randomNumber(maxIndex)]);
  }
  return bricks;
};

export const generateItemRecord = (
  itemAmount: number = 20,
  brickAmount: number = 40,
  colorAmount: number = 60,
  maxBricksPerItem: number = 10,
): [ItemRecord, BrickRecord] => {
  const itemRecord: ItemRecord = {};
  const colorRecord = generateColorRecord(colorAmount);
  const brickRecord = generateBrickRecord(brickAmount, colorRecord);
  for (let i = 0; i < itemAmount; i++) {
    const uuid = i;
    itemRecord[uuid] = {
      uuid,
      bricks: randomBricks(maxBricksPerItem, brickRecord),
    };
  }
  return [itemRecord, brickRecord];
};

export interface GenerationConfiguration {
  itemAmount?: number;
  brickAmount?: number;
  colorAmount?: number;
  maxBricksPerItem?: number;
  maxPricePerItem?: number;
  givenBrickAmount?: number;
}

export enum DataSetType {
  ITEM,
  MASTER_DATA,
  GIVEN_BRICKS,
}

export type DataSetRecord = Record<DataSetType, any>;

export const generateDataSet = ({
  givenBrickAmount = 10,
  itemAmount = 20,
  brickAmount = 40,
  colorAmount = 60,
  maxBricksPerItem = 3,
  maxPricePerItem = 500,
}: GenerationConfiguration): DataSetRecord => {
  const [itemRecord, brickRecord] = generateItemRecord(
    itemAmount,
    brickAmount,
    colorAmount,
    maxBricksPerItem,
  );
  const masterDataRecord: MasterDataRecord = {};
  for (let i = 0; i < itemAmount; i++) {
    masterDataRecord[i + 1] = {
      uuid: i,
      price: randomPrice(maxPricePerItem),
      status: randomEStatus(),
      item_id: itemRecord[i].uuid,
    };
  }
  const givenBricksIds: number[] = [];
  for (let i = 0; i < givenBrickAmount; i++) {
    givenBricksIds.push(brickRecord[randomNumber(len(brickRecord))].id);
  }
  return {
    [DataSetType.GIVEN_BRICKS]: givenBricksIds,
    [DataSetType.ITEM]: Object.values(itemRecord),
    [DataSetType.MASTER_DATA]: Object.values(masterDataRecord),
  };
};

export const dataSets = generateDataSet({});
