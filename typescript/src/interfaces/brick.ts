import { Color } from './color';

export interface Brick {
  id: number;
  color: Color;
}

export type BrickRecord = Record<number, Brick>;
