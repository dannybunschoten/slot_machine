import Image from "next/image";
import cherries from "@/public/cherries.png";
import clover from "@/public/clover.png";
import diamond from "@/public/diamond.png";
import grapes from "@/public/grapes.png";
import horseshoe from "@/public/horseshoe.png";
import lemon from "@/public/orange.png";
import seven from "@/public/seven.png";
import watermelon from "@/public/watermelon.png";

const map = {
  cherries: cherries,
  clover: clover,
  diamond: diamond,
  grapes: grapes,
  horseshoe: horseshoe,
  lemon: lemon,
  seven: seven,
  watermelon: watermelon,
} as const;

type ValueKey = keyof typeof map;

export function Item({
  item,
  isWinning,
}: {
  item: ValueKey;
  isWinning: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center p-2 lg:p-4 ${isWinning ? "animate-[glow_0.7s_alternate_infinite]" : ""}`}
    >
      <Image
        alt={item}
        className="h-[60px] w-[60px] lg:h-[96px] lg:w-[96px] rotate-180"
        src={map[item]}
      />
    </div>
  );
}
