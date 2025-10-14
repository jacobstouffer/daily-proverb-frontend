<script>
  let { data } = $props();
  const hasContent = data && 
    data.StartVerse && 
    data.EndVerse && 
    data.Chapter && 
    data.Passage && 
    data.Commentary;

  const proverbSuffix = data.StartVerse !== data.EndVerse ? ` - ${data.EndVerse}` : "";
  const passage = data.Passage ? data.Passage.replace('\n', '<br />') : "";
</script>

{#if hasContent}
<h2>Proverb {data.Chapter}:{data.StartVerse}{proverbSuffix}</h2>
<p>{@html passage}</p>
{@html data.Commentary}
{:else}
<p>We're sorry. There was an error getting the commentary for this proverb.</p>
{/if}
