import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const Memberstats = () => {
    const { id } = useParams()
    const [membersdata, setmembersdata] = useState([])
    const URL = `http://localhost:5000/class/getmembersdata/${id}`
    useEffect(() => {
        const getmembersdata = async () => {
            await axios.get(URL).then((res) => {
                setmembersdata(res.data.members)
                console.log(res.data.members)
            })
        }
        getmembersdata()
    }, [])
    return (
        <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4 py-10 text-white">
            <div className="flex justify-center items-center py-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 drop-shadow-lg tracking-tight animate-fade-in">
                    Students Data
                </h1>
            </div>
            <div className="flex flex-col items-center w-full">
                {membersdata.length === 0 ? (
                    <p className="text-white text-lg animate-pulse">No members found for this class.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
                        <AnimatePresence>
                            {membersdata.map((member, index) => (
                                <Link to={`/update/members/${member._id}`} key={index}>
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 40 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(251,191,36,0.25)' }}
                                    className="relative bg-white/10 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4 border-2 border-amber-400/60 hover:border-pink-400/80 hover:bg-white/20 transition-all duration-300 cursor-pointer group overflow-hidden"
                                >
                                    <img
                                        src={`http://localhost:5000/images/${member.profileimage}`}
                                        alt={member.username}
                                        className="w-28 h-28 rounded-full mb-2 border-4 border-amber-300 shadow-lg object-cover bg-gray-200"
                                    />
                                    <h2 className="text-xl font-bold text-amber-200 mb-1 tracking-wide z-10">{member.username}</h2>
                                    <div className="flex flex-col gap-1 text-base z-10 w-full items-center">
                                        <span className="text-gray-200"><span className="font-semibold text-amber-300">Height:</span> {member.heightincm} cm</span>
                                        <span className="text-gray-200"><span className="font-semibold text-amber-300">Weight:</span> {member.weightinkg} kg</span>
                                    </div>
                                </motion.div>
                                </Link>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Memberstats
