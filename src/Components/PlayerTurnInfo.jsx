import React from "react";

export default function PlayerTurnInfo({ isWaiting }) {
  return (
    <div className="mt-4">
      {isWaiting ? (
        <div>Waiting for other player...</div>
      ) : (
        <div>It's your turn!</div>
      )}
    </div>
  );
}
