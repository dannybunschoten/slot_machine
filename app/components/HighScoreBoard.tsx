import React from "react";

export const HighScoreBoard = ({
  children,
  userName,
  setUserName,
}: {
  children: React.ReactNode;
  userName: string;
  setUserName: (userName: string) => void;
}) => {
  return (
    <div>
      <h1 className="text-center font-display text-[60px] tracking-wide text-white stroke-and-paint">
        High Scores
      </h1>
      {children}
      <input
        type="text"
        className="mt-2 w-full overflow-hidden rounded-lg border-4 border-red bg-blue px-2 text-right font-display text-[46px] text-white shadow-none focus:outline-none"
        placeholder="Enter your name"
        defaultValue={userName === "Default User" ? "" : userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
    </div>
  );
};
