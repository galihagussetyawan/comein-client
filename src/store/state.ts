import { persistentAtom } from "@nanostores/persistent";
import { atom, onMount } from "nanostores";
import { IGBussinesDiscoveryRes } from "../utils/types/ig-bussines-discovery-res.interface";

export const isLoggedIn = atom<boolean>(false);

export const periodNameStore = persistentAtom<string>("_p", "last month", {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const sinceDateStore = atom<string>(null);
export const untilDateStore = atom<string>(null);
export const comparisonSinceDateStore = atom<string>(null);
export const comparisonUntilDateStore = atom<string>(null);

export const accountStore = atom<any>(null);
export const competitorsStore = persistentAtom<IGBussinesDiscoveryRes[]>(
  "_cmp",
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
export const profileInsightsStore = persistentAtom<any>("_pi", null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const comparisonProfileInsightsStore = persistentAtom<any>(
  "_cpi",
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
export const mediaInsightsStore = persistentAtom<any>("_mi", null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

onMount(isLoggedIn, () => {
  if (localStorage.getItem("profile")) {
    isLoggedIn.set(true);
  }

  return () => isLoggedIn.set(null);
});
