import { expect, test, describe } from 'vitest';
import { getPrevious } from '../utils/reference';

describe('getPrevious', () => {
  test('Return previous from same chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    const values = getPrevious(2, 10, verseMap);

    expect(values.previousVerse).toEqual(1);
  });

  test('Return previous from different chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getPrevious(1, 11, verseMap);

    expect(values.previousVerse).toEqual(5);
  });

  test('When there is no previous chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getPrevious(1, 10, verseMap);

    expect(values.previousVerse).toEqual(0);
  });

  test('When chapter does not start with 1 and no previous chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getPrevious(2, 10, verseMap);

    expect(values.previousVerse).toEqual(0);
  });

  test('When null passed in', () => {
    const values = getPrevious(10, 2, null);
    expect(values.previousVerse).toEqual(0);
  });

  test('When current verse is not in map', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 3, 4, 5]);
    const values = getPrevious(10, 2, verseMap);
    expect(values.previousVerse).toEqual(0);
  });
});
