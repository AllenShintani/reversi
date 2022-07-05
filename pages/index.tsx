import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
  background-color: #e69f06;
`
const Backs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  gap: 0;
  background-color: #07b81e;
  transform: translate(-50%, -50%);
`

const Grid = styled.div`
  padding: 0;
  border-collapse: collapse;
  border: solid 3px #080808;
`
const CircleBlack = styled.div`
  width: 54px;
  height: 54px;
  background-color: #000;
  border: solid 3px #080808;
  border-radius: 50%;
`
const CircleWhite = styled.div`
  width: 54px;
  height: 54px;
  background-color: #fffbfb;
  border: solid 3px #080808;
  border-radius: 50%;
`
const CircleClear = styled.div`
  width: 54px;
  height: 54px;
  background-color: #07b81e;
  border-radius: 50%;
`

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
  const [turn, setTurn] = useState(1)
  const hit = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    //すでに置かれている上には置けない
    let turnChange = turn

    if (board[y][x] !== 0) {
      turnChange += 0
    } else if (board[y][x] === 1 && turnChange === 2) {
      turnChange -= 1
      newBoard[y][x] = turnChange //実際に表示される//
      setBoard(newBoard) //ボードに変更を保存
      setTurn(turnChange) //ターンを保存
    } else if (board[y][x] === 2 && turnChange === 1) {
      turnChange += 1
      newBoard[y][x] = turnChange
      setBoard(newBoard)
      setTurn(turnChange)
    } else if (turn === 1 || turn === 0) {
      turnChange += 1
      newBoard[y][x] = turnChange
      setBoard(newBoard)
      setTurn(turnChange)
    } else if (turn == 2) {
      turnChange -= 1
      newBoard[y][x] = turnChange //実際に表示される//
      setBoard(newBoard) //ボードに変更を保存
      setTurn(turnChange) //ターンを保存
    }

    //周りに敵石がないときに置けなくする
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
                    {color === 0 ? (
                      <CircleClear />
                    ) : color === 1 ? (
                      <CircleBlack />
                    ) : (
                      <CircleWhite />
                    )}
                  </Grid>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </Backs>
    </Container>
  )
}

export default Home
