import React from "react";

export default function PlayerTurnInfo({ isWaiting, winningPlayerValue }) {
  // only render when there are no winner yet
  if (!!winningPlayerValue) {
    return;
  }
  return (
    <div className="mt-4">
      {isWaiting ? (
        <div>Waiting for other player...</div>
      ) : (
        <div>It&apos;s your turn!</div>
      )}
    </div>
  );
}
