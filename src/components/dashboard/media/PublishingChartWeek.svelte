<script lang="ts">
  import { onMount } from "svelte";
  import {
    mediaInsightsStore,
    periodNameStore,
    sinceDateStore,
    untilDateStore,
  } from "../../../store/state";

  function getCountByDateAndType(data, date, typeName) {
    return data.filter(
      (v) =>
        new Date(v.timestamp).getDate() === date &&
        (v.media_type === typeName || v.media_product_type === typeName)
    ).length;
  }

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    if ($periodNameStore === "last week") {
      const images = [];
      const carouselAlbums = [];
      const videos = [];
      const storeis = [];
      const reels = [];

      for (
        let i = new Date($sinceDateStore);
        i <= new Date($untilDateStore);
        i.setDate(i.getDate() + 1)
      ) {
        images.push({
          x: i.getTime(),
          y: getCountByDateAndType($mediaInsightsStore, i.getDate(), "IMAGE"),
        });

        carouselAlbums.push({
          x: i.getTime(),
          y: getCountByDateAndType(
            $mediaInsightsStore,
            i.getDate(),
            "CAROUSEL_ALBUM"
          ),
        });

        videos.push({
          x: i.getTime(),
          y: getCountByDateAndType($mediaInsightsStore, i.getDate(), "VIDEO"),
        });

        storeis.push({
          x: i.getTime(),
          y: getCountByDateAndType($mediaInsightsStore, i.getDate(), "STORY"),
        });

        reels.push({
          x: i.getTime(),
          y: getCountByDateAndType($mediaInsightsStore, i.getDate(), "REELS"),
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

<div id="chart-publishing" class="md:min-h-[350px]" />
