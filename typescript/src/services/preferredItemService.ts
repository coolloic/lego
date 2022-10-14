import { Injectable } from '@nestjs/common';
import { Item } from '../interfaces/item';
import { Brick } from '../interfaces/brick';

@Injectable()
export class PreferredItemService {
  //TODO implement the loic here
  cherryPickItems(bricks: Brick[]): Item[] {
    return [];
  }
}
