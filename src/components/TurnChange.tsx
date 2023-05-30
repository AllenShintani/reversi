import { TurnStatus } from "../types/Object"
import { turnAtom } from "../recoil/atoms"
import { useRecoilState } from "recoil"


export const useTurnChange = () => {
  const [turn, setTurn] = useRecoilState<TurnStatus>(turnAtom)

  const changeTurn = () => {
    const newTurn = 3 - turn as TurnStatus
    setTurn(newTurn)
  }
  return changeTurn
}