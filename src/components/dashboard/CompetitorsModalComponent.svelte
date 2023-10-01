<script lang="ts">
  import { Input, Label } from "flowbite-svelte";
</script>

<div>
  <div>
    <Label for="large-input" class="block mb-2">Username</Label>
    <Input />
  </div>
  <div class="mt-5">
    <div class="flex relative items-center gap-5">
      <div class="md:w-10 md:h-10 rounded-md bg-red-400" />
      <div>
        <p>Name</p>
        <p>username</p>
      </div>
      <button
        class="md:w-10 md:h-10 absolute flex justify-center items-center rounded-md end-0 text-white bg-ecstasy-600"
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
</div>
