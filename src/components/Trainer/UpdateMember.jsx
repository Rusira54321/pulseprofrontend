import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import axios from "axios"
import { toast, Bounce } from "react-toastify"
import { useEffect } from 'react';
import { useState } from 'react';
// ... your imports remain the same

const UpdateMember = () => {
  const [image, setimage] = useState("");
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [height, setheight] = useState(0);
  const [weight, setweight] = useState(0);
  const [trainer, setTrainer] = useState("");
  const { id, gym } = useParams();

  useEffect(() => {
    const URL = "http://localhost:5000/get/getmemberbyid";
    const getmember = async () => {
      await axios.post(URL, {
        id: id,
      }).then((res) => {
        setimage(res.data.member.profileimage);
        setname(res.data.member.name);
        setUsername(res.data.member.username);
        setPassword(res.data.member.password);
        setheight(res.data.member.heightincm);
        setweight(res.data.member.weightinkg);
        setTrainer(res.data.member.trainer);
      });
    };
    getmember();

    const getdetails = async () => {
      const URLs = "http://localhost:5000/trainer/gettrainerbytrainer";
      await axios.post(URLs, {
        key: gym
      }).then((res) => {
        setdata(res.data.trainers);
      }).catch((error) => {
        console.log(error);
      });
    };
    getdetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:5000/get/updatemember";
    await axios.post(URL, {
      id: id,
      password: password,
      heightCM: height,
      weightKG: weight,
      trainer: trainer
    }).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
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

  const inputStyles = "w-1/2 mr-15 mt-4 px-4 py-2 rounded-xl border border-gray-400 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out";

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
     <div className='flex justify-center items-center w-full h-screen bg-gray-800'>
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className='w-4/5 bg-gray-200 h-[85%] flex rounded-2xl shadow-2xl'
             >
               <motion.div
                 initial={{ y: -50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 1.2, ease: "easeOut" }}
                 className='w-1/2 h-full bg-amber-200 rounded-l-2xl flex'
               >
                 <motion.img
                   src={`http://localhost:5000/images/${image}`}
                   alt="trainer Profile"
                   className='w-full h-full object-cover rounded-l-2xl'
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 200 }}
                 />
               </motion.div>
       
               <motion.div
                 initial={{ x: 100, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ duration: 1, delay: 0.2 }}
                 className='w-3/4 h-full bg-gray-900 rounded-r-2xl p-6 overflow-y-auto'
               >
                 <form onSubmit={handleSubmit} className='flex flex-col'>
                   <div className='flex justify-center mb-6'>
                     <motion.p
                       className='font-mono text-4xl text-white mt-2'
                       initial={{ y: -20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ duration: 0.6, delay: 0.4 }}
                     >
                       Update Member details
                     </motion.p>
                   </div>
       
                   {[
                     { label: "Name", value: name,  setter: setname, type: "text",disabled:true},
                     { label: "User Name", value: username, setter:setUsername , type: "text",disabled:true},
                     { label: "Password", value: password, setter:setPassword , type: "password" },
                     { label: "Height in CM", value: height, setter:setheight , type: "number" },
                     { label: "Weight in KG", value: weight, setter:setweight, type: "number" },
                   ].map((field, index) => (
                     <motion.div
                       key={index}
                       className='flex gap-2'
                       custom={index}
                       initial="hidden"
                       animate="visible"
                       variants={formVariants}
                     >
                       <p className='text-white mt-4 w-1/2'>{field.label}</p>
                       <input
                         type={field.type}
                         value={field.value}
                         disabled={field.disabled}
                         onChange={(e) => field.setter(e.target.value)}
                         required
                           className={`${inputStyles} ${field.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                       />
                     </motion.div>
                   ))}
       
                   <motion.div className='flex gap-2' custom={5} initial="hidden" animate="visible" variants={formVariants}>
                     <p className='text-white mt-4 w-1/2'>Trainer</p>
                     <select value={trainer}  onChange={(e) => setTrainer(e.target.value)} required className={`${inputStyles} `}>
                       <option value="">Select Trainer</option>
                        {data.map((data)=>(
                                       <option key={data._id} value={data.name} className='bg-gray-800'>
                                               {data.name}
                                       </option>
                                   ))}
                     </select>
                   </motion.div>
       
             
       
                   <motion.div className='flex gap-2' custom={7} initial="hidden" animate="visible" variants={formVariants}>
                     <p className='text-white mt-4 w-1/2'>Profile</p>
                     <input
                       type="file"
                       disabled
                       
                      
                       required
                       className="mt-4 ml-15 w-full text-sm text-white file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-600 file:text-white
                       hover:file:bg-blue-700 transition-all duration-300 ease-in-out"
                     />
                   </motion.div>
       
                   <motion.div
                     className='flex'
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 1.2 }}
                   >
                     <motion.button
                       whileTap={{ scale: 0.9 }}
                       whileHover={{ scale: 1.1 }}
                       type="submit"
                       className='mt-7 ml-60 h-10 w-24 bg-gradient-to-r cursor-pointer from-green-400 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform duration-300 ease-in-out'
                     >
                       Update
                     </motion.button>
                   </motion.div>
                 </form>
               </motion.div>
             </motion.div>
           </div>
  );
};

export default UpdateMember;
