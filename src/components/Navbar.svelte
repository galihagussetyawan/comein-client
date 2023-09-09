<script>
  import { isLoggedIn } from "../store/state";
</script>

<nav
  class="sticky top-0 px-5 py-2 flex justify-between items-center md:px-24 md:py-2 md:grid md:grid-cols-[10%_70%_20%] bg-colorOnBackground dark:bg-colorOnBackground-dark border-b border-slate-300"
>
  <a href="/" class="text-[1.5rem] md:text-3xl font-bold">comein</a>
  <div
    class="hidden md:flex justify-center items-center text-[0.9rem] text-thirdTextColor gap-7"
  >
    <a
      href="/about"
      class="dark:text-thirdTextColor-dark hover:text-primaryTextColor hover:dark:text-primaryTextColor-dark"
      >About</a
    >
    <a
      href="/service"
      class="dark:text-thirdTextColor-dark hover:text-primaryTextColor hover:dark:text-primaryTextColor-dark"
      >Service</a
    >
    <a
      href="/blogs"
      class="dark:text-thirdTextColor-dark hover:text-primaryTextColor hover:dark:text-primaryTextColor-dark"
      >Blogs</a
    >
    <a
      href="/contact"
      class="dark:text-thirdTextColor-dark hover:text-primaryTextColor hover:dark:text-primaryTextColor-dark"
      >Contact</a
    >
  </div>
  <div class="md:flex md:justify-end gap-5">
    {#if $isLoggedIn}
      <a
        href="/dashboard"
        class="hidden md:flex md:px-5 md:py-1 rounded-md border-2 border-kournikova-400 text-[0.9rem] font-medium hover:text-kournikova-400 bg-white"
        >Dashboard
      </a>
    {:else}
      <a
        href="/login"
        class="hidden md:flex md:px-5 md:py-1 rounded-md border-2 border-kournikova-400 text-[0.9rem] font-medium hover:text-kournikova-400 bg-white"
        >Get Started
      </a>
    {/if}
    <button class="text-thirdTextColor hover:text-secondaryTextColor">
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
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>
  </div>
</nav>
