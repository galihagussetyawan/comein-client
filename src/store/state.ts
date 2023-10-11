import { persistentAtom } from "@nanostores/persistent";
import { atom, onMount } from "nanostores";
import { Competitor } from "../utils/types/competitor.interface";
import { IGOnlineAudienceRes } from "../utils/types/ig-online-audience-res.interface";
import { SeriesData } from "../utils/types/series-data.interface";

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
export const competitorsStore = persistentAtom<Competitor[]>("_cmp", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
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

export const onlineAudienceHistoryStore = persistentAtom<IGOnlineAudienceRes>(
  "_oah",
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const audienceDemographicByCountryStore = atom<SeriesData[]>(null);
export const audienceDemographicByCityStore = atom<SeriesData[]>(null);

onMount(isLoggedIn, () => {
  if (localStorage.getItem("profile")) {
    isLoggedIn.set(true);
  }

  return () => isLoggedIn.set(null);
});
