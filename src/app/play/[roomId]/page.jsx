"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Grid from "@/Components/Grid";
import PlayerturnInfo from "@/Components/PlayerturnInfo";
import { JOIN } from "@/constants/SocketEvent";

export default function PlayRoom({ params }) {
  const { roomId } = params;
  const gridSize = 4;
  const isWaiting = false;

  const [playerId, setPlayerId] = useState("");

  const initSocket = async () => {
    await fetch("/api/socket");

    const socket = io("/");

    socket.on("connect", async () => {
      console.log("connected");

      setPlayerId(socket.id);

      socket.onAny((...args) => {
        console.log("Received: ", args);
      });

      const room = await socket.emitWithAck(JOIN, roomId);

      console.log(room);
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
        <h2>
          Your ID: <span>{playerId}</span>
        </h2>
        <div>
          <Grid size={gridSize} />
          <PlayerturnInfo isWaiting={isWaiting} />
        </div>
      </div>
    </section>
  );
}
