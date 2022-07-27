import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'

import styled from 'styled-components'

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
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
  min-width: 120px;
  min-height: 10px;
  color: white;
  background-color: #1a1a1d;
`

const BlackCountBar = styled.div`
  position: fixed;
  top: 250px;
  right: 1250px;
  min-width: 150px;
  min-height: 50px;
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
const CircleYellow = styled.div`
  width: 54px;
  height: 54px;
  background-color: #eeff04;
  border-radius: 50%;
`

const Home: NextPage = () => {
  //prettier-ignore
  const [board, setBoard] = useState ([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])
  const [turn, setTurn] = useState(1)

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

    function upDown(cell: number, x: number, y: number) {
      if (y - 1 >= 0 && yUp === 0) {
        yUpper(cell, x, y)
      }
      if (y + 1 <= 7 && yBt === 0) {
        yBottom(cell, x, y)
      }
      rightLeft(cell, x, y)
    }
    function rightLeft(cell: number, x: number, y: number) {
      if (x - 1 >= 0 && xUp === 0) {
        xUpper(cell, x, y)
      }
      if (x + 1 <= 7 && xBt === 0) {
        xBottom(cell, x, y)
      }
    }

    function rightDiagonal(cell: number, x: number, y: number) {
      if (
        rB === 0 &&
        y - 2 >= 0 &&
        x - 2 >= 0 &&
        board[y - 1][x - 1] !== 0 &&
        board[y - 1][x - 1] !== turn
      ) {
        rightBottom(cell, x, y)
      }
      if (
        rU === 0 &&
        y + 2 <= 7 &&
        x - 2 >= 0 &&
        board[y + 1][x - 1] !== 0 &&
        board[y + 1][x - 1] !== turn
      ) {
        rightUpper(cell, x, y)
      }

      leftDiagonal(cell, x, y)
    }

    function leftDiagonal(cell: number, x: number, y: number) {
      if (
        lB === 0 &&
        y - 2 >= 0 &&
        x + 2 <= 7 &&
        board[y - 1][x + 1] !== 0 &&
        board[y - 1][x + 1] !== turn
      ) {
        leftBottom(cell, x, y)
      }
      if (
        lU === 0 &&
        y + 2 <= 7 &&
        x + 2 <= 7 &&
        board[y + 1][x + 1] !== 0 &&
        board[y + 1][x + 1] !== turn
      ) {
        leftUpper(cell, x, y)
      }
    }

    // yより位置が↑、↓、ｘより↑、↓、ｙより↑でｘより↑、ｙより↑でｘより↓、yより↓でxより↑、yより↓でxより↓、8通り

    // y > i、
    function yUpper(cell: number, x: number, y: number) {
      yUp += 1
      let roop = y - 2

      while (
        board[y - 1][x] !== turn &&
        board[y - 1][x] !== 0 &&
        roop >= 0 &&
        board[roop][x] !== 0
      ) {
        //挟まったのを確認！roopはさかのぼる!
        if (board[roop][x] === turn) {
          moreThanOne += 1
          break
        }
        roop -= 1
      }

      upDown(cell, x, y)
    }
    //y < i
    function yBottom(cell: number, x: number, y: number) {
      yBt += 1

      let roop = y + 2
      while (
        board[y + 1][x] !== turn &&
        board[y + 1][x] !== 0 &&
        roop <= 7 &&
        board[roop][x] !== 0
      ) {
        if (board[roop][x] === turn) {
          moreThanOne += 1
          break
        }
        roop += 1
      }

      upDown(cell, x, y)
    }

    //x < i
    function xBottom(cell: number, x: number, y: number) {
      xBt += 1
      let roop = x + 2
      while (
        board[y][x + 1] !== turn &&
        board[y][x + 1] !== 0 &&
        roop <= 7 &&
        board[y][roop] !== 0
      ) {
        if (board[y][roop] === turn) {
          moreThanOne += 1
          break
        }
        roop += 1
      }

      rightLeft(cell, x, y)
    }
    //x > i
    function xUpper(cell: number, x: number, y: number) {
      let roop = x - 2

      xUp += 1
      while (
        board[y][x - 1] !== turn &&
        board[y][x - 1] !== 0 &&
        roop >= 0 &&
        board[y][roop] !== 0
      ) {
        //挟まったのを確認！roopはさかのぼる!
        if (board[y][roop] === turn) {
          moreThanOne += 1
          break
        }
        roop -= 1
      }

      rightLeft(cell, x, y)
    }
    //斜め
    //y > i, x > i
    function rightBottom(cell: number, x: number, y: number) {
      let roopVertical = y - 2
      let roopHorizontal = x - 2

      for (
        ;
        roopVertical >= 0 && roopHorizontal >= 0 && board[roopVertical][roopHorizontal] !== 0;
        roopHorizontal -= 1, roopVertical -= 1
      ) {
        if (board[roopVertical][roopHorizontal] === turn) {
          moreThanOne += 1
          rB += 1
          break
        }
      }

      rightDiagonal(cell, x, y)
    }
    //y < i, x > i
    function rightUpper(cell: number, x: number, y: number) {
      let roopVertical = y + 2
      let roopHorizontal = x - 2

      for (
        ;
        roopVertical <= 7 && roopHorizontal >= 0 && board[roopVertical][roopHorizontal] !== 0;
        roopHorizontal -= 1, roopVertical += 1
      ) {
        if (board[roopVertical][roopHorizontal] === turn) {
          moreThanOne += 1
          rU += 1
          break
        }
      }

      rightDiagonal(cell, x, y)
    }

    //y < i, x < i
    function leftUpper(cell: number, x: number, y: number) {
      let roopVertical = y + 2
      let roopHorizontal = x + 2
      lU += 1
      for (
        ;
        roopHorizontal <= 7 && roopVertical <= 7 && board[roopVertical][roopHorizontal] !== 0;
        roopHorizontal += 1, roopVertical += 1
      ) {
        if (board[roopVertical][roopHorizontal] === turn) {
          moreThanOne += 1
          break
        }
      }

      rightDiagonal(cell, x, y)
    }

    //y > i, x < i
    function leftBottom(cell: number, x: number, y: number) {
      let roopVertical = y - 2
      let roopHorizontal = x + 2
      lB += 1

      for (
        ;
        roopVertical >= 0 && roopHorizontal <= 7 && board[roopVertical][roopHorizontal] !== 0;
        roopVertical -= 1, roopHorizontal += 1
      ) {
        if (board[roopVertical][roopHorizontal] === turn) {
          moreThanOne += 1
          break
        }
      }

      rightDiagonal(cell, x, y)
    }

    //一つでもひっくり返ったら
    function stoneRight(x: number, y: number) {
      if (moreThanOne > 0) {
        tempolalyBoard[y][x] = 1
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
    function Traverse() {
      for (let y = 0; y <= 7; y++) {
        for (let x = 0; x <= 7; x++) {
          const cell = board[y][x]
          if (cell == 0) {
            upDown(cell, x, y)
            stoneRight(x, y)
          }
        }
      }
    }
    Traverse()
    console.log(tempolalyBoard)
    return tempolalyBoard
  }, [board, turn])

  //ここからひっくり返す処理

  function passMyTurn() {
    if (turn === 1) {
      setTurn(2)
    } else if (turn === 2) {
      setTurn(1)
    }
  }

  let black = 0
  let white = 0

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

      UpDown()
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

      UpDown()
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

      rightLeft()
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

      rightLeft()
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

          break
        }
      }

      rightDiagonal()
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

          break
        }
      }

      rightDiagonal()
    }

    //y < i, x < i
    function leftUpper() {
      let roopVertical = y + 2
      let roopHorizontal = x + 2
      lU += 1
      for (
        ;
        roopHorizontal <= 7 && roopVertical <= 7 && newBoard[roopVertical][roopHorizontal] !== 0;
        roopHorizontal += 1, roopVertical += 1
      ) {
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j >= x + 1; i--, j--, moreThanOne += 1) {
            newBoard[i][j] = turnChange
          }

          break
        }
      }

      rightDiagonal()
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
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j >= x + 1; i++, j--, moreThanOne += 1) {
            newBoard[i][j] = turnChange
          }

          break
        }
      }

      rightDiagonal()
    }

    function aleadyStone() {
      //意志あるとこ置けない
      if (board[y][x] === 0) {
        UpDown()
      }
      //一つでもひっくり返ったら

      if (moreThanOne > 0) {
        tapPoint()
      }
    }

    //光らす
    function rightYellow() {
      for (let vertical = 0; vertical <= 7; vertical++) {
        for (let horizontal = 0; horizontal <= 7; horizontal++) {
          if (newBoard[vertical][horizontal] === 3) {
            newBoard[vertical][horizontal] = 0
          }
          if (candidate[vertical][horizontal] === 1 && newBoard[vertical][horizontal] === 0) {
            console.log(newBoard)
            newBoard[vertical][horizontal] = 3
          }
        }
      }
      return setBoard(newBoard)
    }

    //ここからはボードには直接関係ない

    function forLast() {
      let aleart = 0
      let lastX = 0
      let lastY = 0

      for (; lastX <= 7; lastX++) {
        lastY = 0

        for (; lastX <= 7 && lastY <= 7; lastY++) {
          if (newBoard[lastX][lastY] === 0) {
            aleart += 1
          }
        }
      }

      if (aleart === 0) {
        aleartCall()
      }
    }
    function countColor() {
      let lastX = 0

      for (; lastX <= 7; lastX++) {
        for (let lastY = 0; lastX <= 7 && lastY <= 7; lastY++) {
          if (newBoard[lastX][lastY] === 1) {
            black += 1
          }
          if (newBoard[lastX][lastY] === 2) {
            white += 1
          }
        }
      }

      return forLast()
    }

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
    console.log(candidate)
    aleadyStone()
    setBoard(newBoard)
    countColor()
    rightYellow()
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
                    ) : color === 2 ? (
                      <CircleWhite />
                    ) : (
                      <CircleYellow />
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
        <button onClick={passMyTurn} id="turn">
          <strong>ターンをパスする</strong>
        </button>
      </TurnPass>
    </Container>
  )
}

export default Home
