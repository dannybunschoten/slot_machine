import React, { useState, useEffect } from "react";

export default function RollBar({values, isRolling, oldOffSet, newOffSet}: {values: string[], isRolling: boolean, oldOffSet: number, newOffSet: number}) {
  return (
    <div className={`bg-black rounded m-3 lg:m-5 p-2 lg:p-2 h-40 lg:h-80 overflow-hidden text-clip border-solid border-2 lg:border-8 border-yellow-700`}>
      <div
        className={`text-4xl lg:text-8xl text-center leading-[2.5rem] lg:leading-[6rem] text-white ${isRolling ? "animate-roll" : ""}`}
        style={{
          '--translate-y-from': `-${oldOffSet}rem`,
          '--translate-y': `-${newOffSet}rem`,
          transform: `translateY(-${oldOffSet}rem)`
        } as React.CSSProperties}
      >
        {values.map((txt, index) => (
          <React.Fragment key={index}>
            {txt}<br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
