<script lang="ts">
  export let value;
  export let comparisonValue;

  const perDiff =
    100 * Math.abs((value - comparisonValue) / ((value + comparisonValue) / 2))
      ? 100 *
        Math.abs((value - comparisonValue) / ((value + comparisonValue) / 2))
      : 0;
</script>

{#if value < comparisonValue}
  <span class="flex items-center gap-1 text-red-500 font-medium">
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
        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
      />
    </svg>
    <p>{`${perDiff?.toFixed(2)}%`}</p>
  </span>
{:else if value === comparisonValue}
  <span class="flex items-center gap-1 font-medium">
    {`${perDiff?.toFixed(2)}%`}
  </span>
{:else}
  <span class="flex items-center gap-1 font-medium text-green-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
    {`${perDiff?.toFixed(2)}%`}
  </span>
{/if}
