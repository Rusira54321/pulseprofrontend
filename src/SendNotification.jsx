import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SendNotification = () => {
  const socketRef = useRef(null);
  const [receiverUsername, setReceiverUsername] = useState("");
  const [receiverRole, setReceiverRole] = useState("member");
  const [message, setMessage] = useState("");
  const [gymmebers,setgymmembers] = useState([])//set member related to gym this have username array
  const [gymtrainers,setgymtrainers]  = useState([])//this content object array
  const [senderUsername, setSenderUsername] = useState("");
  const [senderRole, setSenderRole] = useState("");
  const [trainergym,settrainergym] = useState("")
  const [trainermember,settrainermember] = useState([])//member objects
  const [membergym,setmembergym] = useState("")
  const [membertrainer,setmembertrainer] = useState("")
  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket","polling"]
    });

    const gym = localStorage.getItem("gymkey");
    const trainer = localStorage.getItem("trainerusername");
    const member = localStorage.getItem("memberkey");
    if(gym)
    {
        const getgymmembers = async() =>{
            await axios.post("http://localhost:5000/get/getmemberusernamebyadmin",{
              "gymkey":gym
            }).then((res)=>{
              setgymmembers(res.data.members)
            })
        }
        getgymmembers()
        const getgymtrainers = async() =>{
            await axios.post("http://localhost:5000/trainer/gettrainer",{
              "key":gym
            }).then((res)=>{
              setgymtrainers(res.data.trainers)
            })
        }
        getgymtrainers()
    }else if(trainer)
    {
        const gettrainergym = async() =>{
            await axios.post("http://localhost:5000/trainer/gettrainergym",{
              "key":trainer
            }).then((res)=>{
              settrainergym(res.data.gym)
            })
        }
        gettrainergym()
        const gettrainermember = async() =>{
            await axios.post("http://localhost:5000/get/getmemberbyTrainer",{
              "username":trainer
            }).then((res)=>{
              settrainermember(res.data.members)
            })
        }
        gettrainermember()
    }else if(member)
    {
        const membergym = async() =>{
            await axios.post("http://localhost:5000/get/getmembergym",{
              "key":member
            }).then((res)=>{
              setmembergym(res.data.gym)
            })
        }
        membergym()
        const membertrainer = async() =>{
            await axios.post("http://localhost:5000/get/getmembertrainer",{
              "key":member
            }).then((res)=>{
              setmembertrainer(res.data.trainer)
            })
        }
        membertrainer()
    }
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
      setSenderUsername(username);
      setSenderRole(role);

      socketRef.current.on("connect", () => {
        socketRef.current.emit("register", { username, role });
        console.log("📡 Registered socket:", username, socketRef.current.id);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendNotification = () => {
    if (!senderUsername || !senderRole || !receiverUsername || !receiverRole || !message) {
      alert("Please fill all fields");
      return;
    }

    const sender = { username: senderUsername, role: senderRole };
    const receiver = { username: receiverUsername, role: receiverRole };

    socketRef.current.emit("sendNotification", {
      sender,
      receiver,
      message,
    });

    alert("✅ Notification sent!");
    setMessage(""); // Clear message after sending
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-10">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-90 rounded-3xl p-8 shadow-2xl border border-green-500 flex flex-col gap-6">
        <h2 className="text-2xl font-extrabold text-green-400 text-center mb-2">Send Notification</h2>
           <select
          required
          value={receiverUsername}
          onChange={(e) => setReceiverUsername(e.target.value)}
          className="rounded-lg border border-green-400 bg-gray-900 px-4 py-3 text-lg text-green-300"
        >
          <option value="">Select receiver</option>
          {
            gymmebers.length!=0 &&  gymmebers.map((gymmember,index)=>(
                <option key={index} value={gymmember}>{gymmember}(Member)</option>
            ))
          }
          {
            gymtrainers.length!=0 && gymtrainers.map((gymtrainer,index)=>(
              <option key={index} value={gymtrainer.username}>{gymtrainer.username}(Trainer)</option>
            ))
          }
          {
            trainergym!="" && <option value={trainergym}>
                  {trainergym}(Gym)
            </option>
          }
          {
            trainermember.length!=0 && trainermember.map((member,index)=>(
              <option key={index} value={member.username}>{member.username}(member)</option>
            ))
          }
          {
            membergym!="" && <option value={membergym}>{membergym}(Gym)</option>
          }
          {
            membertrainer!="" && <option value={membertrainer}>{membertrainer}(Trainer)</option>
          }
        </select>
        <select
          required
          value={receiverRole}
          onChange={(e) => setReceiverRole(e.target.value)}
          className="rounded-lg border border-green-400 bg-gray-900 px-4 py-3 text-lg text-green-300"
        >
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
          <option value="member">Member</option>
        </select>

        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          rows={4}
          className="rounded-lg border border-green-400 bg-gray-900 px-4 py-3 text-lg text-green-300 resize-none"
        />

        <button
          onClick={sendNotification}
          className="w-full py-3 font-bold text-lg rounded-xl text-black bg-green-400 hover:bg-green-500 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendNotification;
