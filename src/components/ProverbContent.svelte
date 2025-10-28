<script lang="ts">
  import { getPrevious, getNext } from '../utils/reference';
  let { data } = $props();
  const hasContent = $derived(data && 
    data.StartVerse && 
    data.EndVerse && 
    data.Chapter && 
    data.Passage && 
    data.Commentary);

  const verseObjMap: Map<string, number[]> | null = $derived(data.verses ? new Map(Object.entries(data.verses)) : null);
  const pResults = $derived(getPrevious(Number(data.StartVerse), Number(data.Chapter), verseObjMap));
  const nResults = $derived(getNext(Number(data.StartVerse), Number(data.Chapter), verseObjMap));
  const previousChapter = $derived(pResults.chapter);
  const previousVerse = $derived(pResults.verse);
  const nextChapter = $derived(nResults.chapter);
  const nextVerse = $derived(nResults.verse);
  const hasPrevious = $derived(previousChapter !== 0 && previousVerse !== 0);
  const hasNext = $derived(nextChapter != 0 && nextVerse !== 0);
  
  const proverbSuffix = data.StartVerse !== data.EndVerse ? ` - ${data.EndVerse}` : "";
  const passage = data.Passage ? data.Passage.replace('\n', '<br />') : "";

  function handleGetPrevious(event: MouseEvent) {
    event.preventDefault();
    window.location.href = `/${previousChapter}/${previousVerse}`;
  }
  
  function handleGetNext(event: MouseEvent) {
    event.preventDefault();
    window.location.href = `/${nextChapter}/${nextVerse}`;
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

  a.rtBibleRef {
    text-decoration: none !important; /* Remove default underline */
    border-bottom: 1px dotted rgba(0, 0, 0, 0.5); /* Dotted underline with light opacity */
    transition: border-color 0.3s ease-in-out;
    &:hover {
      border-bottom-color: rgba(0, 0, 0, 0.7); /* Darken underline on hover */
    }
  }
</style>
