import { Brick } from './brick';
import { MasterData } from './masterData';

export interface Item {
  uuid: number;
  bricks: Brick[];
}

export type ItemRecord = Record<number, Item>;

export interface PreferredItem {
  [itemUuid: number]: {
    item: Item;
    amount: number;
  };
}

export interface PreferredItemRequest {
  brickIds: number[];
  itemCollection: Item[];
  masterDataCollection: MasterData[];
}
