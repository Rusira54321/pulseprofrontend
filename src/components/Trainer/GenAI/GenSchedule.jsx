import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


const GenSchedule = () => {
  const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [day, setDay] = useState("");
    const [level, setLevel] = useState("");
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const URL = "http://localhost:5000/ai/createSchedule";
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await axios.post(URL, {
          name,
          goal,
          level,
          height,
          weight,
          daysAvailable: day,
        });
        setSchedule(res.data.schedule);
      } catch (err) {
        console.error("Error generating schedule:", err);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
        {/* Title */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl text-white font-extrabold tracking-wide drop-shadow-lg select-none">
            Generate Your Workout Schedule
          </h1>
        </motion.div>
  
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto bg-gray-800 bg-opacity-90 rounded-3xl p-8 shadow-2xl border border-green-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {[
            {
              label: "Name",
              type: "text",
              value: name,
              setValue: setName,
              placeholder: "Your name",
            },
            {
              label: "Goal",
              type: "text",
              value: goal,
              setValue: setGoal,
              placeholder: "Your goal (e.g., Weight Loss)",
            },
            {
              label: "Weight (kg)",
              type: "number",
              value: weight,
              setValue: setWeight,
              placeholder: "Your weight in kg",
              min: 0,
            },
            {
              label: "Height (cm)",
              type: "number",
              value: height,
              setValue: setHeight,
              placeholder: "Your height in cm",
              min: 0,
            },
            {
              label: "Days available",
              type: "text",
              value: day,
              setValue: setDay,
              placeholder: "Use ',' between days (e.g., Monday,Wednesday)",
            },
          ].map(({ label, type, value, setValue, placeholder, min }) => (
            <label key={label} className="flex flex-col mt-6 text-white font-medium">
              <span className="mb-2 text-lg">{label}</span>
              <input
                type={type}
                required
                value={value}
                min={min}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="rounded-lg border border-green-400 bg-gray-900 px-4 py-3 text-lg placeholder-green-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-60 transition"
              />
            </label>
          ))}
  
          {/* Fitness Level Select */}
          <label className="flex flex-col mt-6 text-white font-medium">
            <span className="mb-2 text-lg">Fitness Level</span>
            <select
              required
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="rounded-lg border border-green-400 bg-gray-900 px-4 py-3 text-lg text-green-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-60 transition"
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
  
          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className={`mt-10 w-full py-4 font-bold text-xl rounded-xl text-black bg-green-400 shadow-lg shadow-green-500/60 ${
              loading ? "cursor-not-allowed opacity-70" : "hover:bg-green-500"
            } transition-colors duration-300`}
          >
            {loading ? "Generating your workout plan..." : "Generate Workout Plan"}
          </motion.button>
        </motion.form>
  
        {/* Schedule Output */}
        {schedule && (
          <motion.div
            className="mt-12 w-full max-w-5xl mx-auto bg-gray-900 rounded-3xl p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-green-400 mb-6">Your Workout Schedule</h2>
            {Object.entries(schedule).map(([day, details]) => (
              <div key={day} className="mb-10">
                <h3 className="text-2xl font-semibold text-white mb-3">{day}: {details.Title}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {details.exercises.map((ex, idx) => (
                    <li key={idx} className="text-green-200">
                      <span className="font-medium">{ex.name}</span> -{" "}
                      {ex.duration
                        ? `${ex.duration} ${ex.unit || "minutes"} (${ex.intensity || ""})`
                        : `Sets: ${ex.sets}, Reps: ${ex.reps}, Rest: ${ex.rest} sec`}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    );
}

export default GenSchedule
