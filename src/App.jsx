import { Player } from "./Components/Player";
import { GameBoard } from "./Components/GameBoard";
import { useState } from "react";
import { Log } from "./Components/Log";
import { PLAYERS } from "./WinningComponent";
import { GameOver } from "./Components/GameOver";
import {
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./Components/HelperFunction";

function App() {
  const [player, setPlayer] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, player);
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayer(symbol, newName) {
    setPlayer((prePlayer) => {
      return {
        ...prePlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbole='X'
            isActive={activePlayer === "X"}
            onChangeName={handlePlayer}
          />
          <Player
            initialName={PLAYERS.O}
            symbole='O'
            isActive={activePlayer === "O"}
            onChangeName={handlePlayer}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
