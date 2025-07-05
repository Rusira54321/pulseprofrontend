import React, { useEffect, useRef } from "react";
import Sidebar from "../sidebar/TrainerSidebar";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

const TrainerLayout = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const username =
      localStorage.getItem("trainerusername") || "";
    const role = "trainer";

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      if (username) {
        socketRef.current.emit("register", { username, role });
        console.log("📡 Registered trainer:", username, socketRef.current.id);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerLayout;
