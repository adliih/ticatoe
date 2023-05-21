import React from "react";

export default function WinningInfo({ winningPlayerValue }) {
  if (!winningPlayerValue) {
    return;
  }
  return (
    <div>
      <span className="font-semibold text-6xl">{winningPlayerValue}</span>
    </div>
  );
}
