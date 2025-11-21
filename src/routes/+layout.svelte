<script lang="ts">
  let { children, data } = $props();
  import { page } from '$app/state';  

  const { 
    chapters, 
    verses, 
    featuredStartVerse, 
    featuredChapter 
  } = data;
  const hasContent = $state(chapters != undefined && 
    verses != undefined && 
    chapters.length > 0 && 
    verses["10"] && 
    verses["10"].length > 0);

  function seedSelectedVerse(
    pageVerse: string | undefined, 
    featuredVerse: string, 
    routeId: string | null
  ) {
    if (routeId && routeId.toLowerCase().includes("about")) return "";
    if (pageVerse) return pageVerse;
    return featuredVerse ? featuredVerse.toString() : "";
  }

  function seedSelectedChapter(
    pageChapter: string | undefined, 
    featuredChapter: string, 
    routeId: string | null) 
  {
    if (routeId && routeId.toLowerCase().includes("about")) return "10";
    if (pageChapter) return pageChapter;
    return featuredChapter ? featuredChapter.toString() : "";
  }

  let selectedChapter: string = $state(seedSelectedChapter(page.params?.chapter, featuredChapter, page.route?.id));
  let selectedVerse = $state(seedSelectedVerse(page.params?.verse, featuredStartVerse, page.route?.id));

  function handleVerseChange(event: MouseEvent) {
    event.preventDefault();
    window.location.href = `/${selectedChapter}/${selectedVerse}`;
  }

  function handleChapterChange(event: MouseEvent) {
    event.preventDefault();
    selectedVerse = "";
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
    <option value={chapter.toString()}>
      {chapter}
    </option>
  {/each}
</select>
<p>Verse</p>
<select bind:value={selectedVerse} onchange={handleVerseChange} >
  <option value={""}></option>
  {#each verses[selectedChapter.toString()] as verse}
    <option value={verse.toString()}>
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
