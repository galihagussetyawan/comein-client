<script lang="ts">
  import { onMount } from "svelte";
  import { getAudienceDemographics } from "../../../services/account.service";
  import { audienceDemographicByCityStore } from "../../../store/state";

  export let API_BASE_URL;

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    const res = await getAudienceDemographics(API_BASE_URL, "city");
    const len = res?.data?.data[0]?.total_value?.breakdowns[0]?.results?.length;
    const mapping = res?.data?.data[0]?.total_value?.breakdowns[0]?.results
      .map((v) => {
        return { x: v?.dimension_values[0], y: v.value };
      })
      .sort((a, b) => b.y - a.y);

    audienceDemographicByCityStore.set(mapping);

    const options = {
      series: [
        {
          name: "Audience by City",
          data: mapping?.splice(0, len > 10 ? 10 : len),
        },
      ],
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          maxWidth: 20,
        },
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#chart-audience-demographic-city"),
      options
    );
    chart.render();
  });
</script>

<div id="chart-audience-demographic-city" class="md:min-h-[350px]" />
