import React from "react";

type propTypes = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ onClose, children }: propTypes) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue bg-opacity-50 p-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[600px] rounded-lg border-4 border-red bg-gray p-6 shadow-lg"
      >
        <button className="absolute right-6 top-6 text-3xl" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
