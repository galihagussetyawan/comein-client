<script lang="ts">
  import { onMount } from "svelte";
  import { mediaInsightsStore } from "../../../store/state";

  interface Data {
    x: number;
    y: number;
  }

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
          new Date(v.timestamp).getUTCHours() === hour
      );

      if (isInDay.length === 0) {
        data.push({ x: hour, y: 0 });
      } else {
        const reduce = isInDay
          .map((v) => v.insights.data[2].values[0].value)
          .reduce((acc, curr) => (acc + curr) / isInDay.length);
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
    const chart = new ApexCharts(
      document.querySelector("#chart-best-time"),
      options
    );
    chart.render();
  });
</script>

<div class="md:min-h-[500px]">
  <div id="chart-best-time" class="md:min-h-[350px]" />
  <p class="text-center">
    Best reach post time
    <span class="font-medium">Tuesday at 10:10</span>
  </p>
</div>
