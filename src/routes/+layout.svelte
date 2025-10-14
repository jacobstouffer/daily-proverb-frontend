<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { goto } from '$app/navigation';
  let { children, data } = $props();
  import { page } from '$app/state';  

  const { chapters, verses } = data;
  let hasContent = true;

  if (!chapters || !verses) {
    console.error("Error getting chapters and verses");
    hasContent = false;
  }
  
  let selectedChapter = $state(Number(page.params?.chapter || ""));
  let selectedVerse = $state(Number(page.params?.verse || ""));

  function handleVerseChange(event) {
    event.preventDefault();
    goto(`/${selectedChapter}/${selectedVerse}`);
  }

  function handleChapterChange(event) {
    event.preventDefault();
    selectedVerse = 1;
    goto(`/${selectedChapter}/1`);
  }

</script>

<style>
  .proverb-selection-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;
  }
</style>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if hasContent}
<article class="proverb-selection-container">
<p>Chapter</p>
<select bind:value={selectedChapter} onchange={handleChapterChange} >
  {#each chapters as chapter}
    <option value={chapter}>
      {chapter}
    </option>
  {/each}
</select>
<p>Verse</p>
<select bind:value={selectedVerse} onchange={handleVerseChange} >
  {#each verses[selectedChapter.toString()] as verse}
    <option value={verse}>
      {verse}
    </option>
  {/each}
</select>
</article>
{:else}
{/if}

{@render children?.()}
