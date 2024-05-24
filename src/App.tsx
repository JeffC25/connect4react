import { useState } from "react"

function App() {
  const colors = [
    'bg-neutral-100',
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

  const checkHorizontal = (row: number) => {
    let counter = 1;
    for (let col = 0; col < 7; col++) {
      if (board[col][row] == player) {
        counter++;
      } else {
        counter = 1;
      }
      if (counter >= 4) return true;
    }
    return false;
  }

  const checkVertical = (col: number) => {
    let counter = 1;
    for (let row = 0; row < 6; row++) {
      if (board[col][row] == player) {
        counter++;
      } else {
        counter = 1;
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
    setBoard(newBoard)

    // console.log(checkVertical(col));
    // console.log(checkHorizontal(row));

    setPlayer(player == 1 ? 2 : 1)
  }

  return (
    <div className="flex h-screen w-screen space-x-6 justify-center p-20  bg-neutral-200">
      <div className="h-full w-fit bg-white rounded-lg shadow-md flex justify-center">
        <div className="grid grid-cols-7 p-2">
          {board.map(
            (col, colIndex) => 
              <div 
                key={colIndex}
                onClick={() => dropDisc(colIndex)}
                className={`grid grid-rows-6 hover:bg-neutral-300 p-2 gap-2`}
              >
                {col.map(
                  (tile: number, rowIndex) => 
                    <div key={rowIndex} className={`${colors[tile]} w-16 aspect-square rounded-full`}></div>
                  )
                } 
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App
