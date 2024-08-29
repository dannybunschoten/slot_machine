import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { HighScoreBoard } from "./HighScoreBoard";

export function ScoreBoard({
  totalPoints,
  isWinningPosition,
  userName,
  setUserName,
  displayMessage,
  children,
}: {
  totalPoints: number;
  isWinningPosition: boolean;
  userName: string;
  setUserName: (name: string) => void;
  displayMessage: string;
  children: React.ReactNode;
}) {
  const [displayedPoints, setDisplayedPoints] = useState(totalPoints);
  const [showPoints, setShowPoints] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayText = showPoints
    ? `${displayedPoints} points`
    : "click here for the leaderboard";
  const isDisplayingGameMessage = displayMessage !== "";
  const shouldBeGlowing =
    isWinningPosition && showPoints && !isDisplayingGameMessage;
  const shouldBeCentered = !showPoints || isDisplayingGameMessage;

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
      setTimeout(() => {
        setShowPoints(true);
      }, 5000);
    }, 15000);

    setIsMobile(window.innerWidth > 1024 ? false : true);

    return () => {
      clearInterval(toggleInterval);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full overflow-hidden rounded-lg border-4 border-red bg-blue px-2 text-right font-segment text-[46px] ${shouldBeCentered ? "lg:text-center" : ""} text-white ${shouldBeGlowing ? "animate-winning" : ""}`}
        onClick={() => {
          if (showPoints) {
            return;
          }
          openModal();
        }}
      >
        <div
          className={`whitespace-nowrap ${!showPoints && isMobile && !displayMessage ? "animate-scrolling" : ""}`}
        >
          {displayMessage || displayText}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <HighScoreBoard userName={userName} setUserName={setUserName}>
            {children}
          </HighScoreBoard>
        </Modal>
      )}
    </>
  );
}
