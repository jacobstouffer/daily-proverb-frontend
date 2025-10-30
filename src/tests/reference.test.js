import { expect, test, describe } from 'vitest';
import { getPrevious, getNext } from '../utils/reference';

describe('getNext', () => {
  test('Return next from same chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    const values = getNext(2, 10, verseMap);

    expect(values.verse).toEqual(3);
  });
  
  test('Return next from different chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getNext(5, 10, verseMap);

    expect(values.verse).toEqual(1);
  });

  test('Return next when verse is first in chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getNext(1, 10, verseMap);

    expect(values.verse).toEqual(2);
  });

  test('When there is no next chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getNext(5, 11, verseMap);

    expect(values.verse).toEqual(0);
  });

  test('When null passed in', () => {
    const values = getNext(2, 10, null);
    expect(values.verse).toEqual(0);
  });

  test('When current verse is not in map', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 3, 4, 5]);
    const values = getNext(2, 10, verseMap);
    expect(values.verse).toEqual(0);
  });

  test('When chapter has 2 verses', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2]);
    const values = getNext(1, 10, verseMap);
    expect(values.verse).toEqual(2);
  });
});

describe('getPrevious', () => {
  test('Return previous from same chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    const values = getPrevious(2, 10, verseMap);

    expect(values.verse).toEqual(1);
  });

  test('Return previous from different chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getPrevious(1, 11, verseMap);

    expect(values.verse).toEqual(5);
  });

  test('When there is no previous chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getPrevious(1, 10, verseMap);

    expect(values.verse).toEqual(0);
  });

  test('When chapter does not start with 1 and no previous chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [2, 3, 4, 5]);
    verseMap.set('11', [1, 2, 3, 4, 5]);
    const values = getPrevious(2, 10, verseMap);

    expect(values.verse).toEqual(0);
  });

  test('When chapter does not start with 1 and there is a previous chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [2, 3, 4, 5]);
    const values = getPrevious(2, 11, verseMap);

    expect(values.verse).toEqual(5);
  });
  
  test('When current verse is last in the chapter', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 2, 3, 4, 5]);
    verseMap.set('11', [2, 3, 4, 5]);
    const values = getPrevious(5, 11, verseMap);

    expect(values.verse).toEqual(4);
  });
  
  test('When null passed in', () => {
    const values = getPrevious(10, 2, null);
    expect(values.verse).toEqual(0);
  });

  test('When current verse is not in map', () => {
    const verseMap = new Map();
    verseMap.set('10', [1, 3, 4, 5]);
    const values = getPrevious(10, 2, verseMap);
    expect(values.verse).toEqual(0);
  });
});
