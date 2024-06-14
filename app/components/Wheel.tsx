import { useEffect, useState } from "react";
import "../globals.css";
import { Item } from "./Item";

const CHARACTER_HEIGHT_LG = 128;
const CHARACTER_HEIGHT_SM = 76;
export default function Wheel({
  items,
  offset,
  winningItems,
}: {
  items: string[];
  offset: number;
  winningItems: [boolean, boolean, boolean];
}) {
  const [characterHeight, setCharacterHeight] = useState(0);

  useEffect(() => {
    setCharacterHeight(window.innerWidth > 1024 ? CHARACTER_HEIGHT_LG : CHARACTER_HEIGHT_SM);
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
            isWinning={index < 3 ? winningItems[index] : false}
          />
        ))}
      </div>
    </div>
  );
}
