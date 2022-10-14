import { EStatus } from './status';

export interface MasterData {
  uuid: number;
  status: EStatus;
  price: number;
  item_id: number;
}

export type MasterDataRecord = Record<string, MasterData>;
