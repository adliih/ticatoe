import React from "react";

export default function WinningInfo({ winner }) {
  if (!winner) {
    return;
  }
  return (
    <div className="flex flex-col max-w-sm text-center">
      <span className="text-xl">Game Finished</span>
      <span className="font-semibold text-4xl">Congrats, {winner.value}!</span>
    </div>
  );
}
