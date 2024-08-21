import { useEffect, useState } from "react";
import "../globals.css";
import { Item } from "./Item";
import Position from "./Position";
import { Fruit } from "../commons/fruits";

const CHARACTER_HEIGHT_LG = 128;
const CHARACTER_HEIGHT_SM = 76;
export default function Wheel({
  items,
  offset,
  winningPositions,
  wheelIndex,
}: {
  items: Fruit[];
  offset: number;
  winningPositions: Position[];
  wheelIndex: number;
}) {
  const [characterHeight, setCharacterHeight] = useState(0);

  useEffect(() => {
    setCharacterHeight(
      window.innerWidth > 1024 ? CHARACTER_HEIGHT_LG : CHARACTER_HEIGHT_SM,
    );
  }, []);

  const pixelOffset = offset * characterHeight;
  const style = {
    transition: `transform ${offset !== 0 ? 5 : 0}s ease-in-out`,
    transform: `translateY(-${pixelOffset}px)`,
  };
  return (
    <div className="bg-slate-700 h-[240px] lg:h-[405px] overflow-y-clip rounded-lg p-2 rotate-180">
      <div className="flex flex-col" style={style}>
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            isWinning={winningPositions.some(
              (pos) => pos.wheelIndex === wheelIndex && pos.itemIndex === index,
            )}
          />
        ))}
      </div>
    </div>
  );
}
