<script lang="ts">
  import { Input, Label } from "flowbite-svelte";
  import {
    addCompetitorAccount,
    getUserInstagramByUsername,
  } from "../../services/account.service";
  import { competitorsStore } from "../../store/state";
  import type { IGBussinesDiscoveryRes } from "../../utils/types/ig-bussines-discovery-res.interface";

  export let API_BASE_URL;

  let timer;
  let result: IGBussinesDiscoveryRes = null;
  let isLoading = false;

  function debounce(e) {
    isLoading = true;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (e.target.value) {
        result = await (
          await getUserInstagramByUsername(API_BASE_URL, e.target.value)
        ).data;
      }
      isLoading = false;
    }, 1500);

    result = null;
  }

  async function addAccount() {
    await addCompetitorAccount(API_BASE_URL, result);

    if ($competitorsStore.length === 0) {
      competitorsStore.set([result]);
    } else {
      $competitorsStore.forEach((v) => {
        if (v.id === result.id) {
          return;
        }
        competitorsStore.set([...$competitorsStore, result]);
      });
    }

    result = null;
  }
</script>

<div>
  <div>
    <Label for="large-input" class="block mb-2">Username</Label>
    <Input on:input={debounce} />
  </div>
  {#if result}
    <div class="mt-5">
      <div class="flex relative items-center gap-5">
        <div class="md:w-10 md:h-10 rounded-md overflow-hidden bg-slate-100">
          {#if result.business_discovery.profile_picture_url}
            <img
              class="w-full h-full object-cover"
              src={result?.business_discovery?.profile_picture_url}
              alt={`Profile picture instagram ${result?.business_discovery?.name}.`}
            />
          {/if}
        </div>
        <div>
          <p>{result?.business_discovery?.name}</p>
          <p>{result?.business_discovery?.username}</p>
        </div>
        <button
          class="md:w-10 md:h-10 absolute flex justify-center items-center rounded-md end-0 text-white bg-ecstasy-600"
          on:click={addAccount}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  {:else if isLoading}
    <p class="md:h-10 md:mt-5">Loading...</p>
  {:else}
    <div class="md:w-full md:h-10 md:mt-5" />
  {/if}
</div>
