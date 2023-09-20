<script lang="ts">
  import { Dropdown, DropdownItem } from "flowbite-svelte";
  import { onMount } from "svelte";
  import {
    comparisonSinceDateStore,
    comparisonUntilDateStore,
    periodNameStore,
    sinceDateStore,
    untilDateStore,
  } from "../../store/state";

  let sinceValue, untilValue, compareSinceValue, compareUntilValue;

  function getLastDayOfMonth(d: Date) {
    const date = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return date.getDate();
  }

  function parseDateLocale(d: string) {
    return new Date(d).toLocaleDateString("id", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function calcLastMonth() {
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
    sinceValue = parseDateLocale($sinceDateStore);
    untilValue = parseDateLocale($untilDateStore);
    compareSinceValue = parseDateLocale($comparisonSinceDateStore);
    compareUntilValue = parseDateLocale($comparisonUntilDateStore);

    periodNameStore.set("last month");
  }

  function calcLastWeek() {
    // calculate a week range date
    const sinceDate = new Date();
    const untilDate = new Date();
    sinceDate.setDate(untilDate.getDate() - 7);

    // set this date to date store
    sinceDateStore.set(sinceDate.toLocaleDateString());
    untilDateStore.set(untilDate.toLocaleDateString());

    // calculate compare range date
    const compareUntilDate = new Date(sinceDate.toLocaleDateString());
    compareUntilDate.setDate(compareUntilDate.getDate() - 1);
    const compareSinceDate = new Date(compareUntilDate.toLocaleDateString());
    compareSinceDate.setDate(compareSinceDate.getDate() - 7);

    // set compare date range to date store
    comparisonSinceDateStore.set(compareSinceDate.toLocaleDateString());
    comparisonUntilDateStore.set(compareUntilDate.toLocaleDateString());

    // formatter for UI input date type
    sinceValue = parseDateLocale($sinceDateStore);
    untilValue = parseDateLocale($untilDateStore);
    compareSinceValue = parseDateLocale($comparisonSinceDateStore);
    compareUntilValue = parseDateLocale($comparisonUntilDateStore);

    periodNameStore.set("last week");
  }

  onMount(() => {
    switch ($periodNameStore) {
      case "last month":
        calcLastMonth();
        break;
      case "last week":
        calcLastWeek();
        break;
    }
  });
</script>

<div class="md:text-[0.9rem]">
  <div class="md:flex md:items-center md:gap-5">
    <p class="md:font-medium">Reporting Period :</p>
    <button
      id="period-btn"
      class="md:w-28 md:flex md:justify-between md:items-center md:gap-1 md:px-2 md:py-1 md:border md:rounded-md md:text-left"
    >
      {$periodNameStore}
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
    </button>
  </div>
  <button
    class="md:flex md:items-center md:gap-2 md:mt-2 md:p-2 md:rounded-md md:border md:text-start"
  >
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
    </span>
    <div class="md:flex md:items-center md:gap-2">
      <!-- compare range date section -->
      <div class="md:flex">
        <p>
          {compareSinceValue}
        </p>
        <span>-</span>
        <p>
          {compareUntilValue}
        </p>
      </div>
      <!-- END - compare range date section -->

      <p>to</p>

      <!-- this range date section -->
      <div class="md:flex md:font-medium">
        <p>
          {sinceValue}
        </p>
        <span>-</span>
        <p>
          {untilValue}
        </p>
      </div>
      <!-- END - this range date section -->
    </div>
  </button>
</div>

<Dropdown triggeredBy="#period-btn">
  <DropdownItem on:click={calcLastMonth}>last month</DropdownItem>
  <DropdownItem on:click={calcLastWeek}>last week</DropdownItem>
</Dropdown>
