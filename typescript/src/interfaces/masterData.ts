import { EStatus } from './status';
import { Item } from './item';

export interface MasterData {
  uuid: number;
  status: EStatus;
  price: number;
  item: Item;
}

export type MasterDataRecord = Record<string, MasterData>;
