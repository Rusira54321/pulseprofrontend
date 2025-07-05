import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    const gym = localStorage.getItem("gymkey");
    const trainer = localStorage.getItem("trainerusername");
    const member = localStorage.getItem("memberkey");

    let username = "";
    let role = "";

    if (gym) {
      username = gym;
      role = "admin";
    } else if (trainer) {
      username = trainer;
      role = "trainer";
    } else if (member) {
      username = member;
      role = "member";
    }

    if (username && role) {
      socketRef.current.on("connect", () => {
        socketRef.current.emit("register", { username, role });
        console.log("✅ Registered to socket:", { username, role, id: socketRef.current.id });
      });

      // Handle incoming notifications
      socketRef.current.on("receiveNotification", (notif) => {
        console.log("📥 Notification received:", notif);
        setNotifications((prev) => [notif, ...prev]);
      });
    }

    // Cleanup function
    return () => {
      // Mark notifications as read when leaving the page
      if (username && role) {
        fetch("http://localhost:5000/notification/markread", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, role }),
        });
      }

      if (socketRef.current) {
        socketRef.current.off("receiveNotification");
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-10">
      <h3 className="text-3xl font-extrabold text-green-400 mb-8 text-center drop-shadow-lg tracking-tight select-none">
        Live Notifications
      </h3>
      <div className="flex flex-col items-center gap-6">
        {notifications.length === 0 ? (
          <p className="text-gray-400 text-lg">No notifications yet.</p>
        ) : (
          notifications.map((n, i) => (
            <div
              key={i}
              className="w-full max-w-xl bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 border border-green-400/40 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-green-400/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold shadow-md">
                  {n.senderUsername ? n.senderUsername.charAt(0).toUpperCase() : "?"}
                </span>
                <div>
                  <p className="font-semibold text-green-300 text-lg">
                    {n.senderUsername}
                    <span className="text-xs text-green-400 bg-green-900/40 px-2 py-1 rounded ml-2">
                      {n.senderRole}
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-white text-base font-medium">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
