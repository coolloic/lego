import { Brick } from '../interfaces/brick';
import { Item, PreferredItem, PreferredItemRequest } from '../interfaces/item';
import { MasterData } from '../interfaces/masterData';

export const isGivenBrickIdExistsInBricks = (
  givenBrickId: number,
  bricks: Brick[],
): boolean => bricks.some((b: Brick) => b.id === givenBrickId);

// step 1: find all possible items that brick's belong to
export const findPossibleItemsForGivenBricks = (
  givenBrickIds: number[],
  [...items]: Item[],
  filterCallback: (
    bricks: Item,
    groupedBrickIds: { [brickId: string]: number },
  ) => boolean = () => true,
): Item[] => {
  const possibleItems: { [key: number]: Item } = {};
  const groupBrickIds = groupBrickIdsWithCount(givenBrickIds);
  for (const item of items) {
    const { uuid, bricks } = item;
    for (const givenBrickId of givenBrickIds) {
      if (
        isGivenBrickIdExistsInBricks(givenBrickId, bricks) &&
        filterCallback(item, groupBrickIds)
      ) {
        possibleItems[uuid] = item;
      }
    }
  }
  return Object.values(possibleItems);
};

export const groupBrickIdsWithCount = (
  brickIds: number[],
): { [brickId: number]: number } => {
  return brickIds.reduce((group: {}, brickId: number) => {
    if (!group[brickId]) {
      group[brickId] = 1;
    } else {
      group[brickId]++;
    }
    return group;
  }, {});
};

export const canItemBricksBeFulfilledWithGivenBrickIds = (
  { bricks }: Item,
  groupedBrickIds: { [brickId: number]: number },
): boolean => {
  const brickIds = bricks.map(brick => brick.id);
  const groupedBrickIdsCopy = { ...groupedBrickIds };
  return brickIds.every(id => {
    if (!groupedBrickIdsCopy[id] || groupedBrickIdsCopy[id] === 0) {
      return false;
    }
    groupedBrickIdsCopy[id]--;
    return true;
  });
};

export const filterFulfilledPossibleItems = (
  givenBrickIds: number[],
  possibleItems: Item[],
) => {
  return findPossibleItemsForGivenBricks(
    givenBrickIds,
    possibleItems,
    canItemBricksBeFulfilledWithGivenBrickIds,
  );
};

export const generateMasterDataSortKeyHash = (
  masterData: MasterData[],
): { [masterDataId: number]: MasterData } => {
  return masterData.reduce((group: {}, { item_id, ...data }: MasterData) => {
    group[item_id] = { ...data, item_id };
    return group;
  }, {});
};

export const sortItemsByMasterDataStatusAndPrice = (
  items: Item[],
  masterData: MasterData[],
): Item[] => {
  const group: {
    [masterDataId: number]: MasterData;
  } = generateMasterDataSortKeyHash(masterData);
  return items.sort((a: Item, b: Item) => {
    const c: MasterData = group[a.uuid];
    const d: MasterData = group[b.uuid];
    if (c.status < d.status) {
      return -1;
    }
    if (c.status > d.status) {
      return 1;
    }
    if (c.price < d.price) {
      return -1;
    }
    if (c.status > d.price) {
      return 1;
    }
    return 0;
  });
};

const findAmountOfFulfilledPreferredItem = (
  bricks: Brick[],
  groupIds: { [brickId: number]: number },
) => Math.min(...bricks.map(({ id }: Brick) => groupIds[id]));

export const findAmountOfFulfilledPreferredItemsFromSortedItems = (
  [...items]: Item[],
  givenBrickIds: number[],
): any => {
  const groupedBrickIds: { [brickId: number]: number } = groupBrickIdsWithCount(
    givenBrickIds,
  );
  const filledItem: PreferredItem = {};
  while (items.length > 0) {
    const preferredItem: Item = items.shift();
    const preferredItemBricks: Brick[] = preferredItem.bricks;
    const amountOfFulfilledPreferredItem = findAmountOfFulfilledPreferredItem(
      preferredItemBricks,
      groupedBrickIds,
    );
    // if it can't fulfill the item then skip
    if (amountOfFulfilledPreferredItem > 0) {
      filledItem[preferredItem.uuid] = {
        item: preferredItem,
        amount: amountOfFulfilledPreferredItem,
      };
      // update the amount of rest bricks
      preferredItemBricks.forEach(({ id }: Brick) => {
        groupedBrickIds[id] -= amountOfFulfilledPreferredItem;
      });
    }
  }

  const leftBrickIds: number[] = [];
  for (const [key, value] of Object.entries(groupedBrickIds)) {
    if (value > 0) {
      leftBrickIds.push(Number(key));
    }
  }
  return {
    preferredItems: filledItem,
    leftBricks: leftBrickIds,
  };
};

export const findOutPreferredItems = (request: PreferredItemRequest): any => {
  const { brickIds, masterDataCollection, itemCollection } = request;
  const fulfilledPossibleItems = filterFulfilledPossibleItems(
    brickIds,
    itemCollection,
  );
  const sortFulfilledItems = sortItemsByMasterDataStatusAndPrice(
    fulfilledPossibleItems,
    masterDataCollection,
  );
  const preferredItems = findAmountOfFulfilledPreferredItemsFromSortedItems(
    sortFulfilledItems,
    brickIds,
  );
  return {
    input: {
      brickIds,
      masterDataCollection,
      itemCollection,
    },
    response: preferredItems,
    transformation: {
      fulfilledPossibleItems,
      sortFulfilledItems,
    },
  };
};
