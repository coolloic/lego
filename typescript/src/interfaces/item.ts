import { Brick } from './brick';

export interface Item {
  uuid: number;
  bricks: Brick[];
}

export type ItemRecord = Record<number, Item>;
