import React, { useEffect, useState } from 'react';
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Added
import { toast, Bounce } from "react-toastify"

const AddTraining = () => {
  const [members, setmembers] = useState([]);
  const [classes, setclass] = useState({
    memberUsername: [""],
    trainerusername: "",
    classname: "",
    date: "",
    newstartTime: "",
    newendTime: "",
    Description: ""
  });

  const URL = "http://localhost:5000/get/getmemberbyTrainer";

  useEffect(() => {
    const getmembers = async () => {
      const username = localStorage.getItem("trainerusername");
      await axios.post(URL, { username })
        .then((res) => {
          setmembers(res.data.members);
        });
    };
    getmembers();
  }, []);

  const addmember = (index, value) => {
    const memberarray = classes.memberUsername;
    memberarray[index] = value;
    setclass({
      ...classes,
      memberUsername: memberarray
    });
  };

  const addmembers = (e) => {
    e.preventDefault();
    const memberarray = classes.memberUsername;
    memberarray.push("");
    setclass({
      ...classes,
      memberUsername: memberarray
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(classes);
    const trainerusername = localStorage.getItem("trainerusername");
    await axios.post("http://localhost:5000/class/addclasses", {
      "memberUsername": classes.memberUsername,
      "trainerusername": trainerusername,
      "classname": classes.classname,
      "date": classes.date,
      "newstartTime": classes.newstartTime,
      "newendTime": classes.newendTime,
      "Description": classes.Description
    }).then((res) => {
      toast.success(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
              transition: Bounce,
            });
      setclass({
        memberUsername: [""],
        trainerusername: "",
        classname: "",
        date: "",
        newstartTime: "",
        newendTime: "",
        Description: ""
      });
    }).catch((error) => {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    });
  };

  return (
    <motion.div
      className='flex flex-col min-h-screen w-full bg-gray-900 px-4 py-8 text-white'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='flex justify-center mb-10'
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-4xl font-bold text-amber-400'>Add Training Session</h1>
      </motion.div>

      <div className='flex justify-center'>
        <motion.form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full max-w-xl bg-gray-800 p-6 rounded-2xl shadow-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Class Name */}
          <div className='flex flex-col'>
            <label className='text-lg mb-1'>Class Name</label>
            <input
              required
              value={classes.classname}
              type='text'
              placeholder='Enter class name'
              onChange={(e) => setclass({ ...classes, classname: e.target.value })}
              className='px-4 py-2 rounded-lg border border-amber-300 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400'
            />
          </div>

          {/* Date */}
          <div className='flex flex-col'>
            <label className='text-lg mb-1'>Date</label>
            <input
              required
              value={classes.date}
              type='date'
              onChange={(e) => setclass({ ...classes, date: e.target.value })}
              className='px-4 py-2 rounded-lg border border-amber-300 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400'
            />
          </div>

          {/* Start Time */}
          <div className='flex flex-col'>
            <label className='text-lg mb-1'>Start Time</label>
            <input
              required
              value={classes.newstartTime}
              type='time'
              onChange={(e) => setclass({ ...classes, newstartTime: e.target.value })}
              className='px-4 py-2 rounded-lg border border-amber-300 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400'
            />
          </div>

          {/* End Time */}
          <div className='flex flex-col'>
            <label className='text-lg mb-1'>End Time</label>
            <input
              required
              type='time'
              value={classes.newendTime}
              onChange={(e) => setclass({ ...classes, newendTime: e.target.value })}
              className='px-4 py-2 rounded-lg border border-amber-300 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400'
            />
          </div>

          {/* Description */}
          <div className='flex flex-col'>
            <label className='text-lg mb-1'>Description</label>
            <textarea
              required
              value={classes.Description}
              rows='3'
              placeholder='Write session details...'
              onChange={(e) => setclass({ ...classes, Description: e.target.value })}
              className='px-4 py-2 rounded-lg border border-amber-300 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400'
            />
          </div>

          {/* Members */}
          <div className='flex flex-col'>
            <label className='text-lg mb-1'>Add Students</label>
            {classes.memberUsername.map((member, memberindex) => (
              <select
                key={memberindex}
                onChange={(e) => addmember(memberindex, e.target.value)}
                required
                className='mt-3 px-4 py-2 rounded-lg border border-amber-300 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-amber-400'
              >
                <option className='bg-gray-800' value="">Choose student</option>
                {members.length !== 0 && members.map((member, index) => (
                  <option key={index} value={member.username} className='bg-gray-800'>
                    {member.username}
                  </option>
                ))}
              </select>
            ))}
            <motion.button
              onClick={addmembers}
              whileHover={{ scale: 1.05 }}
              className='mt-4 w-fit bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg self-start transition duration-300'
            >
              + Add Member
            </motion.button>
          </div>

          {/* Submit Button */}
          <motion.button
            type='submit'
            whileHover={{ scale: 1.05 }}
            className='mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition duration-300'
          >
            Add Session
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default AddTraining;
