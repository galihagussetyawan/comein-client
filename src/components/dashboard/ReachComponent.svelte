<script lang="ts">
  import { periodNameStore } from "../../store/state";
  import InsightChartMonth from "./insights/InsightChartMonth.svelte";
  import InsightChartWeek from "./insights/InsightChartWeek.svelte";
</script>

{#if $periodNameStore === "last month"}
  <svelte:component this={InsightChartMonth} name="reach" />
{:else if $periodNameStore === "last week"}
  <svelte:component this={InsightChartWeek} name="reach" />
{/if}
