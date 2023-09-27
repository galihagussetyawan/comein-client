<script lang="ts">
  import { onMount } from "svelte";
  import {
    comparisonProfileInsightsStore,
    periodNameStore,
    profileInsightsStore,
  } from "../../../store/state";

  export let name;

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    if ($periodNameStore === "last month") {
      const data = $profileInsightsStore?.insights?.data
        .find((v) => v.name === name)
        .values.map((v) => {
          return {
            x: new Date(v.end_time).getDate(),
            y: v.value,
          };
        });

      const compData = $comparisonProfileInsightsStore?.insights?.data
        .find((v) => v.name === name)
        .values.map((v) => {
          return {
            x: new Date(v.end_time).getDate(),
            y: v.value,
          };
        });

      const options = {
        series: [
          {
            name: "This month",
            data,
          },
          {
            name: "Last month",
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
        tooltip: {
          x: {
            formatter: function (value) {
              return "Day " + value;
            },
          },
        },
        annotations: {
          xaxis: [
            {
              x: new Date().getDate(),
              label: {
                borderColor: "#775DD0",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
                text: "Current day",
              },
            },
          ],
        },
      };

      const chart = new ApexCharts(
        document.querySelector(`#chart-${name}`),
        options
      );
      chart.render();
    }
  });
</script>

<div id={`chart-${name}`} />
