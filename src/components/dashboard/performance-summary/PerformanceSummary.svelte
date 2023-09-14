<script lang="ts">
  import { Popover } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { getProfileInsightsInstagram } from "../../../services/account.service";
  import {
    comparisonProfileInsightsStore,
    comparisonSinceDateStore,
    comparisonUntilDateStore,
    profileInsightsStore,
    sinceDateStore,
    untilDateStore,
  } from "../../../store/state";
  import Comparison from "./ComparisonPercentage.svelte";

  export let API_BASE_URL;

  function parseDataInsight(name: string, data: any): number {
    return data?.insights?.data?.find((d) => d?.name === name)?.total_value;
  }

  onMount(async () => {
    const res = await getProfileInsightsInstagram(
      API_BASE_URL,
      $sinceDateStore,
      $untilDateStore
    );

    const resComparison = await getProfileInsightsInstagram(
      API_BASE_URL,
      $comparisonSinceDateStore,
      $comparisonUntilDateStore
    );

    profileInsightsStore.set(res.data);
    comparisonProfileInsightsStore.set(resComparison.data);
  });
</script>

<div class="md:mt-10">
  <p class="font-medium text-[1.2rem]">Performance Summary</p>
  <p class="font-light">
    View your key profile performance metrics from the reporting period.
  </p>
  <div class="mt-5 md:grid md:grid-cols-3 md:rounded-md border">
    <!-- IMPRESSION SECTION -->
    <div class="md:p-5">
      <p class="font-light">Impressions</p>
      <div class="md:flex md:items-end">
        <p class="text-[2rem] font-medium">
          {parseDataInsight("impressions", $profileInsightsStore)}
          <!-- impression value -->
        </p>
        <p id="percentage-impressions" class="md:flex md:text-[1rem] md:p-2">
          <Comparison
            value={parseDataInsight("impressions", $profileInsightsStore)}
            comparisonValue={parseDataInsight(
              "impressions",
              $comparisonProfileInsightsStore
            )}
          />
          <!-- impression different percentage value -->
        </p>
        <Popover
          class="w-64 md:text-[0.9rem] md:font-medium"
          triggeredBy="#percentage-impressions"
        >
          <div class="md:divide-y">
            <div class="md:flex md:justify-between md:py-1">
              <p>This period</p>
              <p>{parseDataInsight("impressions", $profileInsightsStore)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight(
                  "impressions",
                  $comparisonProfileInsightsStore
                )}
              </p>
            </div>
          </div>
        </Popover>
      </div>
    </div>
    <!-- END - IMPRESSION SECTION -->

    <!-- REACH SECTION -->
    <div class="md:p-5 md:border-l">
      <p class="font-light">Reach</p>
      <div class="md:flex md:items-end">
        <p class="text-[2rem] font-medium">
          {parseDataInsight("reach", $profileInsightsStore)}
        </p>
        <p id="percentage-reach" class="md:p-2">
          <Comparison
            value={parseDataInsight("reach", $profileInsightsStore)}
            comparisonValue={parseDataInsight(
              "reach",
              $comparisonProfileInsightsStore
            )}
          />
        </p>
        <Popover
          class="w-64 md:text-[0.9rem] md:font-medium"
          triggeredBy="#percentage-reach"
        >
          <div class="md:divide-y">
            <div class="md:flex md:justify-between md:py-1">
              <p>This period</p>
              <p>{parseDataInsight("reach", $profileInsightsStore)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight("reach", $comparisonProfileInsightsStore)}
              </p>
            </div>
          </div>
        </Popover>
      </div>
    </div>
    <!-- END - REACH SECTION -->

    <!-- PROFILE VIEWS -->
    <div class="md:p-5 md:border-l">
      <p class="font-light">Profile Views</p>
      <div class="md:flex md:items-end">
        <p class="text-[2rem] font-medium">
          {parseDataInsight("profile_views", $profileInsightsStore)}
        </p>
        <p id="percentage-profile-views" class="md:p-2">
          <Comparison
            value={parseDataInsight("profile_views", $profileInsightsStore)}
            comparisonValue={parseDataInsight(
              "profile_views",
              $comparisonProfileInsightsStore
            )}
          />
        </p>
        <Popover
          class="w-64 md:text-[0.9rem] md:font-medium"
          triggeredBy="#percentage-profile-views"
        >
          <div class="md:divide-y">
            <div class="md:flex md:justify-between md:py-1">
              <p>This period</p>
              <p>{parseDataInsight("profile_views", $profileInsightsStore)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight(
                  "profile_views",
                  $comparisonProfileInsightsStore
                )}
              </p>
            </div>
          </div>
        </Popover>
      </div>
    </div>
    <!-- END - PROFILE VIEWS -->

    <!-- WEBSITE CLICKS -->
    <div class="md:p-5 md:col-span-full md:border-t">
      <p class="font-light">Website Clicks</p>
      <div class="md:flex md:items-end">
        <p class="text-[2rem] font-medium">
          {parseDataInsight("website_clicks", $profileInsightsStore)}
        </p>
        <p id="percentage-website-clicks" class="md:p-2">
          <Comparison
            value={parseDataInsight("website_clicks", $profileInsightsStore)}
            comparisonValue={parseDataInsight(
              "website_clicks",
              $comparisonProfileInsightsStore
            )}
          />
        </p>
        <Popover
          class="w-64 md:text-[0.9rem] md:font-medium"
          triggeredBy="#percentage-website-clicks"
        >
          <div class="md:divide-y">
            <div class="md:flex md:justify-between md:py-1">
              <p>This period</p>
              <p>{parseDataInsight("website_clicks", $profileInsightsStore)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight(
                  "website_clicks",
                  $comparisonProfileInsightsStore
                )}
              </p>
            </div>
          </div>
        </Popover>
      </div>
    </div>
    <!-- END - WEBSITE CLICKS -->
  </div>
</div>
