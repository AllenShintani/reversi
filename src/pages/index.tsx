import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { Backs, BlackCountBar, StoneBlack, StoneClear, StoneWhite, StoneYellow, Container, Grid, TurnPass } from '../styles/styles'
import {turnAtom} from "../recoil/atoms"
import { useAtom } from 'jotai'
import { TurnStatus } from '../types/Object'
import { useTurnChange } from '../components/TurnChange'
import { PutStone } from '../components/PutStone'
import { useRecoilState } from 'recoil'

const Home: NextPage = () => {
  //prettier-ignore
  const [board, setBoard] = useState ([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])
  const [turn, setTurn] = useRecoilState<TurnStatus>(turnAtom)

  /*
  const candidate: number[][] = useMemo<number[][]>(() => {
    //prettier-ignore
    const tempolalyBoard= ([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ])

    let moreThanOne = 0

    let yUp = 0
    let yBt = 0
    let xUp = 0
    let xBt = 0
    let rB = 0
    let rU = 0
    let lB = 0
    let lU = 0



    // yより位置が↑、↓、ｘより↑、↓、ｙより↑でｘより↑、ｙより↑でｘより↓、yより↓でxより↑、yより↓でxより↓、8通り

    // y > i、

    //y < i

    //x < i

    //x > i

    //斜め
    //y > i, x > i
    //y < i, x > i

    //y < i, x < i
    //y > i, x < i
    
    //一つでもひっくり返ったら
    function stoneRight(x: number, y: number) {
      if (moreThanOne > 0) {
        tempolalyBoard[y][x] = 1
      }
      if (moreThanOne === 0) {
        tempolalyBoard[y][x] = 0
      }
      yUp = 0
      yBt = 0
      xUp = 0
      xBt = 0
      rB = 0
      rU = 0
      lB = 0
      lU = 0
      moreThanOne = 0
    }

    return tempolalyBoard
  }, [board, turn])

  */

  //ここからひっくり返す処理

  

  let black = 0
  let white = 0

  const hit = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    let turnChange = turn

    //ターンを変える
   /*
    function TurnChange(turn:TurnStatus) {
      turn = 3 - turn as TurnStatus
      setTurn(turn)
*/


    //下の内容のどこを通るか通らないか決める

    // yより位置が↑、↓、ｘより↑、↓、ｙより↑でｘより↑、ｙより↑でｘより↓、yより↓でxより↑、yより↓でxより↓、8通り

    // y > i、
    //y < i
    //x < i
    //x > i
    //斜め
    //y > i, x > i
    //y < i, x > i
    //y < i, x < i
    //y > i, x < i
    //ここからはボードには直接関係ない


    function aleartCall() {
      if (black < white) {
        alert('White win!')
      }
      if (black > white) {
        alert('Black win!')
      }
      if (black === white) {
        alert('Draw...')
      }
    }
    console.log(board)
    console.log(x)
    setBoard(newBoard)
  }

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Backs>
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((color, x) => (
                <th key={x}>
                  <Grid onClick={() => hit(x, y)}>
                    {board[y][x] === 1 ? (
                      <StoneYellow />
                    ) : color === 0 ? (
                      <StoneClear />
                    ) : color === 1 ? (
                      <StoneBlack />
                    ) : (
                      <StoneWhite />
                    )}
                  </Grid>
                </th>
                
              ))}
            </tr>
          ))}
        </tbody>
      </Backs>
      <BlackCountBar>
        <h3>black</h3>
      </BlackCountBar>
      <TurnPass>
        <button onClick={useTurnChange} id="turn">
          <strong>ターンをパスする</strong>
        </button>
      </TurnPass>
    </Container>
  )
}

export default Home
