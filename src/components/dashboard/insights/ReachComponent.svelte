<script lang="ts">
  import { periodNameStore } from "../../../store/state";
  import InsightChartMonth from "./InsightChartMonth.svelte";
  import InsightChartWeek from "./InsightChartWeek.svelte";
</script>

<div class="md:h-[350px]">
  {#if $periodNameStore === "last month"}
    <svelte:component this={InsightChartMonth} name="reach" />
  {:else if $periodNameStore === "last week"}
    <svelte:component this={InsightChartWeek} name="reach" />
  {/if}
</div>
