<script lang="ts">
  import { Checkbox, Dropdown, Modal } from "flowbite-svelte";
  import { onMount } from "svelte";
  import CompetitorsModalComponent from "../../components/dashboard/CompetitorsModalComponent.svelte";
  import {
    getAccountInstagram,
    getCompetitors,
  } from "../../services/account.service";
  import { accountStore, competitorsStore } from "../../store/state";
  import type { Competitor } from "../../utils/types/competitor.interface";

  export let API_BASE_URL;
  let isShowCompetior = false;
  let defaultModal = false;
  let competitorGroup = [];

  function removeCompetitor() {
    const filter = $competitorsStore.filter(
      (v) => v?.id !== competitorGroup.find((id) => id === v?.id)
    );
    competitorsStore.set(filter);
  }

  onMount(async () => {
    if (window.location.pathname === "/dashboard/competitors") {
      isShowCompetior = true;
    }

    const resAccount = await getAccountInstagram(API_BASE_URL);
    if (resAccount?.data) {
      accountStore?.set(resAccount?.data);
    }

    const resCompetitors = await getCompetitors(API_BASE_URL);
    if (resCompetitors?.data) {
      const map: Competitor[] = resCompetitors.data.map((v) => {
        return {
          id: v?.id,
          account: {
            id: v?.accountId,
            name: v?.name,
            username: v?.username,
            profile_picture_url: v?.picture_url,
          },
        };
      });
      competitorsStore.set(map);
    }
  });
</script>

<div
  class={`${
    isShowCompetior ? "md:w-2/5" : "md:w-1/5"
  } flex md:border md:rounded-md divide-x`}
>
  <button
    id="btn-account"
    class={`${isShowCompetior ? "md:w-1/2" : "md:w-full"} md:p-5`}
  >
    <div class="md:w-full md:flex md:justify-between">
      <p class="md:font-medium">Account</p>
      <span>
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
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
    </div>
    <p class="md:text-[0.8rem] md:text-left md:font-light">Viewing account</p>
  </button>

  {#if isShowCompetior}
    <button id="btn-competitor" class="md:w-1/2 md:p-5">
      <div class="md:w-full md:flex md:justify-between">
        <p class="md:font-medium">Competitors</p>
        <span>
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>
      <p class="md:text-[0.8rem] md:text-left md:font-light">
        Viewing competitors
      </p>
    </button>
  {/if}

  <!-- Modal -->
  <Dropdown triggeredBy="#btn-account" class="md:w-80">
    <div>
      <div class="md:w-full md:p-3 md:border-b">
        <p class="md:font-bold">Account</p>
      </div>
      <!-- No account -->
      {#if $accountStore}
        <div class="md:px-3 md:py-5 md:flex md:flex-col md:gap-1">
          <div class="md:flex md:items-center md:gap-7">
            <span>
              <svg
                class=" md:w-5 md:h-5"
                viewBox="0 0 2500 2500"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <defs>
                    <radialGradient
                      id="0"
                      cx="332.14"
                      cy="2511.81"
                      r="3263.54"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".09" stop-color="#fa8f21" />
                      <stop offset=".78" stop-color="#d82d7e" />
                    </radialGradient>
                    <radialGradient
                      id="1"
                      cx="1516.14"
                      cy="2623.81"
                      r="2572.12"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset=".64"
                        stop-color="#8c3aaa"
                        stop-opacity="0"
                      />
                      <stop offset="1" stop-color="#8c3aaa" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                    fill="url(#0)"
                  />
                  <path
                    d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                    fill="url(#1)"
                  />
                </g>
              </svg>
            </span>
            <div class="md:flex md:items-center md:gap-1">
              <div
                class="md:w-5 md:h-5 md:flex md:justify-center md:items-center rounded-md overflow-hidden bg-slate-200"
              >
                <img
                  src="https://th.bing.com/th/id/OIP.8bOtZeJyiE03WEm-67vqTQHaFu?pid=ImgDet&rs=1"
                  alt={`profile picture ${$accountStore?.username}`}
                  class=" md:w-full md:h-full md:object-cover"
                />
              </div>
              <p>{$accountStore?.username}</p>
            </div>
          </div>
        </div>
      {:else}
        <div
          class="md:px-3 md:py-5 md:flex md:flex-col md:items-center md:gap-1"
        >
          <p class=" md:font-medium">No account</p>
          <a href="/dashboard/insight" class="text-blue-600">
            Connect a account
          </a>
        </div>
      {/if}
    </div>
  </Dropdown>

  {#if isShowCompetior}
    <Dropdown triggeredBy="#btn-competitor" class="md:w-80">
      <div class="md:w-full md:p-3 md:border-b">
        <p class="md:font-bold">Competitors</p>
      </div>
      {#if $competitorsStore.length > 0}
        <ul class="flex flex-col gap-2 p-2">
          {#each $competitorsStore as data}
            <li class="flex items-center gap-2">
              <span class="flex">
                <svg
                  class=" md:w-5 md:h-5"
                  viewBox="0 0 2500 2500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <defs>
                      <radialGradient
                        id="0"
                        cx="332.14"
                        cy="2511.81"
                        r="3263.54"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".09" stop-color="#fa8f21" />
                        <stop offset=".78" stop-color="#d82d7e" />
                      </radialGradient>
                      <radialGradient
                        id="1"
                        cx="1516.14"
                        cy="2623.81"
                        r="2572.12"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset=".64"
                          stop-color="#8c3aaa"
                          stop-opacity="0"
                        />
                        <stop offset="1" stop-color="#8c3aaa" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                      fill="url(#0)"
                    />
                    <path
                      d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                      fill="url(#1)"
                    />
                  </g>
                </svg>
              </span>
              <p>{data?.account?.username}</p>
              <Checkbox
                bind:group={competitorGroup}
                value={data.id}
                class="absolute end-0 text-ecstasy-600 focus:ring-ecstasy-600"
              />
            </li>
          {/each}
        </ul>
      {:else}
        <div class="md:px-3 md:py-5 flex items-center justify-center">
          <p class=" md:font-medium">No Competitors</p>
        </div>
      {/if}
      <div class="md:flex justify-between md:p-3 border-t">
        <button
          class="font-light"
          on:click={removeCompetitor}
          disabled={competitorGroup.length === 0 && true}>Remove</button
        >
        <button
          class="font-medium text-ecstasy-600"
          on:click={() => (defaultModal = true)}>Add</button
        >
      </div>
    </Dropdown>
  {/if}
</div>

<Modal title="Add Competitor" bind:open={defaultModal}>
  <CompetitorsModalComponent {API_BASE_URL} />
</Modal>
