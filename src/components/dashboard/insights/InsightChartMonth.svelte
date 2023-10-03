<script lang="ts">
  import { onMount } from "svelte";
  import {
    comparisonProfileInsightsStore,
    comparisonSinceDateStore,
    comparisonUntilDateStore,
    periodNameStore,
    profileInsightsStore,
    sinceDateStore,
    untilDateStore,
  } from "../../../store/state";

  export let name;

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const data = [];
    const compData = [];

    if ($periodNameStore === "last month") {
      for (
        let i = new Date($sinceDateStore);
        i < new Date($untilDateStore);
        i.setDate(i.getDate() + 1)
      ) {
        const find = $profileInsightsStore.insights?.data
          .find((v) => v.name === name)
          .values.find((v) => new Date(v.end_time).getDate() === i.getDate());
        if (find) {
          data.push({ x: i.getDate(), y: find?.value });
        } else {
          data.push({ x: i.getDate(), y: 0 });
        }
      }

      for (
        let i = new Date($comparisonSinceDateStore);
        i < new Date($comparisonUntilDateStore);
        i.setDate(i.getDate() + 1)
      ) {
        const find = $comparisonProfileInsightsStore?.insights?.data
          .find((v) => v.name === name)
          .values.find((v) => new Date(v.end_time).getDate() === i.getDate());
        if (find) {
          compData.push({ x: i.getDate(), y: find?.value });
        } else {
          compData.push({ x: i.getDate(), y: 0 });
        }
      }

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
