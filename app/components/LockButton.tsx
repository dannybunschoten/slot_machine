import React from "react";

type Props = {
  pressed: lockButtonState;
  setLockedState: (state: lockButtonState) => void;
};

export type lockButtonState =
  | "pressed"
  | "disabledClicked"
  | "disabledNotClicked"
  | "clickable";

export default function LockButton({ pressed, setLockedState }: Props) {
  const startingColor =
    pressed === "clickable" || pressed === "disabledNotClicked"
      ? "#FF7B69"
      : "#FFBDB4";
  const endingColor =
    pressed === "clickable" || pressed === "disabledNotClicked"
      ? "#760E17"
      : "#CF2634";
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
        background: `radial-gradient(50% 50% at 50% 50%, ${startingColor} 0%, ${endingColor} 100%)`,
      }}
      className="rounded-lg border-2 border-black text-[36px] tracking-wider text-white transition-colors stroke-and-paint disabled:border-[#A9A9A9] disabled:bg-[#D3D3D3] disabled:text-[#D3D3D3] disabled:opacity-60"
      disabled={
        pressed === "disabledClicked" || pressed === "disabledNotClicked"
      }
      onClick={pressHandler}
    >
      Lock
    </button>
  );
}
