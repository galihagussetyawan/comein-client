<script lang="ts">
  import { onMount } from "svelte";
  import { getAudienceDemographics } from "../../../services/account.service";
  import { audienceDemographicByCountryStore } from "../../../store/state";

  export let API_BASE_URL;

  function getCountryName(code: string) {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
  }

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    const res = await getAudienceDemographics(API_BASE_URL, "country");
    const len = res?.data?.data[0]?.total_value?.breakdowns[0]?.results?.length;
    const mapping = res?.data?.data[0]?.total_value?.breakdowns[0]?.results
      ?.map((v) => {
        return {
          x: getCountryName(v?.dimension_values[0]),
          y: v?.value,
        };
      })
      .sort((a, b) => b?.y - a?.y);

    audienceDemographicByCountryStore.set(mapping);

    const options = {
      series: [
        {
          name: "Audience by Country",
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
      dataLabels: {
        enabled: false,
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#chart-audience-demographic-country"),
      options
    );
    chart.render();
  });
</script>

<div id="chart-audience-demographic-country" class="md:min-h-[350px]" />
