<script lang="ts">
  import { onMount } from "svelte";
  import { mediaInsightsStore } from "../../../store/state";

  // match(/#\w+/g)
  let data = null;
  onMount(async () => {
    const temp = [];
    const hashtags = [];

    $mediaInsightsStore.forEach((v) => {
      if (v?.caption && v?.caption?.match(/#\w+/g)) {
        temp.push({
          values: v?.caption?.match(/#\w+/g),
          engagment: v?.insights?.data[0]?.values[0]?.value,
          reach: v?.insights?.data[2]?.values[0]?.value,
        });
      }
    });

    temp?.forEach((data) => {
      data?.values?.forEach((v) => {
        hashtags.push({
          name: v,
          quantity: 1,
          engagment: data?.engagment,
          reach: data?.reach,
          engagment_avg: data?.engagment / 1,
          reach_avg: data?.reach / 1,
        });
      });
    });

    // aggregation
    const result = hashtags.reduce((acc, curr) => {
      const objInAcc = acc.find((o) => o.name === curr.name);
      if (objInAcc) {
        objInAcc.quantity += curr.quantity;
        objInAcc.engagment += curr.engagment;
        objInAcc.reach += curr.reach;
        objInAcc.engagment_avg = Math.floor(
          (objInAcc.engagment + curr.engagment) /
            (objInAcc.quantity + curr.quantity)
        );
        objInAcc.reach_avg = Math.floor(
          (objInAcc.reach + curr.reach) / (objInAcc.quantity + curr.quantity)
        );
      } else acc.push(curr);
      return acc;
    }, []);

    data = result;
  });
</script>

<div class="min-h-[500px] grid md:grid-cols-3 gap-20 md:gap-10 md:mt-5 p-5">
  <!-- hashtags by engagment -->
  <div>
    <div class="flex border-b">
      <p class="md:text-[0.9rem]">Top Hashtags by Engagment</p>
    </div>
    <ul class="md:text-[1.1rem] font-medium mt-3">
      {#if data}
        {#each data
          .sort((a, b) => b.engagment_avg - a.engagment_avg)
          .splice(0, data.length > 10 ? 10 : data.length) as v}
          <li class="flex justify-between py-1">
            <p>{v?.name}</p>
            <p>{v?.engagment_avg}</p>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <!-- END - hashtags by engagment -->

  <!-- hashtags by reach -->
  <div>
    <div class="flex border-b">
      <p class="md:text-[0.9rem]">Top Hashtags by Reach</p>
    </div>
    <ul class="md:text-[1.1rem] font-medium mt-3">
      {#if data}
        {#each data
          .sort((a, b) => b.reach_avg - a.reach_avg)
          .splice(0, data.length > 10 ? 10 : data.length) as v}
          <li class="flex justify-between py-1">
            <p>{v?.name}</p>
            <p>{v?.reach_avg}</p>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <!-- END - hashtags by reach -->

  <!-- most used hashtags -->
  <div>
    <div class="flex border-b">
      <p class="md:text-[0.9rem]">Most Used Hashtags</p>
    </div>
    <ul class="md:text-[1.1rem] font-medium mt-3">
      {#if data}
        {#each data
          .sort((a, b) => b.quantity - a.quantity)
          .splice(0, data.length > 10 ? 10 : data.length) as v}
          <li class="flex justify-between py-1">
            <p>{v?.name}</p>
            <p>{v?.quantity}</p>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <!-- END - most used hashtags -->
</div>
