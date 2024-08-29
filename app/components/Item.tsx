import { Fruit } from "../commons/fruits";
import Image from "next/image";
import seven from "../../public/seven.png";

export function Item({ item, isWinning }: { item: Fruit; isWinning: boolean }) {
  return (
    <div
      className={`flex items-center justify-center p-2 lg:p-4 ${isWinning ? "animate-winningZoom" : ""}`}
    >
      <Image
        src={item.imageSrc || seven}
        alt={item.name}
        className="h-[60px] w-[60px] rotate-180 lg:h-[96px] lg:w-[96px]"
        priority
      />
    </div>
  );
}
