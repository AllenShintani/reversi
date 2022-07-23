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

const TurnPass = styled.div`
  position: fixed;
  top: 600px;
  left: 1100px;
  width: 10em;
  height: 3em;
  color: white;
  background-color: #1a1a1d;
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
  function passMyTurn() {
    if (turn === 1) {
      setTurn(2)
    } else if (turn === 2) {
      setTurn(1)
    }
  }

  const [turn, setTurn] = useState(1)
  const hit = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    let yUp = 0
    let yBt = 0
    let xUp = 0
    let xBt = 0
    let rB = 0
    let rU = 0
    let lB = 0
    let lU = 0
    let moreThanOne = 0

    let turnChange = turn

    //ターンを変える
    function change() {
      if (turnChange === 1) {
        turnChange = 2
      } else if (turnChange === 2) {
        turnChange = 1
      }
      return setTurn(turnChange)
    }

    //何も置いてない時だけclicした所の色を変える
    function tapPoint() {
      if (newBoard[y][x] === 0) {
        newBoard[y][x] = turnChange

        return change()
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
      if (x - 1 >= 0 && xUp === 0) {
        xUpper()
      }
      if (x + 1 <= 7 && xBt === 0) {
        xBottom()
      }

      rightDiagonal()
      return setBoard(newBoard)
    }

    function rightDiagonal() {
      if (
        rB === 0 &&
        y - 2 >= 0 &&
        x - 2 >= 0 &&
        newBoard[y - 1][x - 1] !== 0 &&
        newBoard[y - 1][x - 1] !== turnChange
      ) {
        rightBottom()
      }
      if (
        rU === 0 &&
        y + 2 <= 7 &&
        x - 2 >= 0 &&
        newBoard[y + 1][x - 1] !== 0 &&
        newBoard[y + 1][x - 1] !== turnChange
      ) {
        rightUpper()
      }

      leftDiagonal()
    }

    function leftDiagonal() {
      if (
        lB === 0 &&
        y - 2 >= 0 &&
        x + 2 <= 7 &&
        newBoard[y - 1][x + 1] !== 0 &&
        newBoard[y - 1][x + 1] !== turnChange
      ) {
        leftBottom()
      }
      if (
        lU === 0 &&
        y + 2 <= 7 &&
        x + 2 <= 7 &&
        newBoard[y + 1][x + 1] !== 0 &&
        newBoard[y + 1][x + 1] !== turnChange
      ) {
        leftUpper()
      }
      return setBoard(newBoard)
    }

    // yより位置が↑、↓、ｘより↑、↓、ｙより↑でｘより↑、ｙより↑でｘより↓、yより↓でxより↑、yより↓でxより↓、8通り

    // y > i、
    function yUpper() {
      yUp += 1
      let roop = y - 2

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
          moreThanOne += 1
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
          moreThanOne += 1
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
          moreThanOne += 1
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
          moreThanOne += 1
          break
        }
        roop -= 1
      }

      setBoard(newBoard)
      rightLeft()
      return setBoard(newBoard)
    }
    //斜め
    //y > i, x > i
    function rightBottom() {
      let roopVertical = y - 2
      let roopHorizontal = x - 2
      rB += 1
      for (
        ;
        roopVertical >= 0 && roopHorizontal >= 0 && newBoard[roopVertical][roopHorizontal] !== 0;
        roopHorizontal -= 1, roopVertical -= 1
      ) {
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j <= x - 1; i++, j++, moreThanOne++) {
            newBoard[i][j] = turnChange
          }
          console.log(moreThanOne)
          break
        }
      }

      setBoard(newBoard)
      rightDiagonal()
      return setBoard(newBoard)
    }
    //y < i, x > i
    function rightUpper() {
      rU += 1
      let roopVertical = y + 2
      let roopHorizontal = x - 2

      for (
        ;
        roopVertical <= 7 && roopHorizontal >= 0 && newBoard[roopVertical][roopHorizontal] !== 0;
        roopHorizontal -= 1, roopVertical += 1
      ) {
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j <= x - 1; i--, j++, moreThanOne++) {
            newBoard[i][j] = turnChange
          }
          console.log(moreThanOne)

          break
        }
      }

      setBoard(newBoard)
      rightDiagonal()
      return setBoard(newBoard)
    }

    //y < i, x < i
    function leftUpper() {
      console.log(turnChange)
      let roopVertical = y + 2
      let roopHorizontal = x + 2
      lU += 1
      for (
        ;
        roopHorizontal <= 7 && roopVertical <= 7 && newBoard[roopVertical][roopHorizontal] !== 0;
        roopHorizontal += 1, roopVertical += 1
      ) {
        console.log(roopVertical)
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j >= x + 1; i--, j--, moreThanOne += 1) {
            newBoard[i][j] = turnChange
          }

          break
        }
      }

      setBoard(newBoard)
      rightDiagonal()
      return setBoard(newBoard)
    }

    //y > i, x < i
    function leftBottom() {
      let roopVertical = y - 2
      let roopHorizontal = x + 2
      lB += 1

      for (
        ;
        roopVertical >= 0 && roopHorizontal <= 7 && newBoard[roopVertical][roopHorizontal] !== 0;
        roopVertical -= 1, roopHorizontal += 1
      ) {
        console.log(roopVertical)
        console.log(roopHorizontal)
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j >= x + 1; i++, j--, moreThanOne += 1) {
            newBoard[i][j] = turnChange
          }

          break
        }
      }

      setBoard(newBoard)
      rightDiagonal()
      return setBoard(newBoard)
    }

    function aleadyStone() {
      //意志あるとこ置けない
      if (board[y][x] === 0) {
        UpDown()
      }
      //一つでもひっくり返ったら
      console.log(moreThanOne)
      console.log(turnChange)
      if (moreThanOne > 0) {
        tapPoint()
      }
      return setBoard(newBoard)
    }

    aleadyStone()
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

      <button onClick={passMyTurn}>ターンをパスする</button>
    </Container>
  )
}

export default Home
