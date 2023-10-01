<script lang="ts">
  import { onMount } from "svelte";
  import { saveAccountInstagram } from "../../../services/account.service";

  export let API_BASE_URL;
  let step = 1;

  let dataParams = null;

  function handleSaveAccount() {
    saveAccountInstagram(API_BASE_URL, dataParams);
  }
  onMount(() => {
    const url = new URLSearchParams(window.location.search);
    const openParams = url.get("open");
    const stepParams = url.get("step");

    if (openParams) {
      step = parseInt(stepParams);
      dataParams = JSON.parse(url.get("data"));
    }
  });
</script>

{#if step === 1}
  <div class="flex flex-col gap-5">
    <div>
      <p class="md:text-[1.2rem] font-medium">
        Have you made the switch to a business profile on Instagram?
      </p>
    </div>
    <div>
      <p>
        Please ensure that you have successfully completed the following steps
        prior to proceeding:
      </p>
      <ul class="list-decimal px-5 mt-5 flex flex-col gap-3">
        <li>
          You changed your Instagram profile to a Business or Creator Profile.
          Learn more.
        </li>
        <li>You’re an Admin on your Facebook Page. Learn more.</li>
        <li>
          You have connected your Facebook Page to your Instagram Business or
          Creator Profile. Learn more.
        </li>
      </ul>
    </div>
    <div class="flex justify-end sticky py-2 bottom-0 border-t bg-white">
      <button
        class="right-0 py-2 px-5 rounded-md text-white bg-ecstasy-600"
        on:click={() => (step = 2)}
      >
        Yes, all set
      </button>
    </div>
  </div>
{:else if step === 2}
  <div class="flex flex-col gap-5 text-center">
    <p class="font-medium">Authorize Comein on Facebook for Instagram</p>
    <p>
      To access and post content on Instagram for you, we require permission
      from Facebook. You need to be an admin for your Facebook page to grant
      this permission.
    </p>
    <div class="flex justify-between md:py-2 border-t">
      <button class="py-2 px-5 text-ecstasy-500" on:click={() => (step = 1)}>
        Go back
      </button>
      <button
        class="py-2 px-5 text-white rounded-md bg-ecstasy-600"
        on:click={() => window.location.assign(`${API_BASE_URL}/auth/facebook`)}
      >
        Go to Facebook
      </button>
    </div>
  </div>
{:else if step == 3}
  <div>
    <p class="font-medium text-center">Add your account</p>
    <div class="flex items-center gap-2 mt-5 border p-2 md:p-5">
      <span>
        <svg
          class=" md:w-6 md:h-6"
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
                <stop offset=".64" stop-color="#8c3aaa" stop-opacity="0" />
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
      {#if dataParams}
        <div>
          <p>{dataParams?.name}</p>
          <p>{dataParams?.username}</p>
        </div>
      {/if}
    </div>
    <div class="flex justify-between md:py-2 md:mt-5 border-t">
      <button class="py-2 px-5 text-ecstasy-500" on:click={() => (step = 2)}>
        Go back
      </button>
      {#if dataParams}
        <button
          class="py-2 px-5 text-white rounded-md bg-ecstasy-600"
          on:click={handleSaveAccount}
        >
          Next
        </button>
      {/if}
    </div>
  </div>
{/if}
