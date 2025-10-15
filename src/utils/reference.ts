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

    try {
      let prevVerse;
      // Most of the time, the previous verse is within the same chapter, i.e 10:5, previous is 10:4
      let prevChapter = currentChapter; 
      let previousVerses = verseMap.get(currentChapter.toString());

      // If this is verse 1 OR if the first verse in the chapter is this verse (rare case, not anticipated)
      if (currentVerse === 1 || (previousVerses && previousVerses[0] === currentVerse)) {
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

      // If there is only one verse in the chapter and it's not verse 1 (rare case, not anticipated)
      if (!previousVerses || previousVerses.length < 2) {
        return refObj(0, 0);
      }

      // Find the current verse and select the one prior to it in the list
      for (let i = 1; i <= previousVerses.length; i++) {
        if (previousVerses[i] === currentVerse) {
          return refObj(prevChapter, previousVerses[i - 1]);
        } else if (previousVerses[i - 1] >= currentVerse) {
          return refObj(0, 0);
        }

        i++;
      }

      return refObj(0, 0);
    } catch (error) {
      console.error("Error in getPrevious:", error);
      return refObj(0, 0);
    }
  }
