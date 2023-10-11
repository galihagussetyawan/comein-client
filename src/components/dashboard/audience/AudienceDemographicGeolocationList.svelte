<script lang="ts">
  import { onMount } from "svelte";
  import {
    audienceDemographicByCityStore,
    audienceDemographicByCountryStore,
  } from "../../../store/state";

  let countryFlags = null;
  $: isShowAll = false;
  $: lenCountries = 10;
  $: lenCities = 10;

  function getCountryFlags(country: string) {
    return countryFlags?.find((v) => v?.country === country)?.flag;
  }

  function showAll() {
    if (isShowAll) {
      isShowAll = false;
      lenCountries = 10;
      lenCities = 10;
    } else {
      isShowAll = true;
      lenCountries = $audienceDemographicByCountryStore?.length;
      lenCities = $audienceDemographicByCityStore?.length;
    }
  }

  onMount(async () => {
    const res = await fetch("https://api.npoint.io/25880b0b3725497d6a6c");
    countryFlags = await res?.json();
  });
</script>

<div class="md:min-h-[350px] grid md:grid-cols-2 md:gap-10 md:p-5">
  {#if $audienceDemographicByCountryStore && $audienceDemographicByCityStore && countryFlags}
    <div>
      <p class="md:text-[0.9rem] font-medium underline">
        Audience Top Countries
      </p>
      <ul class="flex flex-col divide-y md:text-[1.1rem] font-light">
        {#each $audienceDemographicByCountryStore?.slice(0, $audienceDemographicByCountryStore.length > 10 ? lenCountries : $audienceDemographicByCountryStore?.length) as data, i}
          <li class={`flex justify-between py-2 ${i === 0 && "font-medium"}`}>
            <div class="flex items-center gap-3">
              <img
                class="w-5 h-5"
                src={getCountryFlags(data?.x)}
                alt={`${data.x} flag image.`}
              />
              <p>{data.x}</p>
            </div>
            <p>{data.y}</p>
          </li>
        {/each}
      </ul>
    </div>
    <div>
      <p class="md:text-[0.9rem] font-medium underline">Audience Top Cities</p>
      <ul class="flex flex-col divide-y md:text-[1.1rem] font-light">
        {#each $audienceDemographicByCityStore?.slice(0, $audienceDemographicByCityStore?.length > 10 ? lenCities : $audienceDemographicByCityStore?.length) as data, i}
          <li class={`flex justify-between py-2 ${i === 0 && "font-medium"}`}>
            <p>{data.x}</p>
            <p>{data.y}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
<div class="hidden w-full md:flex justify-center">
  {#if $audienceDemographicByCountryStore?.length > 10 || $audienceDemographicByCityStore?.length > 10}
    <button class="border rounded-md px-5 py-2" on:click={showAll}>
      {#if isShowAll}
        Show Top 10
      {:else}
        Show All
      {/if}
    </button>
  {/if}
</div>
