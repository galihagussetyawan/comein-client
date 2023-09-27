<script lang="ts">
  import { onMount } from "svelte";
  import { mediaInsightsStore, periodNameStore } from "../../../store/state";
  import type { Media } from "../../../utils/types/ig-media-insights.res.interface";

  let medias: Media[] = [];

  onMount(() => {
    medias = $mediaInsightsStore?.sort(
      (a, b) =>
        b?.insights?.data[0]?.values[0]?.value -
        a?.insights?.data[0]?.values[0]?.value
    );
  });

  $: if ($periodNameStore) {
    medias = $mediaInsightsStore?.sort(
      (a, b) =>
        b?.insights?.data[0]?.values[0]?.value -
        a?.insights?.data[0]?.values[0]?.value
    );
  }
</script>

<div class="md:grid md:grid-cols-3 md:gap-5 md:mt-5">
  {#if medias}
    {#each medias as v}
      <div
        class="md:max-h-[500px] md:relative p-5 text-[0.9rem] overflow-hidden rounded-md border"
      >
        <span class="w-full h-2 md:absolute top-0 left-0 bg-ecstasy-600" />
        <div class="flex items-center gap-2">
          <div class="md:w-10 md:h-10 rounded-md bg-slate-100" />
          <p>
            {new Date(v.timestamp).toLocaleDateString("id", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hourCycle: "h24",
              timeZoneName: "short",
            })}
          </p>
        </div>
        {#if v.caption}
          <p class="mt-5 line-clamp-3">{v.caption}</p>
        {/if}
        <div
          class="w-full flex justify-center items-center relative aspect-[4/3] mt-5 rounded-md bg-slate-100"
        >
          <a
            href={v.permalink}
            class="px-5 py-2 rounded-md text-slate-500 md:hover:text-white bg-white md:hover:bg-ecstasy-500"
          >
            View on Instagram
          </a>
        </div>
        <ul class="md:mt-5 font-medium divide-y">
          {#each v?.insights?.data as insight}
            <li class="flex justify-between py-2">
              <p class="capitalize">{insight.name}</p>
              <p>{insight?.values[0]?.value}</p>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  {/if}
</div>
