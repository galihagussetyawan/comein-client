<script lang="ts">
  import { onMount } from "svelte";
  import {
    mediaInsightsStore,
    periodNameStore,
    sinceDateStore,
    untilDateStore,
  } from "../../../store/state";

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    if ($periodNameStore === "last week") {
      function getCountByDateAndType(data, date, typeName) {
        return data.filter(
          (v) =>
            new Date(v.timestamp).getDate() === date &&
            (v.media_type === typeName || v.media_product_type === typeName)
        ).length;
      }

      const images = [];
      const carouselAlbums = [];
      const videos = [];
      const storeis = [];
      const reels = [];

      const sDate = new Date($sinceDateStore).getDate();
      const uDate = new Date($untilDateStore).getDate();

      for (let i = sDate; i <= uDate; i++) {
        images.push({
          x: new Date().setDate(i),
          y: getCountByDateAndType($mediaInsightsStore, i, "IMAGE"),
        });

        carouselAlbums.push({
          x: new Date().setDate(i),
          y: getCountByDateAndType($mediaInsightsStore, i, "CAROUSEL_ALBUM"),
        });

        videos.push({
          x: new Date().setDate(i),
          y: getCountByDateAndType($mediaInsightsStore, i, "VIDEO"),
        });

        storeis.push({
          x: new Date().setDate(i),
          y: getCountByDateAndType($mediaInsightsStore, i, "STORY"),
        });

        reels.push({
          x: new Date().setDate(i),
          y: getCountByDateAndType($mediaInsightsStore, i, "REELS"),
        });
      }

      const options = {
        series: [
          {
            name: "Image",
            data: images,
          },
          {
            name: "Carousel",
            data: carouselAlbums,
          },
          {
            name: "Video",
            data: videos,
          },
          {
            name: "Story",
            data: storeis,
          },
          {
            name: "Reels",
            data: reels,
          },
        ],
        chart: {
          height: 350,
          type: "line",
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
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
        },
        xaxis: {
          type: "datetime",
          min: new Date().setDate(sDate),
          max: new Date().setDate(uDate),
        },
      };

      const chart = new ApexCharts(
        document.querySelector("#chart-publishing"),
        options
      );
      chart.render();
    }
  });
</script>

<div id="chart-publishing" />
