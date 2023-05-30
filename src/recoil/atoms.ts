import { TurnStatus } from "../types/Object";
import { atom, RecoilState } from "recoil";

export const turnAtom: RecoilState<TurnStatus> = atom<TurnStatus>({
  key: 'turnAtom',
  default: 2,
});