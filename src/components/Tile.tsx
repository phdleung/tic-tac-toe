import { ReactElement } from "react";
import { Header } from "semantic-ui-react";

export type TileValue = "x" | "o" | undefined;

type TileProps = {
  value: TileValue;
  index: number;
  onClick: (index: number) => void;
};

const Tile = ({ value, index, onClick }: TileProps): ReactElement => {

  /**
   * TODO - Get CROSS/CIRCLE svg and animate transition
   */
  return (
    <div className="Tile" onClick={() => onClick(index)}>
      <Header as="h1">{value}</Header>
    </div>
  );
};

export default Tile;
