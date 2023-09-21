<script>
  import { periodNameStore } from "../../../store/state";
  import ImpressionsChartMonth from "./ImpressionsChartMonth.svelte";
  import ImpressionsChartWeek from "./ImpressionsChartWeek.svelte";
</script>

<div class="md:h-[350px]">
  {#if $periodNameStore === "last month"}
    <svelte:component this={ImpressionsChartMonth} />
  {:else if $periodNameStore === "last week"}
    <svelte:component this={ImpressionsChartWeek} />
  {/if}
</div>
