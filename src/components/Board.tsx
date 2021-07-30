import { ReactElement, useEffect, useState } from "react";
import { WinnerGames } from "../helpers/WinnerGames";
import Tile, { TileValue } from "./Tile";

// type Human = "human";
// type Machine = "machine";
// type Player = Machine | Human;

export type Winner = TileValue | "tie";

type BoardProps = {
  onGameFinish: (value: Winner) => void;
};

const Board = ({ onGameFinish }: BoardProps): ReactElement => {
  const [tiles, setTiles] = useState<TileValue[]>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [playerTurn, setPlayerTurn] = useState<TileValue>("x");

  const onTileClick = (index: number): void => {
    const updatedBoard = [...tiles];
    updatedBoard[index] = playerTurn;
    setTiles(updatedBoard);
    setPlayerTurn(playerTurn === "x" ? "o" : "x");
  };

  const winningCondition = WinnerGames.find((conditionRow) => {
    // Getting each condition row from the Winner Games Array
    const condition = conditionRow.map((index) => tiles[index]);
    // First value needs to be valid and every cell needs to have the same value
    return condition[0] && condition.every((value) => value === condition[0]);
  });

  // winningCondition is not valid and all board is complete
  const isAtie = !winningCondition && tiles.filter((v) => v).length === 9;

  const playerWinner = winningCondition ? tiles[winningCondition[0]] : undefined;

  useEffect(() => {
    if (playerWinner) {
      return onGameFinish(playerWinner);
    }

    if(isAtie){
      return onGameFinish('tie');
    }
  }, [playerWinner, isAtie, onGameFinish]);

  return (
    <div className="Board">
      {tiles.map((tile, index) => {
        return <Tile value={tile} index={index} onClick={onTileClick} />;
      })}
    </div>
  );
};

export default Board;
