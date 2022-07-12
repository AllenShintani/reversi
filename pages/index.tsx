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

    //ターンを変える
    function change() {
      if (turnChange === 1) {
        turnChange = 2
      } else if (turnChange === 2) {
        turnChange = 1
      }
      setTurn(turnChange)
      return tapPoint()
    }

    //何も置いてない時だけclicした所の色を変える
    function tapPoint() {
      if (newBoard[y][x] === 0) {
        newBoard[y][x] = turnChange

        return yUpper()
      }

      // yより位置が↑、↓、ｘより↑、↓、ｙより↑でｘより↑、ｙより↑でｘより↓、yより↓でxより↑、yより↓でxより↓、8通り
    }
    // y > i、
    function yUpper() {
      for (let i = y - 2, end = 0; i >= 0 && end === 0; i--) {
        console.log(turnChange)
        if (newBoard[i][x] === 0) {
          break
        }
        //↓ではyとiの間が空白でも染まってしまう
        if (newBoard[i][x] === turnChange) {
          for (let s = 1; i + s <= y - 1; s++) {
            console.log(turnChange)
            //これで空白なら染まらない
            if (newBoard[i + s][x] !== 0) {
              end += 1
              newBoard[i + s][x] = turnChange
            }
          }
        }
      }
      setBoard(newBoard)
      yBottom()
      return setBoard(newBoard)
    }
    //y < i
    function yBottom() {
      console.log(turnChange)
      for (let i = y + 2, end = 0; i <= 7 && end === 0; i++) {
        if (newBoard[i][x] === 0) {
          break
        }
        console.log(turnChange)
        if (newBoard[i][x] === turnChange) {
          for (let s = 1; i - s >= y + 1; s++) {
            console.log(turnChange)
            if (newBoard[i - s][x] !== 0) {
              end += 1
              newBoard[i - s][x] = turnChange
            }
          }
        }
      }
      setBoard(newBoard)
      xUpper()
      return setBoard(newBoard)
    }
    //x < i
    function xUpper() {
      for (let i = x + 2, end = 0; i <= 7 && end === 0; i++) {
        console.log(turnChange)

        //↓ではyとiの間が空白でも染まってしまう
        if (newBoard[y][i] === turnChange) {
          for (let s = 1; i - s >= x + 1; s++) {
            console.log(turnChange)
            //これで空白なら染まらない
            if (newBoard[y][i - s] !== 0) {
              end += 1
              newBoard[y][i - s] = turnChange
            }
          }
        }
      }
      setBoard(newBoard)
      xBottom()
      return setBoard(newBoard)
    }
    //x > i
    function xBottom() {
      console.log(turnChange)
      for (let i = x - 2, end = 0; i >= 0 && end === 0; i--) {
        if (newBoard[y][i] === 0) {
          break
        }
        console.log(turnChange)
        if (newBoard[y][i] === turnChange) {
          for (let s = 1; i + s <= x - 1; s++) {
            console.log(turnChange)
            if (newBoard[y][i + s] !== 0) {
              end += 1
              newBoard[y][i + s] = turnChange
            }
          }
        }
      }
      console.log(turnChange)
      setBoard(newBoard)

      return setBoard(newBoard)
    }
    //斜め

    console.log(turnChange)
    if (board[y][x] === 0) {
      change()
    }
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
