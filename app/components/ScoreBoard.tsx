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
      className={`text-5xl lg:text-8xl font-bold text-yellow-500 self-center m-12 bold ${displayedPoints === 0 ? "animate-pulse" : ""}`}
      style={{
        animation: isWinningPosition ? "winning-animation 0.7s infinite alternate linear" : "",
      }}
    >
      Points: {displayedPoints}
    </div>
  );
}
