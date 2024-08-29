import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { HighScoreBoard } from "./HighScoreBoard";

export function ScoreBoard({
  totalPoints,
  isWinningPosition,
}: {
  totalPoints: number;
  isWinningPosition: boolean;
}) {
  const [displayedPoints, setDisplayedPoints] = useState(totalPoints);
  const [showPoints, setShowPoints] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayText = showPoints
    ? `${displayedPoints} points`
    : "click here for the leaderboard";

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  // effect to smoothly update the displayed points
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedPoints((prev) => {
        if (prev < totalPoints) return prev + 1;
        if (prev > totalPoints) return prev - 1;
        clearInterval(interval);
        return prev;
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [totalPoints]);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setShowPoints(false);
      const timeout = setTimeout(() => {
        setShowPoints(true);
      }, 15000);
    }, 16000);

    setIsMobile(window.innerWidth > 1024 ? false : true);

    return () => {
      clearInterval(toggleInterval);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full overflow-hidden rounded-lg border-4 border-red bg-blue px-2 text-right font-segment text-[46px] ${!showPoints ? "lg:text-center" : ""} text-white ${isWinningPosition && showPoints ? "animate-winning" : ""}`}
        onClick={() => {
          if (showPoints) {
            return;
          }
          openModal();
        }}
      >
        <div
          className={`whitespace-nowrap ${!showPoints && isMobile ? "animate-scrolling" : ""}`}
        >
          {displayText}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <HighScoreBoard></HighScoreBoard>
        </Modal>
      )}
    </>
  );
}
