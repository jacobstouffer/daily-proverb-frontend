<script lang="ts">
  import { goto } from '$app/navigation';
  import { getPrevious } from '../utils/reference';
  let { data } = $props();
  const hasContent = data && 
    data.StartVerse && 
    data.EndVerse && 
    data.Chapter && 
    data.Passage && 
    data.Commentary;

  let previousChapter = $state(0);
  let previousVerse = $state(0);
  let nextChapter = $state(0);
  let nextVerse = $state(0);
  let hasPrevious = $state(false);
  let hasNext = false;

  $effect(() => {
    const verseObjMap: Map<string, number[]> | null = data.verses ? new Map(Object.entries(data.verses)) : null;
    const results = getPrevious(data.StartVerse, data.Chapter, verseObjMap);
    previousChapter = results.chapter;
    previousVerse = results.verse;
    hasPrevious = previousChapter !== 0 && previousVerse !== 0;
  });

  const proverbSuffix = data.StartVerse !== data.EndVerse ? ` - ${data.EndVerse}` : "";
  const passage = data.Passage ? data.Passage.replace('\n', '<br />') : "";

  function handleGetPrevious(event: MouseEvent) {
    event.preventDefault();
    goto(`/${previousChapter}/${previousVerse}`);
  }
  
  function handleGetNext(event: MouseEvent) {
    event.preventDefault();
    goto(`/${nextChapter}/${nextVerse}`);
  }

</script>

<div class="proverb-navigation">
  <button name="previous-proverb" disabled={!hasPrevious} onclick={handleGetPrevious}>Previous</button>
  <article class="main-content">
    {#if hasContent}
    <h2>Proverb {data.Chapter}:{data.StartVerse}{proverbSuffix}</h2>
    <p>{@html passage}</p>
    {@html data.Commentary}
    {:else}
    <p>We're sorry. There was an error getting the commentary for this proverb.</p>
    {/if}
  </article>
  <button name="next-proverb" disabled={!hasNext} onclick={handleGetNext}>Next</button>
</div>

<style>
  .proverb-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3em;
  }
</style>
