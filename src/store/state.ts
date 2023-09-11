import { atom } from "nanostores";

export const isLoggedIn = atom<boolean>(false);
isLoggedIn.subscribe((v) => {
  if (localStorage.getItem("profile")) {
    isLoggedIn.set(true);
  }
});

export const account = atom<any>(null);
