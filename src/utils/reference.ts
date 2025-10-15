function refObj(c: number, v: number) {
  return { chapter: c, verse: v };
}

export function getPrevious(
    currentVerse: number | undefined,
    currentChapter: number | undefined, 
    verseMap: Map<string, number[]> | null
  ): { chapter: number, verse: number } {
    if (!verseMap || !currentVerse || !currentChapter) {
      return refObj(0, 0);
    }

    let prevVerse;
    let prevChapter = currentChapter;
    let previousVerses = verseMap.get(currentChapter.toString());

    if (currentVerse === 1) {
      prevChapter = currentChapter - 1;
      previousVerses = verseMap.get(prevChapter.toString());
      if (previousVerses && previousVerses.length > 0) {
        // Get the last verse in the chapter
        prevVerse = previousVerses[previousVerses.length - 1];
      } else {
        return refObj(0, 0);
      }

      return refObj(prevChapter, prevVerse);
    } 

    // If there is only one verse in the chapter and the verse is not verse 1. This would be a rare case.
    if (!previousVerses || previousVerses.length < 2) {
      return refObj(0, 0);
    }

    let i = 0;
    for (let j = 1; j <= previousVerses.length; j++) {
      if (previousVerses[j] === currentVerse) {
        return refObj(prevChapter, previousVerses[i]);
      } else if (previousVerses[i] >= currentVerse) {
        return refObj(0, 0);
      }

      i++;
    }

    return refObj(0, 0);
  }
