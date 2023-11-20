<script lang="ts">
  import { onMount } from "svelte";
  import { mediaInsightsStore, periodNameStore } from "../../../store/state";

  let topEngagmentHashtags = null;
  let topReachHastags = null;
  let mostUsedHastags = null;

  function calculate() {
    const temp = [];
    const hashtags = [];

    $mediaInsightsStore?.forEach((v) => {
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

    topEngagmentHashtags = result
      ?.map((v) => {
        return v;
      })
      .sort((a, b) => b.engagment_avg - a.engagment_avg);

    topReachHastags = result
      ?.map((v) => {
        return v;
      })
      .sort((a, b) => b.reach_avg - a.reach_avg);

    mostUsedHastags = result
      ?.map((v) => {
        return v;
      })
      .sort((a, b) => b.quantity - a.quantity);
  }
  onMount(() => {
    periodNameStore.subscribe((v) => {
      calculate();
    });
  });
</script>

<div class="md:min-h-[350px] grid md:grid-cols-3 gap-20 md:gap-10 md:mt-5 p-5">
  <!-- hashtags by engagment -->
  <div>
    <div class="flex border-b">
      <p class="md:text-[0.9rem]">Top Hashtags by Engagment</p>
    </div>
    <ul class="md:text-[1.1rem] font-medium mt-3">
      {#if topEngagmentHashtags}
        {#each topEngagmentHashtags.splice(0, topReachHastags.length > 10 ? 10 : topReachHastags.length) as v}
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
      {#if topReachHastags}
        {#each topReachHastags.splice(0, topReachHastags.length > 10 ? 10 : topReachHastags.length) as v}
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
      {#if mostUsedHastags}
        {#each mostUsedHastags.splice(0, mostUsedHastags.length > 10 ? 10 : mostUsedHastags.length) as v}
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
