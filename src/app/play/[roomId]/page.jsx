"use client";

import React, { useEffect } from "react";
import io from "socket.io-client";
import Grid from "@/Components/Grid";
import PlayerturnInfo from "@/Components/PlayerturnInfo";

let socket;

export default function PlayRoom({ params }) {
  const { roomId } = params;
  const gridSize = 4;
  const isWaiting = false;

  const initSocket = async () => {
    await fetch("/api/socket");

    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  useEffect(() => {
    initSocket();
  }, []);

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
