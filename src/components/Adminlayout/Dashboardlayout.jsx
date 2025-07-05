import React, { useEffect, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

const AdminLayout = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem("gymkey") || "";
    const role = "admin";

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      if (username) {
        socketRef.current.emit("register", { username, role });
        console.log("📡 Registered admin:", username, socketRef.current.id);
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

export default AdminLayout;
