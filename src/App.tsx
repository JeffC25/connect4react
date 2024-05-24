import { useEffect, useState } from "react"

function App() {
  const colors = [
    'bg-neutral-300',
    'bg-red-400',
    'bg-yellow-400',
  ]
  // const colors = {
  //   0: '',
  //   1: 'bg-red-400',
  //   2: 'bg-yello-400',
  // }
  const initialBoard: number[][] = Array.from({ length: 7}, () => Array(6).fill(0));
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [player, setPlayer] = useState<number>(1)
  const [winner, setWinner] = useState<number>(0);
  
  const getNextRow = (col: number) => {
    for (let row = 6; row >= 0; row--) {
      const tile = board[col][row];
      if (tile == 0) return row; 
    }
    return -1;
  }

  const checkHorizontal = (newBoard: number[][], row: number) => {
    for (let counter = 0, col = 0; col < 7; col++) {
      if (newBoard[col][row] == player) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter >= 4) return true;
    }
    return false;
  }

  const checkVertical = (newBoard: number[][], col: number) => {
    for (let counter = 0, row = 0; row < 6; row++) {
      if (newBoard[col][row] == player) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter >= 4) return true;
    }
    return false;
  }

  const checkDiagonalUp = (newBoard: number[][], col: number, row: number) => {
    const offset = Math.min(5 - row, col);
    // console.log(offset)
    
    for (let counter = 0, r = row + offset, c = col - offset; r > 0 && c < 7; r--, c++) {
      // console.log(c, r, newBoard[c][r])
      // return false;
      if (newBoard[c][r] == player) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter >= 4) return true;
    }
    return false;
  }

  const checkDiagonalDown = (newBoard: number[][], col: number, row: number) => {
    const offset = Math.min(row, col);
    for (let counter = 0, r = row - offset, c = col - offset; r < 6 && c < 7; r++, c++) {
      if (newBoard[c][r] == player) {
        counter ++;
      } else {
        counter = 0;
      }
      if (counter >= 4) return true;
    }
    return false;
  }


  const dropDisc = (col: number) => {
    if (winner != 0) {
      return;
    }

    const row = getNextRow(col);

    let newBoard = board.map((e) => e.slice());
    newBoard[col][row] = player;

    if (
      checkVertical(newBoard, col) || 
      checkHorizontal(newBoard, row) || 
      checkDiagonalUp(newBoard, col,row) || 
      checkDiagonalDown(newBoard, col,row)
    ) {
      setWinner(player)
    }

    setBoard(newBoard)
    // console.table(newBoard)
    // console.log(checkVertical(newBoard, col));
    // console.log(checkHorizontal(newBoard, row));
    // console.log(checkDiagonalUp(newBoard, col,row))
    // console.log(checkDiagonalDown(newBoard, col,row))

    setPlayer(player == 1 ? 2 : 1)
  }

  return (
    <div className="flex h-screen w-screen space-x-6 justify-center items-center p-20 bg-neutral-200">
      <div className="h-full w-fit flex flex-col justify-center">
        <div className="grid grid-cols-7 p-2 bg-white rounded-lg shadow-md">
          {board.map(
            (col, colIndex) => 
              <div 
                key={colIndex}
                onClick={() => dropDisc(colIndex)}
                className={`grid grid-rows-6 hover:bg-sky-400 p-2 gap-2 rounded-md`}
              >
                {col.map(
                  (tile: number, rowIndex) => 
                    <div key={rowIndex} className={`${colors[tile]} w-16 aspect-square rounded-full shadow-inner`}></div>
                  )
                } 
              </div>
            )
          }
        </div>
      <div className="flex justify-between pt-2">
          <button className="p-2 bg-sky-500 rounded-md text-white hover:bg-sky-400 shadow-md">New Game</button>
          <div className="p-2 font-semibold text-sky-600">{winner != 0 && `Winner: Player ${winner}`}</div>
      </div>  
      </div>
    </div>
  )
}

export default App
