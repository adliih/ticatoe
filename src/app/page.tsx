"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!roomId) {
      return;
    }
    router.push(`/play/${roomId}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
          <label htmlFor="roomId">Room ID</label>
          <input
            id="roomId"
            type="text"
            className="text-black p-2 rounded-md"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="submit"
            className="p-2 rounded-full text-black hover:text-green-300 bg-green-300 hover:bg-green-700"
            value={`Play Ticatoe!`}
          />
        </div>
      </form>
    </main>
  );
}
