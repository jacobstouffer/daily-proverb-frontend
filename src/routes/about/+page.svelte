<script>
  import AboutMeTab from "../../components/Tabs/AboutMe.svelte";
  import DevotionalProverbTab from "../../components/Tabs/DevotionalProverb.svelte";
  import GospelTab from "../../components/Tabs/Gospel.svelte";
  import CopyrightTab from "../../components/Tabs/Copyright.svelte";
  import Tabs from "../../components/Tabs/Tabs.svelte";

  // List of tab items with labels, values and assigned components
  let items = [
    { 
      label: "About Me",
      value: "about-me",
      component: AboutMeTab,
    },
    { 
      label: "Studying the Proverbs",
      value: "proverbs-devotional",
      component: DevotionalProverbTab,
    },
    { 
      label: "What is the Gospel?",
      value: "what-is-the-gospel",
      component: GospelTab,
    },
    {
      label: "Copyright",
      value: "copyright",
      component: CopyrightTab,
    },
  ];
</script>

<Tabs {items} />
