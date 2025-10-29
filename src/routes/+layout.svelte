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
  .page-container {
    margin: auto;
    max-width: 700px;
  }

  .proverb-selection-container {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    gap: .5em;
  }

  .menu-items {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 2em;
    font-size: 18px;
    color: #775402;
  }

  a, a:visited {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: #d49b15;
  }

</style>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="page-container">
<header>
  <article class="menu-items">
    <a href="/" class="menu-ref" data-sveltekit-reload>HOME</a>
    <a href="/about" class="menu-ref" data-sveltekit-reload>ABOUT</a>
    <a href="/about?about-me" class="menu-ref" data-sveltekit-reload>ADOPTION FUND</a>
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
</div>
