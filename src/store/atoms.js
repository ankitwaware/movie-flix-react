import { atom } from "recoil";

export const menuOpenAtom = atom({
  key: "menuAtom",
  default: false,
});

export const genreId_Name = atom({
  key: "genreIdName",
  default: [],
});
