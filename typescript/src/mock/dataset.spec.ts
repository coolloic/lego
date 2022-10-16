import {
  generateBrickRecord,
  generateColorRecord,
  generateItemRecord,
  generateDataSet,
  len,
} from './dataset';

describe('dataset', () => {
  describe('generateColorRecord', () => {
    it('should generate specified amount of color', () => {
      const amount = 5;
      const record = generateColorRecord(amount);
      expect(len(record)).toEqual(amount);
    });
  });
  describe('generateBrickRecord', () => {
    it('should generate specified amount of bricks', () => {
      const amount = 1;
      const colorRecord = generateColorRecord(amount);
      const brickRecord = generateBrickRecord(amount, colorRecord);
      expect(len(brickRecord)).toEqual(amount);
    });
  });
  describe('generateDataSet', () => {
    it('should generate specified amount of master data ', () => {
      const amount = 5;
      const dataSet = generateDataSet({ itemAmount: amount });
      expect(dataSet[0].length).toEqual(amount);
      expect(dataSet[1].length).toEqual(amount);
    });
  });
  describe('generateItemRecord', () => {
    const amount = 2;
    const itemRecord = generateItemRecord(amount);
    expect(len(itemRecord)).toEqual(amount);
  });
});
