<script lang="ts">
  import { periodNameStore } from "../../../store/state";
  import InsightChartMonth from "./InsightChartMonth.svelte";
  import InsightChartWeek from "./InsightChartWeek.svelte";
</script>

{#if $periodNameStore === "last month"}
  <svelte:component this={InsightChartMonth} name="website_clicks" />
{:else if $periodNameStore === "last week"}
  <svelte:component this={InsightChartWeek} name="website_clicks" />
{/if}
