import { useRecoilState } from "recoil"
import { turnAtom } from "../recoil/atoms"
import { TurnStatus } from "../types/Object"

const [turn, setTurn] = useRecoilState<TurnStatus>(turnAtom)


export const PutStone = (TapPoint:number[][],y:number,x:number,turn:TurnStatus) => {
  if (TapPoint[y][x] === 0) {
    TapPoint[y][x] = turn
    setTurn((3 - turn) as TurnStatus);
  }

}