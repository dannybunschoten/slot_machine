import React from "react";

type Props = {
  pressed: lockButtonState;
  setLockedState: (state: lockButtonState) => void;
};

export type lockButtonState = "pressed" | "disabled" | "clickable";

export default function LockButton({ pressed, setLockedState }: Props) {
  const startingColor = pressed === "clickable" ? "#FF7B69" : "#FFBDB4";
  const endingColor = pressed === "clickable" ? "#760E17" : "#CF2634";
  const pressHandler = () => {
    if (pressed === "clickable") {
      setLockedState("pressed");
    } else if (pressed === "pressed") {
      setLockedState("clickable");
    }
  };
  return (
    <button
      style={{
        WebkitTextStroke: "4px black",
        paintOrder: "stroke fill",
        background: `radial-gradient(50% 50% at 50% 50%, ${startingColor} 0%, ${endingColor} 100%)`,
      }}
      className="rounded-lg border-2 border-black text-[36px] tracking-wider text-white transition-colors disabled:border-[#A9A9A9] disabled:bg-[#D3D3D3] disabled:text-[#D3D3D3] disabled:opacity-60"
      disabled={pressed === "disabled"}
      onClick={pressHandler}
    >
      Lock
    </button>
  );
}
