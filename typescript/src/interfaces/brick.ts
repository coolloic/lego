export interface Brick {
  id: number;
  color: string;
}

export type BrickRecord = Record<number, Brick>;
