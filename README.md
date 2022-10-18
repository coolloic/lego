# lego

## Runtime Enviroment
- `nodejs 14+`
- `serverless3+`

## Run the service locally
- `npm install`
- `npm run local`
- `curl http://localhost:3000/dev/preferredItems?itemAmount=1&brickAmount&colorAmount&maxBricksPerItem&maxPricePerItem&givenBrickAmount`

1. `itemAmount` - generate amount of `Item` and `MasterData`
2. `brickAmount` - generate amount of `Bricks`
3. `colorAmount` - generate amount of `Color`
4. `maxBricksPerItem` - generate random amount of bricks for `Item`
5. `maxPricePerItem` - generate random price for `MasterData`
6. `givenBrickAmount` - generate amount bricks to find out the `PreferredItem`

## Problem Analysis

1. What's the business value of the feature? \
As a Lego customer, presonally, I would like to have a feature to help me to find out the best quality with lowest prices item that I preferred.

2. What do I do to figure out the best choice of the items? \
Normally, I would like to group the bricks, find out the matched item with thoese bricks, and sort the items by its qulity and price.

## Solution

1. find the possible items that the given bricks are belong to 
2. filter out the possible items that can be fulfilled with given bricks
3. sort the fulfilled items by the item stauts and price
4. fulfill the high priority items with given bricks first till end
5. the fulfilled items are the preferred item


## Draft to design
![Alt Diagram](https://github.com/coolloic/lego/blob/master/lego.drawio.png "Diagram")

## Improvement

To figure out the best purchase streategy of preferred item, further enhancement can be made for the step 5. The idea is to find all the possible combinations, work out the price in total and amount of different kind of stauts, and then apply the purchase streategy based on the total price and status.

