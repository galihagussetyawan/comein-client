import { atom, onMount } from "nanostores";

export const isLoggedIn = atom<boolean>(false);

export const periodNameStore = atom<string>("last month");
export const sinceDateStore = atom<string>(null);
export const untilDateStore = atom<string>(null);
export const comparisonSinceDateStore = atom<string>(null);
export const comparisonUntilDateStore = atom<string>(null);

export const accountStore = atom<any>(null);
export const profileInsightsStore = atom<any>(null);
export const comparisonProfileInsightsStore = atom<any>(null);

onMount(isLoggedIn, () => {
  if (localStorage.getItem("profile")) {
    isLoggedIn.set(true);
  }

  return () => isLoggedIn.set(null);
});
