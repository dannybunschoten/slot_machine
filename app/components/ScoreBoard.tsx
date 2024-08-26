import React, { useEffect, useState } from "react";

export function ScoreBoard({
  totalPoints,
  isWinningPosition,
}: {
  totalPoints: number;
  isWinningPosition: boolean;
}) {
  const [displayedPoints, setDisplayedPoints] = useState(totalPoints);

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayedPoints < totalPoints) {
        setDisplayedPoints((prev) => prev + 1);
      } else if (displayedPoints > totalPoints) {
        setDisplayedPoints((prev) => prev - 1);
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [displayedPoints, totalPoints]);

  return (
    <div
      className={
        "w-full rounded-lg border-4 border-red bg-blue px-2 text-right font-segment text-[46px] text-white"
      }
      style={{
        animation: isWinningPosition
          ? "winning-animation 0.7s infinite alternate linear"
          : "",
      }}
    >
      {displayedPoints}
    </div>
  );
}
