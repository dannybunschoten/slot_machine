import React from "react";
import { fruits } from "../commons/fruits";
import Image from "next/image";

export const ItemWorth = (props: {}) => {
  return (
    <div>
      <h1 className="text-center font-display text-[60px] tracking-wide text-white stroke-and-paint">
        Item Worth
      </h1>
      <div className="flex flex-row flex-wrap justify-evenly gap-1 lg:gap-4">
        {fruits.map((fruit) => (
          <div
            key={fruit.name}
            className="inline-flex flex-[1_1_0] flex-col items-center justify-center gap-1 rounded-lg border-4 border-red bg-gold p-4"
          >
            <Image
              src={fruit.imageSrc}
              alt={fruit.name}
              className="h-[60px] w-[60px] lg:h-[96px] lg:w-[96px]"
            ></Image>
            <div className="text-center text-[36px] tracking-wider text-white stroke-and-paint">
              {fruit.worth} point{fruit.worth === 1 ? "" : "s"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
