import React from 'react';
import { motion } from 'framer-motion';

import home from "../Home/home.jpg";
import home2 from "../Home/home2.jpg";
import home3 from "../Home/home3.jpg";
import dumbbell1 from "../Home/dumbell.png";
import dumbbell2 from "../Home/green.png";
import dumbbell3 from "../Home/yellow.png";

// Animation Configs
const imageVariants = {
  initial: { opacity: 0, scale: 0.95, rotate: -2 },
  whileInView: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 1, ease: "easeOut" },
};

const hoverEffect = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0px 8px 24px rgba(255, 255, 255, 0.2)",
  },
};

// Reusable Animated Image Component
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

// Dumbbell animation setup
const dumbbellImages = [dumbbell1, dumbbell2, dumbbell3];
const fallingDumbbells = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * window.innerWidth,
  delay: Math.random() * 5,
  img: dumbbellImages[Math.floor(Math.random() * dumbbellImages.length)],
}));

const Home = () => {
  return (
    <div className='relative bg-gray-900 w-full overflow-hidden'>

      {/* Falling Dumbbells */}
      {fallingDumbbells.map(({ id, x, delay, img }) => (
        <motion.img
          key={id}
          src={img}
          alt="Falling Dumbbell"
          className="absolute w-10 h-10 z-0 opacity-30"
          initial={{ y: -100, rotate: 0 }}
          animate={{ y: "120vh", rotate: 360 }}
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

      {/* Hero Image */}
      <motion.div
        className='z-10 relative'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <AnimatedImage
          src={home}
          alt="Gym Banner"
          className="w-full h-170"
        />
      </motion.div>

      {/* Title */}
      <motion.div
        className='flex w-full justify-center z-10 relative'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className='font-mono text-3xl font-bold mt-10 mb-10 text-white'>
          <span className='text-blue-400'>Pulse</span>Pro
        </p>
      </motion.div>

      {/* Section 1 */}
      <div className='flex w-full gap-10 z-10 relative'>
        <AnimatedImage
          src={home2}
          alt="Gym Feature 1"
          className='ml-8 w-1/2 rounded-2xl mb-5'
        />
        <motion.p
          className='w-1/2 mt-10 mr-10 text-amber-50 font-mono'
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          PulsePro Gym Management System is an all-in-one solution designed to streamline and automate fitness center operations. Built with modern technology, PulsePro offers an intuitive interface for managing memberships, scheduling classes, handling billing, and tracking attendance. The system includes powerful features such as inventory and supplier management, employee oversight, customer engagement tools, and a comprehensive loyalty program.

          Whether you're running a boutique studio or a large fitness chain, PulsePro empowers gym owners and staff to deliver exceptional service, improve operational efficiency, and grow their business with data-driven insights. With PulsePro, managing your gym has never been easier, faster, or more effective.
        </motion.p>
      </div>

      {/* Section 2 */}
      <div className='flex w-full gap-10 z-10 relative'>
        <motion.p
          className='w-1/2 ml-8 mt-40 mb-50 text-amber-50 font-mono'
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          PulsePro is a comprehensive gym management platform built to optimize the day-to-day operations of fitness centers. From member registration and automated billing to inventory tracking and staff management, PulsePro centralizes all essential functions into one powerful dashboard. Designed for scalability and ease of use, it's the perfect tool for gym owners looking to reduce manual workload and enhance business growth.
        </motion.p>
        <AnimatedImage
          src={home3}
          alt="Gym Feature 2"
          className='w-1/2 mt-20 rounded-2xl mb-40 mr-10'
        />
      </div>
    </div>
  );
};

export default Home;
