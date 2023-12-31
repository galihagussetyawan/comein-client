import { IGAccountRes } from "../utils/types/ig-account-res.interface";
import { IGAudienceDemographicsRes } from "../utils/types/ig-audience-demographics-res.interface";
import { IGBussinesDiscoveryRes } from "../utils/types/ig-bussines-discovery-res.interface";
import { IGMediaRes } from "../utils/types/ig-media-insights.res.interface";
import { IGOnlineAudienceRes } from "../utils/types/ig-online-audience-res.interface";
import { IGProfileRes } from "../utils/types/ig-profile-insights-res.interface";
import { Response } from "../utils/types/response.interface";
import {
  getAccessToken,
  interceptorFetching,
  readFromCache,
  writeToCache,
} from "./auth.services";

export async function saveAccountInstagram(API_BASE_URL: string, data) {
  const res = await fetch(`${API_BASE_URL}/account`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAccessToken(),
    },
    body: JSON.stringify({
      accountId: data.id,
      name: data.name,
      username: data.username,
      profilePicture: data?.profilePicture,
      accessToken: data.accessToken,
    }),
  });

  interceptorFetching(res);
  if (await res.json()) {
    window.location.assign("/dashboard");
  }
}

export async function getAccountInstagram(
  API_BASE_URL: string
): Promise<Response<IGAccountRes>> {
  const URL = `${API_BASE_URL}/account`;
  const existCache: Response<IGAccountRes> = readFromCache(URL);

  if (existCache) {
    return existCache;
  }
  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);

  const resJson: Response<IGAccountRes> = await res?.json();
  writeToCache(URL, resJson);
  return resJson;
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

export async function getUserInstagramByUsername(
  API_BASE_URL: string,
  q: string
) {
  const URL = `${API_BASE_URL}/account/instagram?q=${q}`;

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);
  const resJson = await res.json();

  return resJson;
}

export async function addCompetitorAccount(
  API_BASE_URL: string,
  data: IGBussinesDiscoveryRes
) {
  const URL = `${API_BASE_URL}/account/competitor`;

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAccessToken(),
    },
    body: JSON.stringify({
      accountId: data?.id,
      name: data?.business_discovery?.name,
      username: data?.business_discovery?.username,
      profilePricture: data?.business_discovery?.profile_picture_url,
    }),
  });

  interceptorFetching(res);
  return await res?.json();
}

export async function getCompetitors(API_BASE_URL: string) {
  const URL = `${API_BASE_URL}/account/competitor`;

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);
  return await res?.json();
}

export async function deleteCompetitor(
  API_BASE_URL: string,
  competitorId: string
) {
  const URL = `${API_BASE_URL}/account/competitor?id=${competitorId}`;
  const res = await fetch(URL, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);
  return await res?.json();
}

// audience services
export async function getOnlineAudienceHistory(
  API_BASE_URL: string,
  since: string,
  until: string
): Promise<Response<IGOnlineAudienceRes>> {
  const URL = `${API_BASE_URL}/account/instagram/audience/online?since=${since}&until=${until}`;
  const existCache: Response<IGOnlineAudienceRes> = readFromCache(URL);

  if (existCache) {
    return existCache;
  }

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);

  const resJson = await res?.json();
  writeToCache(URL, resJson);

  return resJson;
}

export async function getAudienceDemographics(
  API_BASE_URL: string,
  breakdown: string
): Promise<Response<IGAudienceDemographicsRes>> {
  const URL = `${API_BASE_URL}/account/instagram/audience/demographics?breakdown=${breakdown}`;

  const existCache: Response<IGAudienceDemographicsRes> = readFromCache(URL);

  if (existCache) {
    return existCache;
  }

  const res = await fetch(URL, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  interceptorFetching(res);

  const resJson = await res?.json();
  writeToCache(URL, resJson);

  return resJson;
}
