<script lang="ts">
  import { onMount } from "svelte";
  import { getMediaInsightsInstagram } from "../../../services/account.service";
  import {
    comparisonSinceDateStore,
    comparisonUntilDateStore,
    mediaInsightsStore,
    periodNameStore,
    sinceDateStore,
    untilDateStore,
  } from "../../../store/state";
  import PublishingChartMonth from "./PublishingChartMonth.svelte";
  import PublishingChartWeek from "./PublishingChartWeek.svelte";

  export let API_BASE_URL;

  onMount(() => {
    periodNameStore.subscribe(async (v) => {
      if (
        $sinceDateStore &&
        $untilDateStore &&
        $comparisonSinceDateStore &&
        $comparisonUntilDateStore
      ) {
        const res = await getMediaInsightsInstagram(
          API_BASE_URL,
          $sinceDateStore,
          $untilDateStore
        );

        mediaInsightsStore.set(res.data.data);
      }
    });
  });
</script>

{#if $periodNameStore === "last month"}
  <svelte:component this={PublishingChartMonth} />
{:else if $periodNameStore === "last week"}
  <svelte:component this={PublishingChartWeek} />
{/if}
