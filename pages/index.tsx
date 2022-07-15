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
  const [turn, setTurn] = useState(2)
  const hit = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    let yUp = 0
    let yBt = 0
    let xUp = 0
    let xBt = 0
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

        return UpDown()
      }
    }

    //下の内容のどこを通るか通らないか決める
    function UpDown() {
      if (y - 1 >= 0 && yUp === 0) {
        yUpper()
      }
      if (y + 1 <= 7 && yBt === 0) {
        yBottom()
      }
      rightLeft()
    }

    function rightLeft() {
      console.log(turnChange)
      if (x - 1 >= 0 && xUp === 0) {
        console.log(turnChange)
        xUpper()
      }
      if (x + 1 <= 7 && xBt === 0) {
        console.log(turnChange)
        xBottom()
      }
      return setBoard(newBoard)
    }

    // yより位置が↑、↓、ｘより↑、↓、ｙより↑でｘより↑、ｙより↑でｘより↓、yより↓でxより↑、yより↓でxより↓、8通り

    // y > i、
    function yUpper() {
      yUp += 1
      let roop = y - 2
      console.log(turnChange)
      while (
        newBoard[y - 1][x] !== turnChange &&
        newBoard[y - 1][x] !== 0 &&
        roop >= 0 &&
        newBoard[roop][x] !== 0
      ) {
        //挟まったのを確認！roopはさかのぼる!
        if (newBoard[roop][x] === turnChange) {
          for (; roop <= y - 1; roop++) {
            newBoard[roop][x] = turnChange
          }
          break
        }
        roop -= 1
      }

      setBoard(newBoard)
      UpDown()
      return setBoard(newBoard)
    }
    //y < i
    function yBottom() {
      yBt += 1
      let roop = y + 2
      while (
        newBoard[y + 1][x] !== turnChange &&
        newBoard[y + 1][x] !== 0 &&
        roop <= 7 &&
        newBoard[roop][x] !== 0
      ) {
        if (newBoard[roop][x] === turnChange) {
          for (; roop >= y + 1; roop--) {
            newBoard[roop][x] = turnChange
          }
          break
        }
        roop += 1
      }
      setBoard(newBoard)
      UpDown()
      return setBoard(newBoard)
    }

    //x < i
    function xBottom() {
      console.log(turnChange)
      xBt += 1
      let roop = x + 2
      while (
        newBoard[y][x + 1] !== turnChange &&
        newBoard[y][x + 1] !== 0 &&
        roop <= 7 &&
        newBoard[y][roop] !== 0
      ) {
        if (newBoard[y][roop] === turnChange) {
          for (; roop >= x + 1; roop--) {
            newBoard[y][roop] = turnChange
          }
          break
        }
        roop += 1
      }

      setBoard(newBoard)
      rightLeft()
      return setBoard(newBoard)
    }
    //x > i
    function xUpper() {
      let roop = x - 2
      console.log(turnChange)
      xUp += 1
      while (
        newBoard[y][x - 1] !== turnChange &&
        newBoard[y][x - 1] !== 0 &&
        roop >= 0 &&
        newBoard[y][roop] !== 0
      ) {
        //挟まったのを確認！roopはさかのぼる!
        if (newBoard[y][roop] === turnChange) {
          for (; roop <= x - 1; roop++) {
            newBoard[y][roop] = turnChange
          }
          break
        }
        roop -= 1
      }

      console.log(turnChange)
      setBoard(newBoard)
      rightLeft()
      return setBoard(newBoard)
    }
    //斜め
    //y > i, x > i
    function rightBottom() {
      if (x >= y) {
        for (let i = y - 2, j = x - 2, end = 0; i >= 0; i--, j--) {
          console.log(turnChange)
          if (newBoard[i][j] === 0) {
            console.log(i)
            console.log(j)
            break
          }
          if (newBoard[i][j] === turnChange) {
            for (let s = 1; s + i < y; s++) {
              console.log(turnChange)
              end += 1
              newBoard[i + s][j + s] = turnChange
              setBoard(newBoard)
            }
          }
        }
      }
      return setBoard(newBoard)
    }

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
