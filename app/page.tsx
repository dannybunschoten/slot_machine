'use client'

import { get } from "http";
import RollBar from "./components/RollBar";
import { useEffect, useState } from "react";
import { off } from "process";

export default function Home() {
  const items = ["🍒", "🍓", "⭐️", "🍐", "👑", "🎩"]
  
  const [arr1, setArr1] = useState(["🍒", "🍓", "⭐️"]);
  const [arr2, setArr2] = useState(["⭐️", "🍐", "👑"]);
  const [arr3, setArr3] = useState(["👑", "🎩", "🍒"]);
  const [points, setPoints] = useState(10);
  const [hasWon, setHasWon] = useState(false);

  const [charHeight, setCharHeight] = useState(0);

  useEffect(() => {
    const generateArray = (initialArray: string[]) => {
      let newArray = [...initialArray];
      for (let i = 0; i < 39; i++) {
        newArray.push(items[Math.floor(Math.random() * items.length)]);
      }
      return newArray;
    };

    setCharHeight(window.matchMedia("(min-width: 1024px)").matches ? 6 : 2.5);

    const genArr1 = generateArray(arr1);
    const genArr2 = generateArray(arr2);
    const genArr3 = generateArray(arr3);
    setArr1([...genArr1, ...genArr1, ...genArr1, ...genArr1]);
    setArr2([...genArr2, ...genArr2, ...genArr2, ...genArr2]);
    setArr3([...genArr3, ...genArr3, ...genArr3, ...genArr3]);
  }, []); 
  

  const [isRolling, setIsRolling] = useState(false);
  
  const [offSet1, setOffSet1] = useState(0);
  const [offSet2, setOffSet2] = useState(0);
  const [offSet3, setOffSet3] = useState(0);
  
  const [prevOffSet1, setPrevOffSet1] = useState(0);
  const [prevOffSet2, setPrevOffSet2] = useState(0);
  const [prevOffSet3, setPrevOffSet3] = useState(0);

  function handleClick() {
    if (points === 0) {
      setPoints(9);
    }
    setPoints(val => val - 1);
    
    const getOffset = () => 42 + Math.floor(Math.random() * 42);

    const off1 = getOffset();
    const off2 = getOffset();
    const off3 = getOffset();

    setOffSet1(prevOffSet1 + off1);
    setOffSet2(prevOffSet2 + off2);
    setOffSet3(prevOffSet3 + off3);

    setIsRolling(true);

    const timer = setTimeout(() => {
      setIsRolling(false);
      
      const newOffSet1 = (off1 + offSet1) % 42;
      const newOffSet2 = (off2 + offSet2) % 42;
      const newOffSet3 = (off3 + offSet3) % 42;
      
      setPrevOffSet1(newOffSet1);
      setPrevOffSet2(newOffSet2);
      setPrevOffSet3(newOffSet3);
      
      setHasWon(win(newOffSet1, newOffSet2, newOffSet3));
    }, 5050);
  }

  const win = (roll1Offset: number, roll2Offset: number, roll3Offset: number) => {
    const TlBr = arr1[roll1Offset] === arr2[roll2Offset + 1] && arr2[roll2Offset + 1] === arr3[roll3Offset + 2] && increasePoints(1, arr1[roll1Offset]);
    const BlTr = arr1[roll1Offset + 2] === arr2[roll2Offset + 1] && arr2[roll2Offset + 1] === arr3[roll3Offset] && increasePoints(1, arr1[roll1Offset + 2]);
    const row1 = arr1[roll1Offset] === arr2[roll2Offset] && arr2[roll2Offset] === arr3[roll3Offset] && increasePoints(2, arr1[prevOffSet1]);
    const row2 = arr1[roll1Offset + 1] === arr2[roll2Offset + 1] && arr2[roll2Offset + 1] === arr3[roll3Offset + 1] && increasePoints(2, arr1[roll1Offset + 1]);
    const row3 = arr1[roll1Offset + 2] === arr2[roll2Offset + 2] && arr2[roll2Offset + 2] === arr3[roll3Offset + 2] && increasePoints(3, arr1[roll1Offset + 2]);
    console.log(`TlBr: ${TlBr}, BlTr: ${BlTr}, row1: ${row1}, row2: ${row2}, row3: ${row3}`)
    return TlBr || BlTr || row1 || row2 || row3;
  }

  const increasePoints = (multiplier: number, winning_char: string): boolean => {
    switch (winning_char) {
      case "🍒":
      case "🍓":
      case "🍐":
        setPoints(val => val + multiplier * 1);
        break;
      case "👑":
      case "🎩":
      case "✨":
        setPoints(val => val + multiplier * 3);
        break;
      case "⭐️":
        setPoints(val => val + multiplier * 5);
        break;
      default:
        console.log("Unhandled character:", winning_char);
    }
    return true;
  }

  return (
    <div className="h-dvh flex flex-col justify-center bg-dark-blue-black">
      <div className={`text-4xl lg:text-8xl font-bold  text-yellow-500 self-center m-12 bold ${!isRolling && hasWon ? "animate-flash":""}`}>Points: {points}</div>
      <div className="flex flex-row justify-center self-center bg-gold-trans p-4 lg:p-9 rounded border-solid border-8 border-yellow-700">
        <RollBar values= {arr1} isRolling={isRolling} oldOffSet={prevOffSet1 * charHeight} newOffSet={offSet1 * charHeight} rollTime="animate-roll3"/>
        <RollBar values= {arr2} isRolling={isRolling} oldOffSet={prevOffSet2 * charHeight} newOffSet={offSet2 * charHeight} rollTime="animate-roll4"/>
        <RollBar values= {arr3} isRolling={isRolling} oldOffSet={prevOffSet3 * charHeight} newOffSet={offSet3 * charHeight} rollTime="animate-roll5"/>
      </div>
      <button onClick={handleClick} disabled={isRolling} className="font-serif bg-gold-trans font-bold rounded-2xl text-2xl lg:text-8xl self-center m-4 lg:m-16 px-16 lg:px-32 py-4">{points === 0 && !isRolling ? "Restart" : "Roll"}</button>
    </div>
  );
}