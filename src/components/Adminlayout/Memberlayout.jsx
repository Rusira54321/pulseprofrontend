import React, { useEffect, useRef } from "react";
import Sidebar from "../sidebar/MemberSidebar";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

const MemberLayout = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem("memberkey");
    const role = "member";

    if (!username) {
      console.warn("⚠️ Member username not found in localStorage");
      return;
    }

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket","polling"],
    });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("register", { username, role });
      console.log("📡 Registered member:", username, socketRef.current.id);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
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

export default MemberLayout;