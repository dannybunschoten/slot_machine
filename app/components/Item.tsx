import { Fruit } from "../commons/fruits";

export function Item({ item, isWinning }: { item: Fruit; isWinning: boolean }) {
  return (
    <div
      className={`flex items-center justify-center p-2 lg:p-4 ${isWinning ? "animate-[glow_0.7s_alternate_infinite]" : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/${String(item)}.png`}
        alt={item}
        className="h-[60px] w-[60px] lg:h-[96px] lg:w-[96px] rotate-180"
      />
    </div>
  );
}
