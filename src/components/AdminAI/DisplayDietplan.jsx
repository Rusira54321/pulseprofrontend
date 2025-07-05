import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DisplayDietplan = () => {
  const [dietplans, setDietplans] = useState([]);
  const getdietplanURL = "http://localhost:5000/ai/getaibaseddietplan";
  const deleteURL = "http://localhost:5000/ai/deletediet"
  useEffect(() => {
    const username = localStorage.getItem("memberkey");
    const getdietplans = async () => {
      try {
        const res = await axios.post(getdietplanURL, {
          "username": username
        });
        setDietplans(res.data.dietplans);
      } catch (err) {
        console.error("Failed to fetch diet plans:", err);
      }
    };
    getdietplans();
  }, []);
  const deletedietplan = async() =>{
    const username = localStorage.getItem("memberkey")
    await axios.post(deleteURL,{
        "username":username
    }).then((res)=>{
        alert(res.data.message)
    })
  }
  const renderMeal = (meal, index) => (
    <motion.div
      key={index}
      className="mb-3 p-4 border border-green-500/40 rounded-xl bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px #22c55e33" }}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      <h4 className="text-green-400 font-bold text-lg tracking-wide flex items-center gap-2">
        🥗 {meal.name}
      </h4>
      <p className="italic text-gray-200 mt-1">{meal.description}</p>
      <p className="text-xs text-green-300 mt-2">
        <span className="font-semibold">Calories:</span> {meal.calories} &nbsp;|&nbsp; 
        <span className="font-semibold">Protein:</span> {meal.protein}g &nbsp;|&nbsp; 
        <span className="font-semibold">Carbs:</span> {meal.carbs}g &nbsp;|&nbsp; 
        <span className="font-semibold">Fat:</span> {meal.fat}g
      </p>
    </motion.div>
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-10">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-green-400 mb-12 drop-shadow-lg tracking-tight select-none"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        Your AI-Based Diet Plans
      </motion.h1>

      {dietplans.length === 0 ? (
        <motion.p
          className="text-white text-center text-lg mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          No diet plans found.
        </motion.p>
      ) : (
        dietplans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 mb-12 border border-green-500/70 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.01, boxShadow: "0 8px 32px #22c55e33" }}
          >
            <h2 className="text-2xl md:text-3xl text-green-300 font-extrabold mb-4 flex items-center gap-2">
              🥗 Plan {index + 1} — <span className="font-bold">{plan.duration} {plan.durationUnit}(s)</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mb-6">Created on: {new Date(plan.createddata).toLocaleDateString()}</p>

            {Object.entries(plan.dietplan).map(([day, meals]) => (
              <motion.div
                key={day}
                className="mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.1, type: 'spring' }}
              >
                <h3 className="text-xl md:text-2xl text-green-400 font-bold mb-3 flex items-center gap-2">
                  <span className="text-lg">📅</span> {day}
                </h3>
                {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => {
                  const meal = meals[mealType];
                  if (!meal) return null;

                  if (mealType === "snacks" && Array.isArray(meal)) {
                    return (
                      <div key={mealType} className="ml-4">
                        <h4 className="text-green-500 font-semibold capitalize mb-2 flex items-center gap-1">🍏 {mealType}</h4>
                        {meal.map((snack, i) => renderMeal(snack, i))}
                      </div>
                    );
                  } else if (typeof meal === "object") {
                    return (
                      <div key={mealType} className="ml-4">
                        <h4 className="text-green-500 font-semibold capitalize mb-2 flex items-center gap-1">🍏 {mealType}</h4>
                        {renderMeal(meal, 0)}
                      </div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 w-full py-3 font-bold text-lg rounded-xl text-white bg-gradient-to-r from-red-500 via-pink-500 to-red-600 shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors duration-300 border border-red-400/40"
              onClick={deletedietplan}
            >
              Delete
            </motion.button>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default DisplayDietplan;

