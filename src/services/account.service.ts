import { getAccessToken, logout, preventUnautorize } from "./auth.services";

export async function getAccountInstagram(API_BASE_URL: string) {
  const res = await fetch(`${API_BASE_URL}/account`, {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  preventUnautorize(res);
  return await res.json();
}
