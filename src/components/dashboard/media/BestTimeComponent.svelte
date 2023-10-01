<script lang="ts">
  import { onMount } from "svelte";
  import { mediaInsightsStore } from "../../../store/state";

  interface Data {
    x: number;
    y: number;
  }

  let maxDay = null;

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const sunday = [];
    const monday = [];
    const tuesday = [];
    const wednesday = [];
    const thursday = [];
    const friday = [];
    const saturday = [];

    function getCountReachByDay(day: number, hour: number, data: Data[]) {
      const isInDay = $mediaInsightsStore.filter(
        (v) =>
          new Date(v.timestamp).getDay() === day &&
          new Date(v.timestamp).getHours() === hour
      );

      if (isInDay.length === 0) {
        data.push({ x: hour, y: 0 });
      } else {
        const reduce = isInDay
          .map((v) => v.insights.data[2].values[0].value)
          .reduce((acc, curr) => Math.floor((acc + curr) / isInDay.length));
        data.push({ x: hour, y: reduce });
      }
    }

    for (let i = 0; i < 24; i++) {
      getCountReachByDay(0, i, sunday);
      getCountReachByDay(1, i, monday);
      getCountReachByDay(2, i, tuesday);
      getCountReachByDay(3, i, wednesday);
      getCountReachByDay(4, i, thursday);
      getCountReachByDay(5, i, friday);
      getCountReachByDay(6, i, saturday);
    }

    const options = {
      series: [
        {
          name: "Saturday",
          data: saturday,
        },
        {
          name: "Friday",
          data: friday,
        },
        {
          name: "Thursday",
          data: thursday,
        },
        {
          name: "Wednesday",
          data: wednesday,
        },
        {
          name: "Tuesday",
          data: tuesday,
        },
        {
          name: "Monday",
          data: monday,
        },
        {
          name: "Sunday",
          data: sunday,
        },
      ],
      chart: {
        height: 350,
        type: "heatmap",
        foreColor: "#373d3f",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#eb5e0b"],
      xaxis: {
        type: "numeric",
        tickAmount: 12,
        labels: {
          formatter: function (value) {
            return `${
              value.toFixed(0) < 10 ? "0" + value.toFixed(0) : value.toFixed(0)
            }:00`;
          },
        },
      },
      plotOptions: {
        heatmap: {
          enableShades: true,
          shadeIntensity: 0.7,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              {
                from: 0,
              },
            ],
          },
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " reach";
          },
        },
      },
    };

    // calculate best time for post "Days at time"
    maxDay = options.series
      .map((v) => {
        const maxValue = Math.max(...v.data.map((val) => val.y));
        return {
          name: v.name,
          x: v.data.findIndex((val) => val.y === maxValue),
          y: maxValue,
        };
      })
      .reduce((acc, curr) => (acc.y > curr.y ? acc : curr));

    const chart = new ApexCharts(
      document.querySelector("#chart-best-time"),
      options
    );
    chart.render();
  });
</script>

<div>
  <div id="chart-best-time" class="md:min-h-[350px]" />
  {#if maxDay && maxDay.y > 0}
    <p class="text-center">
      Best reach post time
      <span class="font-medium">
        {maxDay.name} at {maxDay.x < 10 ? "0" + maxDay.x : maxDay.x}:00
      </span>
    </p>
  {/if}
</div>
