import {
  generateBrickRecord,
  generateColorRecord,
  generateItemRecord,
  generateMasterData,
  len,
  randomBricks,
} from './dataset';
import { LogService } from '../services/logService';
import { Brick } from '../interfaces/brick';

describe('dataset', () => {
  describe('generateColorRecord', () => {
    it('should generate 10 color code if the amount is 10', () => {
      const amount = 5;
      const record = generateColorRecord(amount);
      expect(len(record)).toEqual(amount);
    });
  });
  describe('generateBrickRecord', () => {
    it('should generate 15 bricks if the amount is 15', () => {
      const amount = 5;
      const colorRecord = generateColorRecord(amount);
      const brickRecord = generateBrickRecord(amount, colorRecord);
      expect(len(brickRecord)).toEqual(amount);
    });
  });
  describe('generateMasterData', () => {
    it('should generate 15 master data if the amount is 15', () => {
      const amount = 5;
      const masterDataRecord = generateMasterData({ itemAmount: amount });
      LogService.logInfo(masterDataRecord);
      expect(len(masterDataRecord)).toEqual(amount);
    });
  });
  describe('randomBricks', () => {
    it('should return the specified amount of bricks', () => {
      const amount = 5;
      const bricks: Brick[] = randomBricks(
        amount,
        generateBrickRecord(100, generateColorRecord(20)),
      );
      expect(bricks.length).toEqual(amount);
    });
  });
  describe('generateItemRecord', () => {
    const amount = 5;
    const itemRecord = generateItemRecord(amount);
    // LogService.logInfo(itemRecord);
    expect(len(itemRecord)).toEqual(amount);
  });
});
