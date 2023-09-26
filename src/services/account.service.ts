import { IGAccountRes } from "../utils/types/ig-account-res.interface";
import { IGMediaRes } from "../utils/types/ig-media-insights.res.interface";
import { IGProfileRes } from "../utils/types/ig-profile-insights-res.interface";
import { Response } from "../utils/types/response.interface";
import {
  getAccessToken,
  interceptorFetching,
  readFromCache,
  writeToCache,
} from "./auth.services";

export async function getAccountInstagram(
  API_BASE_URL: string
): Promise<Response<IGAccountRes>> {
  const res = await fetch(`${API_BASE_URL}/account`, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);
  return await res.json();
}

export async function getProfileInsightsInstagram(
  API_BASE_URL: string,
  since: string,
  until: string
): Promise<Response<IGProfileRes>> {
  const URL = `${API_BASE_URL}/account/instagram/insights/profile?since=${since}&until=${until}`;
  const existCache: Response<IGProfileRes> = readFromCache(URL);

  if (existCache) {
    return existCache;
  }

  // required since and until date in query params
  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);

  const resJson: Response<IGProfileRes> = await res.json();
  writeToCache(URL, resJson);
  return resJson;
}

export async function getMediaInsightsInstagram(
  API_BASE_URL: string,
  since: string,
  until: string
): Promise<Response<IGMediaRes>> {
  const URL = `${API_BASE_URL}/account/instagram/insights/media?since=${since}&until=${until}`;
  const existCache: Response<IGMediaRes> = readFromCache(URL);

  if (existCache) {
    return existCache;
  }

  // required since and until date in query params
  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);

  const resJson: Response<IGMediaRes> = await res.json();
  writeToCache(URL, resJson);

  return resJson;
}
