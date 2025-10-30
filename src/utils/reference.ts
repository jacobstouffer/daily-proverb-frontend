function refObj(c: number, v: number) {
  return { chapter: c, verse: v };
}

export function getPrevious(
  currentVerse: number | undefined,
  currentChapter: number | undefined,
  verseMap: Map<string, number[]> | null
): { chapter: number; verse: number } {
  if (!verseMap || !currentVerse || !currentChapter) {
    return refObj(0, 0);
  }

  try {
    // Most of the time, the previous verse is within the same chapter, i.e 10:5, previous is 10:4
    let prevChapter = currentChapter;
    let previousVerses = verseMap.get(currentChapter.toString());

    // If this is verse 1 OR if the first verse in the chapter is this verse (rare case, not anticipated)
    if (currentVerse === 1 || (previousVerses && previousVerses[0] === currentVerse)) {
      prevChapter = currentChapter - 1;
      previousVerses = verseMap.get(prevChapter.toString());
      if (previousVerses && previousVerses.length > 0) {
        // Get the last verse in the chapter
        return refObj(prevChapter, previousVerses[previousVerses.length - 1]);
      } else {
        return refObj(0, 0);
      }
    }

    // If there is only one verse in the chapter and it's not verse 1 (rare case, not anticipated)
    if (!previousVerses || previousVerses.length < 2) {
      return refObj(0, 0);
    }

    // Find the current verse and select the one prior to it in the list
    for (let i = 1; i < previousVerses.length; i++) {
      if (previousVerses[i] === currentVerse) {
        return refObj(prevChapter, previousVerses[i - 1]);
      } else if (previousVerses[i - 1] >= currentVerse) {
        return refObj(0, 0);
      }
    }

    return refObj(0, 0);
  } catch (error) {
    console.error('Error in getPrevious:', error);
    return refObj(0, 0);
  }
}

export function getNext(
  currentVerse: number | undefined,
  currentChapter: number | undefined,
  verseMap: Map<string, number[]> | null
): { chapter: number; verse: number } { 
  if (!verseMap || !currentVerse || !currentChapter) {
    return refObj(0, 0);
  }

  try {
    // Most of the time, the next verse is within the same chapter, i.e. 10:14, next is 10:15
    let nextChapter = currentChapter;
    let nextVerses = verseMap.get(currentChapter.toString());
    
    if (!nextVerses || nextVerses.length === 0) {
      console.error("There are no verses in the current chapter", currentChapter);
      return refObj(0, 0);
    }

    // If the last verse of the chapter is the current verse, go to the next chapter
    if (nextVerses[nextVerses.length - 1] === currentVerse) {
      nextChapter = currentChapter + 1;
      nextVerses = verseMap.get(nextChapter.toString());
      if (!nextVerses || nextVerses.length === 0) {
        return refObj(0, 0);
      }

      return refObj(nextChapter, nextVerses[0]);
    }

    // Find the current verse and select the one after it in the list
    for (let i = 0; i <= nextVerses.length - 2; i++) {
      if (nextVerses[i] === currentVerse) {
        return refObj(nextChapter, nextVerses[i + 1]);
      } else if (nextVerses[i + 1] < currentVerse) {
        return refObj(0, 0);
      }
    }
    return refObj(0, 0);
  } catch (error) {
    console.error('Error in getNext:', error);
    return refObj(0, 0);
  }
}

