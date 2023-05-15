"use client";

import React from "react";
import Grid from "@/Components/Grid";
import PlayerturnInfo from "@/Components/PlayerturnInfo";

export default function PlayRoom({ params }) {
  const { roomId } = params;
  const gridSize = 4;
  const isWaiting = false;
  return (
    <section>
      <div className="flex flex-col items-center gap-4 mt-10">
        <h3 className="font-bold">
          Room ID: <span>{roomId}</span>
        </h3>
        <div>
          <Grid size={gridSize} />
          <PlayerturnInfo isWaiting={isWaiting} />
        </div>
      </div>
    </section>
  );
}
