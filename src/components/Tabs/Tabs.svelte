<script>
  import { page } from '$app/state';
  const paramTab = page.url.searchParams.get('tab');
  const validTabs = ["about-me", "proverbs-devotional", "what-is-the-gospel", "copyright"];
  export let items = [];
  export let activeTabValue = paramTab && validTabs.includes(paramTab) ? paramTab : "about-me";

  const handleClick = tabValue => () => {
    console.log("tabValue:", tabValue);
    window.location.href = `/about?tab=${tabValue}`
  }
</script>

<ul>
{#each items as item}
  <li class={activeTabValue === item.value ? 'active' : ''}>
    <span on:click={handleClick(item.value)}>{item.label}</span>
  </li>
{/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div class="box">
      <svelte:component this={item.component}/>
    </div>
  {/if}
{/each}
<style>
  .box {
    margin-bottom: 10px;
    padding: 40px;
    border: 1px solid #dee2e6;
    border-radius: 0 0 .5rem .5rem;
    border-top: 0;
    font-size: 20px;
    line-height: 1.5;
  }
  
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
    font-size: 18px;
  }
  li {
    margin-bottom: -1px;
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: #775402;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
