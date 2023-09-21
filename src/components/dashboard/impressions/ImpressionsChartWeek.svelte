<script lang="ts">
  import { onMount } from "svelte";
  import {
    comparisonProfileInsightsStore,
    periodNameStore,
    profileInsightsStore,
  } from "../../../store/state";

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    if ($periodNameStore === "last week") {
      const data = $profileInsightsStore.insights.data
        .find((v) => v.name === "impressions")
        .values.map((v) => {
          return {
            x: new Date(v.end_time).toLocaleDateString("en", {
              weekday: "long",
            }),
            y: v.value,
          };
        });

      const compData = $comparisonProfileInsightsStore.insights.data
        .find((v) => v.name === "impressions")
        .values.map((v) => {
          return {
            x: new Date(v.end_time).toLocaleDateString("en", {
              weekday: "long",
            }),
            y: v.value,
          };
        });

      const options = {
        series: [
          {
            name: "This week",
            data,
          },
          {
            name: "Last week",
            data: compData,
          },
        ],
        chart: {
          height: 350,
          type: "area",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
      };

      const chart = new ApexCharts(
        document.querySelector("#chart-impressions"),
        options
      );
      chart.render();
    }
  });
</script>

<div id="chart-impressions" />
