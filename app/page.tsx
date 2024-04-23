'use client'

import RollBar from "@/components/RollBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [modulo, setModulo] = useState(42);

  useEffect(() => {
    const match = window.matchMedia("(min-width: 768px)").matches;
    setModulo(match ? 42 : 14);
  }, []);

  const items = ["🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨", "🍒", "🍓", "⭐️", "🍐", "👑", "🎩", "✨"]

  const [isRolling1, setIsRolling1] = useState(false);
  const [isRolling2, setIsRolling2] = useState(false);
  const [isRolling3, setIsRolling3] = useState(false);
  
  const [offSet1, setOffSet1] = useState(0);
  const [offSet2, setOffSet2] = useState(0);
  const [offSet3, setOffSet3] = useState(modulo);

  const [prevOffSet1, setPrevOffSet1] = useState(0);
  const [prevOffSet2, setPrevOffSet2] = useState(0);
  const [prevOffSet3, setPrevOffSet3] = useState(0);

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
    <div className="h-screen flex flex-col justify-center bg-slate-600">
      <div className={`text-2xl lg:text-8xl self-center m-12 ${offSet1 === offSet2 && offSet2 === offSet3 ? "animate-flash" : "opacity-0"}`}>JACKPOT</div>
      <div className="flex flex-row justify-center self-center bg-amber-400 p-4 lg:p-9 rounded border-solid border-8 border-yellow-700">
        <RollBar values= {items} isRolling={isRolling1} oldOffSet={prevOffSet1} newOffSet={offSet1}/>
        <RollBar values= {items} isRolling={isRolling2} oldOffSet={prevOffSet2} newOffSet={offSet2}/>
        <RollBar values= {items} isRolling={isRolling3} oldOffSet={prevOffSet3} newOffSet={offSet3}/>
      </div>
      <button onClick={handleClick} className="font-serif bg-yellow-500 font-bold rounded text-2xl lg:text-8xl self-center m-4 lg:m-16 border-solid border-8 border-yellow-700 px-16 lg:px-32 py-4">
        Roll
      </button>
    </div>
  );
}