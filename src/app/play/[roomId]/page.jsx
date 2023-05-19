"use client";

import React, { useEffect, useReducer, useState } from "react";
import io from "socket.io-client";
import Grid from "@/Components/Grid";
import PlayerturnInfo from "@/Components/PlayerturnInfo";
import { JOIN, TILE_CLICKED, TURN_CHANGE } from "@/constants/SocketEvent";

export default function PlayRoom({ params }) {
  const { roomId } = params;
  const gridSize = 4;
  const [isWaiting, setIsWaiting] = useState(true);

  const [player, updatePlayer] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    {
      id: "",
      value: "",
    }
  );

  const initSocket = async () => {
    await fetch("/api/socket");

    const socket = io();

    socket.on("connect", async () => {
      console.log("connected as: ", socket.id);

      const response = await socket.emitWithAck(JOIN, roomId);

      updatePlayer({
        id: response.player.id,
        value: response.player.value,
      });

      console.log("join result", { response, player });
    });

    socket.on(TURN_CHANGE, (playerId) => {
      console.log(TURN_CHANGE, { playerId, player });
      setIsWaiting(playerId != player.id);
    });

    socket.on(TILE_CLICKED, (...params) => {
      console.log(TILE_CLICKED, params);
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
          Your ID: <span>{player.id}</span>
        </h2>
        <h2>
          Your Avatar: <span>{player.value}</span>
        </h2>
        <div>
          <Grid size={gridSize} />
          <PlayerturnInfo isWaiting={isWaiting} />
        </div>
      </div>
    </section>
  );
}
