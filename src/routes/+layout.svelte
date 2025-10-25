<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  let { children, data } = $props();
  import { page } from '$app/state';  

  const { chapters, verses } = data;
  const hasContent = chapters != undefined && 
    verses != undefined && 
    chapters.length > 0 && 
    verses["10"] && 
    verses["10"].length > 0;

  let selectedChapter = $state(Number(page.params?.chapter || ""));
  let selectedVerse = $state(Number(page.params?.verse || ""));

  function handleVerseChange(event: MouseEvent) {
    event.preventDefault();
    window.location.href = `/${selectedChapter}/${selectedVerse}`;
  }

  function handleChapterChange(event: MouseEvent) {
    event.preventDefault();
    selectedVerse = 1;
    window.location.href = `/${selectedChapter}/1`;
  }

</script>

<style>
  .proverb-selection-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;
  }

  .menu-items {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 2em;
  }

  .menu-ref {
    text-decoration: none;
  }

</style>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>


<header>
  <article class="menu-items">
    <a href="/" class="menu-ref" data-sveltekit-reload>Home</a>
    <a href="/about" class="menu-ref" data-sveltekit-reload>About</a>
    <a href="/about?about-me" class="menu-ref" data-sveltekit-reload>Adoption Fund</a>
  </article>
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
</header>

{@render children?.()}
