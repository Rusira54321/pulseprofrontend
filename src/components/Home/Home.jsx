import React from 'react';
import { motion } from 'framer-motion';

import home2 from "../Home/home2.jpg";
import home3 from "../Home/home3.jpg";
import dumbbell1 from "../Home/dumbell.png";
import dumbbell2 from "../Home/green.png";
import dumbbell3 from "../Home/yellow.png";

// Animation Configs
const imageVariants = {
  initial: { opacity: 0, scale: 0.97, rotate: -2 },
  whileInView: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 1, ease: "easeOut" },
};

const hoverEffect = {
  whileHover: {
    scale: 1.04,
    boxShadow: "0px 8px 32px 0px rgba(34,197,94,0.18)",
  },
};

const AnimatedImage = ({ src, alt, className }) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    initial={imageVariants.initial}
    whileInView={imageVariants.whileInView}
    transition={imageVariants.transition}
    whileHover={hoverEffect.whileHover}
    viewport={{ once: true }}
  />
);

const dumbbellImages = [dumbbell1, dumbbell2, dumbbell3];
const fallingDumbbells = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.random() * window.innerWidth,
  delay: Math.random() * 5,
  img: dumbbellImages[Math.floor(Math.random() * dumbbellImages.length)],
}));

const Home = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 w-full min-h-screen overflow-x-hidden overflow-y-auto">
      {/* Animated Dumbbells */}
      {fallingDumbbells.map(({ id, x, delay, img }) => (
        <motion.img
          key={id}
          src={img}
          alt="Falling Dumbbell"
          className="absolute w-6 h-6 z-0 opacity-20 pointer-events-none"
          initial={{ y: -80, rotate: 0 }}
          animate={{ y: "110vh", rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            delay,
            ease: "linear"
          }}
          style={{ left: `${x}px` }}
        />
      ))}

      {/* Modern Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-16 px-4">
        <motion.div
          className="bg-gradient-to-br from-black/80 via-gray-900/80 to-gray-800/80 backdrop-blur-md px-8 py-12 rounded-3xl shadow-2xl flex flex-col items-center max-w-2xl w-full border border-green-400/20"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-mono text-4xl md:text-6xl font-extrabold text-green-400 drop-shadow-lg tracking-tight mb-4 text-center">
            <span className="text-blue-400">Pulse</span>Pro
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium text-center max-w-xl mb-8">
            The Next Generation Gym Management Platform
          </p>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-indigo-400 text-black font-bold text-lg shadow-lg shadow-green-400/30 hover:from-green-500 hover:to-blue-500 transition-all duration-300"
          >
            Explore Features
          </motion.a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full max-w-6xl mx-auto mt-20 flex flex-col gap-16 px-4">
        {/* Feature 1 */}
        <motion.div
          className="flex flex-col-reverse md:flex-row items-center bg-gradient-to-br from-green-900/40 via-gray-900/70 to-green-800/30 rounded-2xl p-8 md:p-12 shadow-xl border border-green-400/10"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-3/5 flex flex-col items-start md:pr-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-300 mb-4 flex items-center gap-2">
              <span className="text-3xl">💡</span> All-in-One Solution
            </h2>
            <p className="text-base md:text-lg text-amber-50 font-mono leading-relaxed mb-2">
              <span className="text-green-200 font-semibold">PulsePro</span> Gym Management System streamlines and automates fitness center operations. Manage memberships, schedule classes, handle billing, and track attendance with ease.
              <br /><br />
              Includes inventory, supplier management, employee oversight, customer engagement tools, and a loyalty program. Perfect for boutique studios or large chains.
            </p>
          </div>
          <AnimatedImage
            src={home2}
            alt="Gym Feature 1"
            className="w-full md:w-2/5 max-w-[600px] h-64 md:h-80 rounded-2xl shadow-xl border-2 border-green-400/20 object-cover mb-8 md:mb-0 md:ml-0"
          />
        </motion.div>
        {/* Feature 2 */}
        <motion.div
          className="flex flex-col md:flex-row items-center bg-gradient-to-br from-blue-900/40 via-gray-900/70 to-blue-800/30 rounded-2xl p-8 md:p-12 shadow-xl border border-blue-400/10"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <AnimatedImage
            src={home3}
            alt="Gym Feature 2"
            className="w-full md:w-2/5 max-w-[600px] h-64 md:h-80 rounded-2xl shadow-xl border-2 border-blue-400/20 object-cover mb-8 md:mb-0 md:mr-0"
          />
          <div className="w-full md:w-3/5 flex flex-col items-start md:pl-10">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> Centralized Dashboard
            </h2>
            <p className="text-base md:text-lg text-amber-50 font-mono leading-relaxed mb-2">
              PulsePro centralizes all essential functions into one powerful dashboard. From member registration and automated billing to inventory tracking and staff management, everything is at your fingertips.
              <br /><br />
              Designed for scalability and ease of use, it's the perfect tool for gym owners looking to reduce manual workload and enhance business growth.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="w-full flex flex-col items-center mt-24 mb-16 z-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-gradient-to-r from-green-400 via-blue-400 to-indigo-400 px-10 py-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-2xl w-full"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 text-center">
            Ready to transform your gym?
          </h3>
          <p className="text-lg text-gray-800 mb-8 text-center">
            Join PulsePro today and experience the future of gym management.
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <a
              href="/member/login"
              className="flex-1 px-6 py-3 rounded-xl bg-black/80 text-green-300 font-bold text-lg shadow-lg hover:bg-black/90 transition-all duration-300 text-center"
            >
              Member
            </a>
            <a
              href="/login"
              className="flex-1 px-6 py-3 rounded-xl bg-black/80 text-blue-300 font-bold text-lg shadow-lg hover:bg-black/90 transition-all duration-300 text-center"
            >
              Admin
            </a>
            <a
              href="/trainer/login"
              className="flex-1 px-6 py-3 rounded-xl bg-black/80 text-indigo-300 font-bold text-lg shadow-lg hover:bg-black/90 transition-all duration-300 text-center"
            >
              Trainer
            </a>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;