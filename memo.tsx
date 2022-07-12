if (
  (board[y + i][x + i] === turnChange ||
    board[y - i][x - i] ||
    board[y + i][x - i] ||
    board[y - i][x + i]) &&
  board[y + i][x + i] !== 0
) {
  if (y < i && x < i) {
    for (let s = y, j = x; s !== i; s++, j++) {
      newBoard[s + 1][j + 1] = turnChange
      setBoard(newBoard)
    }
  } else if (y > i && x > i) {
    for (let s = y, j = x; s !== i; s--, j--) {
      newBoard[s - 1][j - 1] = turnChange
      setBoard(newBoard)
    }
  } else if (y > i && x < i) {
    for (let s = y, j = x; s !== i; s--, j++) {
      newBoard[s - 1][j + 1]
      setBoard(newBoard)
    }
  } else if (y < i && x > i) {
    for (let s = y, j = x; s !== i; s++, j--) {
      newBoard[s + 1][j - 1]
      setBoard(newBoard)
    }
  }
}


for (let a = 0; a < 3 && end === 0; a++) {
  for (let s = 0; s < 3 && end === 0; s++) {
    //なんでiとboard[y + vercical[a]][x + horizontal[s] が同値にならない？
    if (y !== 0) {
      if (board[y + vercical[a]][x + horizontal[s]] === turnChange && board[y][x] === 0) {
        if (board[y][x] !== 0) {
          console.log()
          //意思が置いてあるところに置いた時の想定
        } else if (board[y][x] === 1 && turnChange === 2) {
          console.log(turnChange)
          turnChange -= 1
          end += 1
          newBoard[y][x] = turnChange //実際に表示される//
          setBoard(newBoard) //ボードに変更を保存
          setTurn(turnChange) //ターンを保存
          console.log(newBoard[y][x])
        } else if (board[y][x] === 2 && turnChange === 1) {
          console.log(turnChange)
          turnChange += 1
          end += 1
          newBoard[y][x] = turnChange
          setBoard(newBoard)
          setTurn(turnChange)
          console.log(newBoard[y][x])
          //ここから石が置かれていないところに置いた時の想定
        } else if (turnChange === 1) {
          console.log(y + vercical[a])
          turnChange += 1
          end += 1
          newBoard[y][x] = turnChange
          setBoard(newBoard)
          setTurn(turnChange)
          console.log(x + horizontal[s])
        } else if (turnChange == 2) {
          console.log(y + vercical[a])
          turnChange -= 1
          end += 1
          newBoard[y][x] = turnChange
          setBoard(newBoard)
          setTurn(turnChange)
          console.log(x + horizontal[s])
        }
        //周りに敵石がないときに置けなくする
      }
    }
  }
  //(y=0)一番上に駒を置いたとき。長くなるが今回はとりあえず上の操作をコピペ
}
for (let c = 1; c < 3 && end === 0; c++) {
  for (let d = 0; d < 3 && end === 0; d++) {
    if (y === 0) {
      if (board[y + c][x + d] === turnChange && board[y][x] === 0) {
        console.log(y + vercical[c])
        console.log(x + horizontal[d])

        if (board[y][x] !== 0) {
          //意思が置いてあるところに置いた時の想定
        } else if (board[y][x] === 1 && turnChange === 2) {
          console.log(turnChange)
          turnChange -= 1
          end += 1
          newBoard[y][x] = turnChange //実際に表示される//
          setBoard(newBoard) //ボードに変更を保存
          setTurn(turnChange) //ターンを保存
          console.log(newBoard[y][x])
        } else if (board[y][x] === 2 && turnChange === 1) {
          console.log(turnChange)
          turnChange += 1
          end += 1
          newBoard[y][x] = turnChange
          setBoard(newBoard)
          setTurn(turnChange)
          console.log(newBoard[y][x])
          //ここから石が置かれていないところに置いた時の想定
        } else if (turnChange === 1) {
          console.log(turnChange)
          turnChange += 1
          end += 1
          newBoard[y][x] = turnChange
          setBoard(newBoard)
          setTurn(turnChange)
          console.log(newBoard[y][x])
        } else if (turnChange == 2) {
          console.log(turnChange)
          turnChange -= 1
          end += 1
          newBoard[y][x] = turnChange
          setBoard(newBoard)
          setTurn(turnChange)
          console.log(newBoard[y][x])
        }
      }
    }
  }
}
//挟んだら色変わる  i > y
for (let i = 2, out = 0; i + y <= 7 && out === 0; i++) {
  //
  if (board[y + i][x] === turnChange) {
    for (let s = i; s >= 0; s--) {
      if (newBoard[y + s][x] !== 0) {
        newBoard[y + s][x] = turnChange //+1するのはすでに置かれて居る石の色を変えない為
        setBoard(newBoard)
        out += 1
        console.log(s)
      }
    }
  }
}
// i > x
for (let i = 2, out = 0; i + x <= 7 && out === 0; i++) {
  if (board[y][x + i] === turnChange) {
    for (let s = i; s >= 0; s--) {
      if (newBoard[y][x + s] !== 0) {
        newBoard[y][x + s] = turnChange
        setBoard(newBoard)
        out += 1
      }
    }
  }
}
// i < y

//横   i < x
}