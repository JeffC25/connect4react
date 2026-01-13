import { useState } from "react"

enum Player {
  P1 = "Player 1",
  P2 = "Player 2"
}

const getPlayerColor = (tile: (Player | null)): String => {
  switch (tile) {
    case Player.P1: return 'bg-red-400'
    case Player.P2: return 'bg-yellow-400'
    case null: return 'bg-neutral-300'
  }
}

function App() {

  const initialBoard: (Player | null)[][] = Array.from({ length: 7 }, () => Array(6).fill(null));
  const [board, setBoard] = useState<(Player | null)[][]>(initialBoard);
  const [player, setPlayer] = useState<(Player | null)>(Player.P1)
  const [winner, setWinner] = useState<(Player | null)>(null);

  const getNextRow = (col: number): (number | null) => {
    for (let row = 5; row >= 0; row--) {
      const tile = board[col][row];
      if (tile == null) return row;
    }
    return null;
  }

  const checkHorizontal = (newBoard: (Player | null)[][], row: number): Boolean => {
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

  const checkVertical = (newBoard: (Player | null)[][], col: number): Boolean => {
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

  const checkDiagonalUp = (newBoard: (Player | null)[][], col: number, row: number): Boolean => {
    const offset = Math.min(5 - row, col);
    for (let counter = 0, r = row + offset, c = col - offset; r > 0 && c < 7; r--, c++) {
      if (newBoard[c][r] == player) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter >= 4) return true;
    }
    return false;
  }

  const checkDiagonalDown = (newBoard: (Player | null)[][], col: number, row: number): Boolean => {
    const offset = Math.min(row, col);
    for (let counter = 0, r = row - offset, c = col - offset; r < 6 && c < 7; r++, c++) {
      if (newBoard[c][r] == player) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter >= 4) return true;
    }
    return false;
  }


  const playTurn = (col: number) => {
    if (winner != null) { return }

    const row = getNextRow(col);
    if (row == null) {
      return
    }
    console.log(`Dropping disc: column ${col}, row ${row}`)

    let newBoard = board.map((e) => e.slice());
    newBoard[col][row] = player;
    console.log(newBoard)

    if (
      checkVertical(newBoard, col) ||
      checkHorizontal(newBoard, row) ||
      checkDiagonalUp(newBoard, col, row) ||
      checkDiagonalDown(newBoard, col, row)
    ) {
      setWinner(player)
      console.log(`Winner: ${player}`)
    }

    setBoard(newBoard)

    setPlayer(player == Player.P1 ? Player.P2 : Player.P1)
    console.log(`${player}'s turn`)
  }

  const restart = () => {
    setWinner(null);
    setBoard(initialBoard);
  }

  return (
    <div className="flex h-screen w-screen space-x-6 justify-center items-center sm:p-20 bg-neutral-200">
      <div className="h-full w-fit flex flex-col justify-center">
        <div className="grid grid-cols-7 p-2 bg-white rounded-lg shadow-md">
          {board.
            map(
              (col, colIndex) =>
                <div
                  key={colIndex}
                  onClick={() => playTurn(colIndex)}
                  className={`grid grid-rows-6 hover:bg-sky-400 p-2 gap-2 rounded-md`}
                >
                  {col.map(
                    (tile: (Player | null), rowIndex) =>
                      <div key={rowIndex} className={`w-12 sm:w-16 aspect-square rounded-full shadow-inner ${getPlayerColor(tile)}`}></div>
                  )}
                </div>
            )
          }
        </div>
        <div className="flex justify-between pt-2">
          <button onClick={restart} className="p-2 bg-sky-500 rounded-md text-white hover:bg-sky-400 shadow-md">New Game</button>
          <div className="p-2 font-semibold text-sky-600">{winner != null && `Winner: ${winner}`}</div>
        </div>
      </div>
    </div>
  )
}

export default App
