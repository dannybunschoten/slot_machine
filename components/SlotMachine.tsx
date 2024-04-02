"use client"

import RollButton from "./RollButton";
import React, {useState} from 'react';

const symbols = ["🍒", "🍋", "🍊", "🔔", "⭐"]; // Duplicated symbols for looping

function RollingBar({ isRolling }: { isRolling: boolean }) {
	return (
		<div className={`overflow-hidden h-full w-24 relative ${isRolling ? "animate-roll" : ""}`}>
			{
				[1,2,3,4].map(iteration => 
					symbols.map((symbol, index) => (
						<div key={index * iteration} className="text-4xl h-12 flex items-center justify-center">{symbol}</div>
					))
				)
			}
		</div>
	);
}
  

export default function SlotMachine() {
    const [isRolling, setIsRolling] = useState(false);

    const handleRoll = () => {
        setIsRolling(true);

        // Optionally, stop rolling after some time
        setTimeout(() => setIsRolling(false), 2000); // Adjust time as needed
    };

    return (
        // Center the slot machine content vertically and horizontally
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <p className="text-2xl font-bold mb-8">Slot Machine</p>
            <div className="flex">
              <RollingBar isRolling={isRolling}/>
              <RollingBar isRolling={isRolling}/>
              <RollingBar isRolling={isRolling}/>
            </div>
            <RollButton onClick={handleRoll} />
        </div>
    );
}
