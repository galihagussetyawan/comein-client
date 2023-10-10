<script lang="ts">
  import { onMount } from "svelte";
  import { getOnlineAudienceHistory } from "../../../services/account.service";
  import { onlineAudienceHistoryStore } from "../../../store/state";

  export let API_BASE_URL;

  interface Series {
    name: string;
    data: any;
  }

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    const dateNow = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const res = await getOnlineAudienceHistory(
      API_BASE_URL,
      lastMonth?.toLocaleDateString(),
      dateNow?.toLocaleDateString()
    );

    if (res?.data) {
      onlineAudienceHistoryStore.set(res.data);
    }

    const series: Series[] = [
      { name: "00:00", data: [] },
      { name: "01:00", data: [] },
      { name: "02:00", data: [] },
      { name: "03:00", data: [] },
      { name: "04:00", data: [] },
      { name: "05:00", data: [] },
      { name: "06:00", data: [] },
      { name: "07:00", data: [] },
      { name: "08:00", data: [] },
      { name: "09:00", data: [] },
      { name: "10:00", data: [] },
      { name: "11:00", data: [] },
      { name: "12:00", data: [] },
      { name: "13:00", data: [] },
      { name: "14:00", data: [] },
      { name: "15:00", data: [] },
      { name: "16:00", data: [] },
      { name: "17:00", data: [] },
      { name: "18:00", data: [] },
      { name: "19:00", data: [] },
      { name: "20:00", data: [] },
      { name: "21:00", data: [] },
      { name: "22:00", data: [] },
      { name: "23:00", data: [] },
    ];

    $onlineAudienceHistoryStore?.data[0]?.values?.forEach((audience) => {
      const convertToArr = Object.entries(audience.value).map(
        ([key, value]) => ({ key, value })
      );
      for (let i = 0; i < 24; i++) {
        const isSameKeyWithIndex = convertToArr.find(
          (v) => Number(v.key) === i
        );

        if (isSameKeyWithIndex) {
          series[i].data.push({
            x: new Date(audience.end_time).getTime(),
            y: isSameKeyWithIndex?.value,
          });
        } else {
          series[i].data.push({
            x: new Date(audience.end_time).getTime(),
            y: 0,
          });
        }
      }
    });

    const options = {
      series,
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
      plotOptions: {
        heatmap: {
          distributed: true,
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
      yaxis: {
        title: {
          text: "Hours",
        },
      },
      xaxis: {
        type: "datetime",
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#chart-online-audience-history"),
      options
    );
    chart.render();
  });
</script>

<div id="chart-online-audience-history" class="md:min-h-[350px]" />
