import { atom } from "recoil";

const user = JSON.parse(localStorage.getItem("user") ?? "{}");

export const authAtom = atom({
  key: "auth",
  default: user,
});
