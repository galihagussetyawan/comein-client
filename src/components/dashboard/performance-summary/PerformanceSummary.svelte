<script lang="ts">
  import {
    profileInsights,
    comparisonProfileInsights,
  } from "../../../store/state";
  import { Popover } from "flowbite-svelte";
  import Comparison from "./ComparisonPercentage.svelte";

  function parseDataInsight(name: string, data: any): number {
    return data.insights.data.find((d) => d.name === name).value;
  }
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
          {parseDataInsight("impressions", $profileInsights)}
          <!-- impression value -->
        </p>
        <p id="percentage-impressions" class="md:flex md:text-[1rem] md:p-2">
          <Comparison
            value={parseDataInsight("impressions", $profileInsights)}
            comparisonValue={parseDataInsight(
              "impressions",
              $comparisonProfileInsights
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
              <p>{parseDataInsight("impressions", $profileInsights)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight("impressions", $comparisonProfileInsights)}
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
          {parseDataInsight("reach", $profileInsights)}
        </p>
        <p id="percentage-reach" class="md:p-2">
          <Comparison
            value={parseDataInsight("reach", $profileInsights)}
            comparisonValue={parseDataInsight(
              "reach",
              $comparisonProfileInsights
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
              <p>{parseDataInsight("reach", $profileInsights)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight("reach", $comparisonProfileInsights)}
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
          {parseDataInsight("profile_views", $profileInsights)}
        </p>
        <p id="percentage-profile-views" class="md:p-2">
          <Comparison
            value={parseDataInsight("profile_views", $profileInsights)}
            comparisonValue={parseDataInsight(
              "profile_views",
              $comparisonProfileInsights
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
              <p>{parseDataInsight("profile_views", $profileInsights)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight("profile_views", $comparisonProfileInsights)}
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
          {parseDataInsight("website_clicks", $profileInsights)}
        </p>
        <p id="percentage-website-clicks" class="md:p-2">
          <Comparison
            value={parseDataInsight("website_clicks", $profileInsights)}
            comparisonValue={parseDataInsight(
              "website_clicks",
              $comparisonProfileInsights
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
              <p>{parseDataInsight("website_clicks", $profileInsights)}</p>
            </div>
            <div class="md:flex md:justify-between md:py-1">
              <p>Comparison period</p>
              <p>
                {parseDataInsight("website_clicks", $comparisonProfileInsights)}
              </p>
            </div>
          </div>
        </Popover>
      </div>
    </div>
    <!-- END - WEBSITE CLICKS -->
  </div>
</div>
