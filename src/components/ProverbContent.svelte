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

</script>

<div class="proverb-navigation">
  <a class={hasPrevious ? "" : "disableClick"} href={`/${previousChapter}/${previousVerse}`} data-sveltekit-reload >
    <img 
      class="previous-proverb prev-next" 
      name="previous-proverb" 
      src={hasPrevious ? `/icons/arrow-small-left.svg` : `/icons/arrow-small-left-grey.svg`}
      width={30}
      height={30}
    />
  </a>
  <article class="main-content">
    {#if hasContent}
    <h2>Proverb {data.Chapter}:{data.StartVerse}{proverbSuffix}</h2>
    <p>{@html passage}</p>
    {@html data.Commentary}
    {:else}
    <p>We're sorry. There was an error getting the commentary for this proverb.</p>
    {/if}
  </article>
  <a class={hasNext ? "" : "disableClick"} href={`/${nextChapter}/${nextVerse}`} data-sveltekit-reload >
    <img 
      class="next-proverb prev-next" 
      name="next-proverb" 
      src={hasNext ? `/icons/arrow-small-right.svg` : `/icons/arrow-small-right-grey.svg`}
      width={30}
      height={30}
    />
  </a>
</div>

<style>
  .proverb-navigation {
    margin-top: 40px; 
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3em;
  }

  .prev-next {
    position: fixed;
    top: 50vh;
  }

  .previous-proverb {
    left: 30px;
  }

  .next-proverb {
    right: 30px;
  }

  .main-content {
    font-size: 20px;
    line-height: 1.5;
  }

  h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  .disableClick {
    pointer-events: none;
  }

</style>
