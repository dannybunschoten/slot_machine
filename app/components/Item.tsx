import React from "react";

export function Item({
  item,
  isWinning,
}: {
  item: string;
  isWinning: boolean;
}) {
  return (
    <div
      className={`text-center text-4xl lg:text-8xl m-2 lg:m-4 rotate-180`}
      style={{
        animation: isWinning
          ? "winning-animation 0.7s infinite alternate linear"
          : "",
      }}
    >
      {item}
    </div>
  );
}
