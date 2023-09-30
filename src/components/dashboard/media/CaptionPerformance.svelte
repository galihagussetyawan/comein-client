<script lang="ts">
  import { onMount } from "svelte";
  import { mediaInsightsStore } from "../../../store/state";

  let data = null;

  onMount(() => {
    const temp = [];
    const captions = [];

    $mediaInsightsStore.forEach((v) => {
      if (v.caption) {
        const regexWithoutHashtag = /(?:^|(?<=\s))#(\w+)/g;
        const regexWithoutEnter = /[\n!@#$%^&*()]/g;
        const regexWithoutPunctuation = /[^\w\s]/g;
        const regex = new RegExp(
          `(${regexWithoutHashtag.source})|(${regexWithoutEnter.source})|(${regexWithoutPunctuation.source})`,
          "g"
        );
        const text = v.caption
          .replace(regex, "")
          .split(" ")
          .filter((v) => v !== "" && v.length > 3)
          .map((v) => v.toLocaleLowerCase());

        if (text.length > 0) {
          temp.push({
            values: text,
            engagment: v?.insights?.data[0]?.values[0]?.value,
            reach: v?.insights?.data[2]?.values[0]?.value,
          });
        }
      }
    });

    temp?.forEach((data) => {
      data?.values?.forEach((v) => {
        captions.push({
          text: v,
          quantity: 1,
          engagment: data?.engagment,
          reach: data?.reach,
          engagment_avg: data?.engagment / 1,
          reach_avg: data?.reach / 1,
        });
      });
    });

    //aggregations
    const result = captions.reduce((acc, curr) => {
      const objInAcc = acc.find((o) => o.text === curr.text);
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

<div class="md:min-h-[350px] grid md:grid-cols-3 gap-20 md:gap-10 md:mt-5 p-5">
  <!-- captions performance by engagment -->
  <div>
    <div class="flex border-b">
      <p class="md:text-[0.9rem]">Top Captions by Engagment</p>
    </div>
    <ul class="md:text-[1.1rem] font-medium mt-3">
      {#if data}
        {#each data
          .sort((a, b) => b.engagment_avg - a.engagment_avg)
          .splice(0, data.length > 10 ? 10 : data.length) as v}
          <li class="flex justify-between py-1">
            <p>{v?.text}</p>
            <p>{v?.engagment_avg}</p>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <!-- END - captions performance by engagment -->

  <!-- captions performance by reach -->
  <div>
    <div class="flex border-b">
      <p class="md:text-[0.9rem]">Top Captions by Reach</p>
    </div>
    <ul class="md:text-[1.1rem] font-medium mt-3">
      {#if data}
        {#each data
          .sort((a, b) => b.reach_avg - a.reach_avg)
          .splice(0, data.length > 10 ? 10 : data.length) as v}
          <li class="flex justify-between py-1">
            <p>{v?.text}</p>
            <p>{v?.reach_avg}</p>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <!-- END - captions performance by reach -->

  <!-- most used captions -->
  <div>
    <div class="flex border-b">
      <p class="md:text-[0.9rem]">Most Used Captions</p>
    </div>
    <ul class="md:text-[1.1rem] font-medium mt-3">
      {#if data}
        {#each data
          .sort((a, b) => b.quantity - a.quantity)
          .splice(0, data.length > 10 ? 10 : data.length) as v}
          <li class="flex justify-between py-1">
            <p>{v?.text}</p>
            <p>{v?.quantity}</p>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <!-- END - most used captions -->
</div>
