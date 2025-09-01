<script>
  import { page } from '$app/state';
  let { data } = $props();
  const proverbSuffix = data.StartVerse !== data.EndVerse ? ` - ${data.EndVerse}` : "";
  const passage = data.Passage.replace('\n', '<br />');
</script>

<h2>Proverb {data.Chapter}:{data.StartVerse}{proverbSuffix}</h2>
<p>{@html passage}</p>
{@html data.Commentary}

