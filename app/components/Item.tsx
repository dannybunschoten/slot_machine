import { Fruit } from "../commons/fruits";
import Image, { StaticImageData } from "next/image";
import cherries from "../../public/cherries.png";
import clover from "../../public/clover.png";
import diamond from "../../public/diamond.png";
import grapes from "../../public/grapes.png";
import horseshoe from "../../public/horseshoe.png";
import lemon from "../../public/lemon.png";
import orange from "../../public/orange.png";
import seven from "../../public/seven.png";
import watermelon from "../../public/watermelon.png";

type ImageMap = {
  [key in Fruit]: StaticImageData; // StaticImageData is the type for imported images in Next.js
};

export function Item({ item, isWinning }: { item: Fruit; isWinning: boolean }) {
  const map: ImageMap = {
    cherries: cherries,
    clover: clover,
    diamond: diamond,
    grapes: grapes,
    horseshoe: horseshoe,
    lemon: lemon,
    orange: orange,
    seven: seven,
    watermelon: watermelon,
  };
  return (
    <div
      className={`flex items-center justify-center p-2 lg:p-4 ${isWinning ? "animate-[glow_0.7s_alternate_infinite]" : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image
        src={map[item]}
        alt={item}
        className="h-[60px] w-[60px] rotate-180 lg:h-[96px] lg:w-[96px]"
        priority
      />
    </div>
  );
}
