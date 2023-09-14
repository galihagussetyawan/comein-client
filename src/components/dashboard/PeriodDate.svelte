<script lang="ts">
  import { onMount } from "svelte";
  import {
    comparisonSinceDateStore,
    comparisonUntilDateStore,
    sinceDateStore,
    untilDateStore,
  } from "../../store/state";

  let sinceValue, untilValue;

  function getLastDayOfMonth(d: Date) {
    const date = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return date.getDate();
  }

  onMount(() => {
    // calculate this date
    const untilDate = new Date(Date.now());
    const sinceDate = new Date(Date.now());

    sinceDate.setDate(1);
    untilDate.setDate(getLastDayOfMonth(untilDate));

    //set this date to date store
    sinceDateStore.set(sinceDate.toLocaleDateString());
    untilDateStore.set(untilDate.toLocaleDateString());

    //calculation compare date
    const compareSinceDate = new Date($sinceDateStore);
    const compareUntilDate = new Date($untilDateStore);

    compareSinceDate.setMonth(compareSinceDate.getMonth() - 1);
    compareUntilDate.setMonth(compareUntilDate.getMonth() - 1);
    compareUntilDate.setDate(getLastDayOfMonth(compareUntilDate));

    // set comparison date to dates tore
    comparisonSinceDateStore.set(compareSinceDate.toLocaleDateString());
    comparisonUntilDateStore.set(compareUntilDate.toLocaleDateString());

    // formatter for UI input date type
    sinceValue = Intl.DateTimeFormat("sv-SE").format(new Date($sinceDateStore));
    untilValue = Intl.DateTimeFormat("sv-SE").format(new Date($untilDateStore));
  });
</script>

<!-- Period/Range date -->
<div class="md:py-1 md:px-3 md:rounded-md md:border bg-white">
  <p class="md:text-[0.8rem] md:font-light">Range date</p>
  <p class="md:text-[0.9rem] md:font-medium">
    <input type="date" class="md:w-28" bind:value={sinceValue} />
    -->
    <input type="date" class="md:w-28" bind:value={untilValue} />
  </p>
</div>
<!-- END-Period/Range date -->
