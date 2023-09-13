import { LocalCacheData } from "../utils/types/local-cache.interface";
import { Response } from "../utils/types/response.interface";

export function logout() {
  localStorage.removeItem("profile");
  window.location.reload();
}

export function getAccessToken(): string {
  const storage = JSON.parse(localStorage.getItem("profile"));

  if (!storage.accessToken) {
    logout();
  }

  return storage.accessToken;
}

export function interceptorFetching(res) {
  if (res.status === 401) {
    logout();
  }
}

function getLocalStorage<T>(name: string): LocalCacheData<T>[] {
  return JSON.parse(localStorage.getItem(name));
}

function setLocalStorage<T>(name: string, data: LocalCacheData<T>[]) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function readFromCache<T>(URL: string): Response<T> {
  const cache = getLocalStorage("_cache");
  const findCache = cache?.find(
    (v) => v.url === URL && Number(Date.now()) < Number(v.expires)
  );
  return findCache?.data as Response<T>;
}

export function writeToCache<T>(URL: string, data: Response<T>) {
  let cache = getLocalStorage("_cache");

  const expires = new Date(Date.now());
  expires.setDate(expires.getDate() + 1);
  expires.setHours(0);
  expires.setMinutes(0);
  expires.setSeconds(0);

  const save: LocalCacheData<T> = {
    url: URL,
    expires: expires?.getTime()?.toString(),
    data,
  };

  if (cache && cache.length > 0) {
    cache = cache.filter((v) => Number(Date.now()) < Number(v.expires));
    setLocalStorage("_cache", [...cache, save]);
  } else {
    setLocalStorage("_cache", [save]);
  }
}
