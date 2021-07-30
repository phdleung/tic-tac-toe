import { ReactElement, useState } from "react";
import { Button, Header } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Board, { Winner } from "./components/Board";

type GameStatus = "play" | "reset";

function App() {
  const [winner, setWinner] = useState<Winner>();
  const [gameStatus, setGameStatus] = useState<GameStatus>("play");

  const onGameFinish = (value: Winner) => {
    setWinner(value);
    setGameStatus("reset");
  };

  const boardRender = (): ReactElement => {
    if (gameStatus === "play") {
      return <Board onGameFinish={onGameFinish} />;
    }

    return (
      <div className="winnerWrapper">
        <h1>{winner === "tie" ? `It's a tie!` : `Winner is ${winner}`}</h1>
        <Button
          content="Reset"
          icon="refresh"
          labelPosition="left"
          onClick={() => setGameStatus("play")}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <Header size='huge'>TIC TAC TOE</Header>
      <div className="BoardWrapper">{boardRender()}</div>
    </div>
  );
}

export default App;
