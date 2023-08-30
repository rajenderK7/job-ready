import { atom } from "recoil";

const interviewersAtom = atom({
  key: "interviewers",
  default: [],
});

export default interviewersAtom;
