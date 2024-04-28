'use client'

import RollBar from "@/components/RollBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [modulo, setModulo] = useState(typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches ? 42 : 17.5 : 17.5);
  
  const items = ["🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨"]

  const [isRolling1, setIsRolling1] = useState(false);
  const [isRolling2, setIsRolling2] = useState(false);
  const [isRolling3, setIsRolling3] = useState(false);
  
  const [offSet1, setOffSet1] = useState(0);
  const [offSet2, setOffSet2] = useState(0);
  const [offSet3, setOffSet3] = useState(0);
  
  const [prevOffSet1, setPrevOffSet1] = useState(Math.floor(Math.random() * 7) * (modulo / 7));
  const [prevOffSet2, setPrevOffSet2] = useState(Math.floor(Math.random() * 7) * (modulo / 7));
  const [prevOffSet3, setPrevOffSet3] = useState(Math.floor(Math.random() * 7) * (modulo / 7));

  function handleClick() {
    const getOffset = () => 2 * modulo + Math.floor(Math.random() * 7) * (modulo / 7);

    const offset1 = getOffset();
    const offset2 = getOffset();
    const offset3 = getOffset();

    setOffSet1((offSet1 % modulo) + offset1 + modulo);
    setOffSet2((offSet2 % modulo) + offset2 + modulo);
    setOffSet3((offSet3 % modulo) + offset3 + modulo);

    setIsRolling1(true);
    setIsRolling2(true);
    setIsRolling3(true);

    const timer = setTimeout(() => {
      setIsRolling1(false);
      setIsRolling2(false);
      setIsRolling3(false);

      setPrevOffSet1((offSet1 + offset1) % modulo + modulo);
      setPrevOffSet2((offSet2 + offset2) % modulo + modulo);
      setPrevOffSet3((offSet3 + offset3) % modulo + modulo);
    }, 5100);
  }

  return (
    <div className="h-screen flex flex-col justify-center bg-dark-blue-black">
      <div className={`text-2xl lg:text-8xl self-center m-12 ${prevOffSet1 === prevOffSet2 && prevOffSet2 === prevOffSet3 ? "animate-flash" : "opacity-0"}`}>JACKPOT</div>
      <div className="flex flex-row justify-center self-center bg-gold-trans p-4 lg:p-9 rounded border-solid border-8 border-yellow-700">
        <RollBar values= {items} isRolling={isRolling1} oldOffSet={prevOffSet1} newOffSet={offSet1}/>
        <RollBar values= {items} isRolling={isRolling2} oldOffSet={prevOffSet2} newOffSet={offSet2}/>
        <RollBar values= {items} isRolling={isRolling3} oldOffSet={prevOffSet3} newOffSet={offSet3}/>
      </div>
      <button onClick={handleClick} disabled={isRolling1||isRolling2||isRolling3} className="font-serif bg-gold-trans font-bold rounded-2xl text-2xl lg:text-8xl self-center m-4 lg:m-16 px-16 lg:px-32 py-4">
        Roll
      </button>
    </div>
  );
}