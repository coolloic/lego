import { generateBrickRecord } from '../mock/dataset';
import {
  canItemBricksBeFulfilledWithGivenBrickIds,
  filterFulfilledPossibleItems,
  findAmountOfFulfilledPreferredItemsFromSortedItems,
  findOutPreferredItems,
  findPossibleItemsForGivenBricks,
  groupBrickIdsWithCount,
  isGivenBrickIdExistsInBricks,
  sortItemsByMasterDataStatusAndPrice,
} from './services.utils';
import { Brick } from '../interfaces/brick';
import { Item, PreferredItemRequest } from '../interfaces/item';
import { MasterData } from '../interfaces/masterData';
import { EStatus } from '../interfaces/status';

describe('services', () => {
  const bricks: Brick[] = Object.values(generateBrickRecord(10));
  const items: Item[] = [
    {
      uuid: 101,
      bricks: [bricks[0]],
    },
    {
      uuid: 102,
      bricks: [bricks[1], bricks[1]],
    },
    {
      uuid: 103,
      bricks: [bricks[1], bricks[2], bricks[7]],
    },
    {
      uuid: 104,
      bricks: [bricks[4]],
    },
    {
      uuid: 105,
      bricks: [bricks[7]],
    },
  ];
  describe('isGivenBrickIdExistsInBricks', () => {
    const notExistBrickId = 10;
    const existBrickId = 3;
    it('should return true when given brick exists in bricks', () => {
      expect(isGivenBrickIdExistsInBricks(existBrickId, bricks)).toBeTruthy();
    });
    it(`should return false when given brick doesn't exist in bricks`, () => {
      expect(isGivenBrickIdExistsInBricks(notExistBrickId, bricks)).toBeFalsy();
    });
  });

  describe('findPossibleItemsForGivenBricks', () => {
    const noMatchedItemBrickIds = [5, 10];
    const hasMatchedItemBrickIds = [0, 1, 2, 7, 9];
    it('should return the items when given brick ids are pieces of the item', () => {
      const possibleItemIds: number[] = findPossibleItemsForGivenBricks(
        hasMatchedItemBrickIds,
        items,
      ).map(item => item.uuid);
      expect(possibleItemIds).toEqual([101, 102, 103, 105]);
    });
    it('should return empty array when give bricks ids are not existing in all the items', () => {
      expect(
        findPossibleItemsForGivenBricks(noMatchedItemBrickIds, items),
      ).toEqual([]);
    });
  });

  describe('canItemBricksBeFulfilledWithGivenBrickIds', () => {
    it('should return true when item bricks can be fulfilled with given brick ids', () => {
      const item: Item = items[2]; // ids: [1,2,7]
      const fulfilledBrickIds = { 1: 1, 2: 1, 7: 1, 4: 1, 6: 1 };
      expect(
        canItemBricksBeFulfilledWithGivenBrickIds(item, fulfilledBrickIds),
      ).toBeTruthy();
    });
    it(`should return false when item bricks can't be fulfilled with given brick ids`, () => {
      const item: Item = items[2]; // ids: [1,2,7]
      const unfulfilledBrickIds = { 1: 1, 3: 1, 4: 1, 5: 1, 6: 1 };
      expect(
        canItemBricksBeFulfilledWithGivenBrickIds(item, unfulfilledBrickIds),
      ).toBeFalsy();
    });
  });
  describe('groupBrickIdsWithCount', () => {
    it('should return group brick id with count', () => {
      const givenBrickIds = [1, 1, 2, 2, 2, 3, 4, 5, 5, 6, 7];
      const expectedGroupBrickIdWithCount = {
        1: 2,
        2: 3,
        3: 1,
        4: 1,
        5: 2,
        6: 1,
        7: 1,
      };
      expect(groupBrickIdsWithCount(givenBrickIds)).toEqual(
        expectedGroupBrickIdWithCount,
      );
    });
  });

  describe('filterFulfilledPossibleItems', () => {
    it('should return the items which can be fulfilled by given brick ids', () => {
      const fulfilledBrickIds = [1, 2, 5, 7];
      const expectedFulfilledItem: Item[] = [
        {
          uuid: 103,
          bricks: [bricks[1], bricks[2], bricks[7]],
        },
        {
          uuid: 105,
          bricks: [bricks[7]],
        },
      ];
      expect(filterFulfilledPossibleItems(fulfilledBrickIds, items)).toEqual(
        expectedFulfilledItem,
      );
    });
  });

  describe('sortItemsByMasterDataStatusAndPrice', () => {
    it('should return sorted items with price and status', () => {
      const itemArray: Item[] = [
        { uuid: 1, bricks: [] },
        { uuid: 2, bricks: [] },
        { uuid: 3, bricks: [] },
        { uuid: 4, bricks: [] },
        { uuid: 5, bricks: [] },
        { uuid: 6, bricks: [] },
        { uuid: 7, bricks: [] },
      ];
      const masterData: MasterData[] = [
        {
          uuid: 4,
          item_id: 4,
          status: EStatus.NORMAL,
          price: 100,
        },
        {
          uuid: 3,
          item_id: 3,
          status: EStatus.NOVELTY,
          price: 100,
        },
        {
          uuid: 2,
          item_id: 2,
          status: EStatus.OUTGOING,
          price: 100,
        },
        {
          uuid: 1,
          item_id: 1,
          status: EStatus.DISCONTINUED,
          price: 100,
        },
        {
          uuid: 6,
          item_id: 6,
          status: EStatus.NORMAL,
          price: 200,
        },
        {
          uuid: 5,
          item_id: 5,
          status: EStatus.NOVELTY,
          price: 200,
        },
        {
          uuid: 7,
          item_id: 7,
          status: EStatus.NORMAL,
          price: 300,
        },
      ];
      const sortedItems = sortItemsByMasterDataStatusAndPrice(
        itemArray,
        masterData,
      );
      // console.log(sortedItems);
      const sortedIds = sortedItems.map(item => item.uuid);
      expect(sortedIds).toEqual([4, 6, 7, 3, 5, 2, 1]);
    });
  });
  describe('findAmountOfFulfilledPreferredItemsFromSortedItems', () => {
    it('should return the fulfill the sorted Items and rest of bricks', () => {
      const itemArr: Item[] = [
        {
          uuid: 0,
          bricks: [
            {
              id: 30,
              color: '1,155',
            },
            {
              id: 12,
              color: '221,125',
            },
          ],
        },
        {
          uuid: 1,
          bricks: [
            {
              id: 37,
              color: '80,81',
            },
            {
              id: 35,
              color: '206,102',
            },
          ],
        },
        {
          uuid: 2,
          bricks: [
            {
              id: 6,
              color: '192,3',
            },
          ],
        },
        {
          uuid: 3,
          bricks: [
            {
              id: 5,
              color: '154,233',
            },
          ],
        },
        {
          uuid: 4,
          bricks: [
            {
              id: 1,
              color: '179,233',
            },
          ],
        },
        {
          uuid: 5,
          bricks: [
            {
              id: 37,
              color: '80,81',
            },
          ],
        },
        {
          uuid: 6,
          bricks: [
            {
              id: 27,
              color: '188,128',
            },
            {
              id: 39,
              color: '34,45',
            },
          ],
        },
        {
          uuid: 7,
          bricks: [
            {
              id: 33,
              color: '91,41',
            },
          ],
        },
        {
          uuid: 8,
          bricks: [
            {
              id: 16,
              color: '189,60',
            },
          ],
        },
      ];
      const givenBrickIds = [1, 2, 5, 16];
      const expectedPreferredItemsAndLeftBrickIds = {
        leftBricks: [2],
        preferredItems: {
          3: {
            amount: 1,
            item: {
              bricks: [
                {
                  color: '154,233',
                  id: 5,
                },
              ],
              uuid: 3,
            },
          },
          4: {
            amount: 1,
            item: {
              bricks: [
                {
                  color: '179,233',
                  id: 1,
                },
              ],
              uuid: 4,
            },
          },
          8: {
            amount: 1,
            item: {
              bricks: [
                {
                  color: '189,60',
                  id: 16,
                },
              ],
              uuid: 8,
            },
          },
        },
      };
      expect(
        findAmountOfFulfilledPreferredItemsFromSortedItems(
          itemArr,
          givenBrickIds,
        ),
      ).toEqual(expectedPreferredItemsAndLeftBrickIds);
    });
  });

  describe('findOutPreferredItems', () => {
    it('should return preferred items with left brick ids', () => {
      const preferredItemRequest: PreferredItemRequest = {
        brickIds: [8, 5, 1, 2, 9],
        masterDataCollection: [
          {
            uuid: 0,
            price: 48.35,
            status: 4,
            item_id: 0,
          },
          {
            uuid: 1,
            price: 57.04,
            status: 2,
            item_id: 1,
          },
          {
            uuid: 2,
            price: 32.86,
            status: 3,
            item_id: 2,
          },
          {
            uuid: 3,
            price: 15.86,
            status: 1,
            item_id: 3,
          },
          {
            uuid: 4,
            price: 19.98,
            status: 4,
            item_id: 4,
          },
          {
            uuid: 5,
            price: 91.87,
            status: 2,
            item_id: 5,
          },
          {
            uuid: 6,
            price: 10.95,
            status: 4,
            item_id: 6,
          },
          {
            uuid: 7,
            price: 8.06,
            status: 1,
            item_id: 7,
          },
          {
            uuid: 8,
            price: 54.21,
            status: 4,
            item_id: 8,
          },
          {
            uuid: 9,
            price: 79.22,
            status: 1,
            item_id: 9,
          },
        ],
        itemCollection: [
          {
            uuid: 0,
            bricks: [
              {
                id: 8,
                color: '23,26',
              },
            ],
          },
          {
            uuid: 1,
            bricks: [
              {
                id: 3,
                color: '128,9',
              },
              {
                id: 3,
                color: '128,9',
              },
            ],
          },
          {
            uuid: 2,
            bricks: [
              {
                id: 1,
                color: '130,135',
              },
            ],
          },
          {
            uuid: 3,
            bricks: [
              {
                id: 4,
                color: '162,183',
              },
            ],
          },
          {
            uuid: 4,
            bricks: [
              {
                id: 9,
                color: '80,190',
              },
            ],
          },
          {
            uuid: 5,
            bricks: [
              {
                id: 7,
                color: '91,42',
              },
              {
                id: 7,
                color: '91,42',
              },
            ],
          },
          {
            uuid: 6,
            bricks: [
              {
                id: 9,
                color: '80,190',
              },
              {
                id: 6,
                color: '30,67',
              },
            ],
          },
          {
            uuid: 7,
            bricks: [
              {
                id: 2,
                color: '49,0',
              },
              {
                id: 8,
                color: '23,26',
              },
            ],
          },
          {
            uuid: 8,
            bricks: [
              {
                id: 7,
                color: '91,42',
              },
              {
                id: 3,
                color: '128,9',
              },
            ],
          },
          {
            uuid: 9,
            bricks: [
              {
                id: 7,
                color: '91,42',
              },
              {
                id: 2,
                color: '49,0',
              },
            ],
          },
        ],
      };
      const preferredItems = findOutPreferredItems(preferredItemRequest)
        .response;
      const expectedPreferredItems = {
        preferredItems: {
          2: {
            item: {
              uuid: 2,
              bricks: [
                {
                  id: 1,
                  color: '130,135',
                },
              ],
            },
            amount: 1,
          },
          4: {
            item: {
              uuid: 4,
              bricks: [
                {
                  id: 9,
                  color: '80,190',
                },
              ],
            },
            amount: 1,
          },
          7: {
            item: {
              uuid: 7,
              bricks: [
                {
                  id: 2,
                  color: '49,0',
                },
                {
                  id: 8,
                  color: '23,26',
                },
              ],
            },
            amount: 1,
          },
        },
        leftBricks: [5],
      };
      expect(preferredItems).toEqual(expectedPreferredItems);
    });
  });
});
