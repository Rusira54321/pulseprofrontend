import React,{useState} from 'react'
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';
const GenDietplan = () => {
   const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [members,setmembers] = useState([])
  const sendtothememberURL = ""
  const memberURL = "http://localhost:5000/get/getmemberbyTrainer"
  const URL = "http://localhost:5000/ai/creatediet";
  useEffect(()=>{
    const memberusername = localStorage.getItem("trainerusername")
    const getmemebers = async() =>{
        await axios.post(memberURL,{
          "username":memberusername
        }).then((res)=>{
          setmembers(res.data.members)
        })
    }
    getmemebers()
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSchedule(null);
    try {
      const res = await axios.post(URL, {
        name,
        goal,
        level,
        weight: Number(weight),
        height: Number(height),
      });
      
      setSchedule(res.data.schedule);
    } catch (err) {
      console.error("Error generating diet plan:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const sendtothemember = () =>{
    alert("cant sent to the member")
  }
  const renderMeal = (meal) => (
    <motion.div
      key={meal.name}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mb-3 p-4 border border-gray-600 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 shadow-md"
      whileHover={{ scale: 1.03, boxShadow: "0 8px 15px rgba(72, 187, 120, 0.6)" }}
    >
      <h4 className="text-green-400 font-semibold text-lg">{meal.name}</h4>
      <p className="text-white italic mt-1">{meal.description}</p>
      <p className="text-gray-400 text-sm mt-1">
        Calories: {meal.calories} | Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fat: {meal.fat}g
      </p>
    </motion.div>
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl text-white font-extrabold tracking-wide drop-shadow-lg select-none">
          Generate Your Diet Plan
        </h1>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto bg-gray-800 bg-opacity-90 rounded-3xl p-8 shadow-2xl border border-green-500"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Form fields */}
        <label className="flex flex-col mt-6 text-white font-medium">
          <span className="mb-2 text-lg">Member Name</span>
          <select
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-green-400 bg-gray-900 px-4 py-3 text-lg text-green-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-60 transition"
          >
            <option value="" disabled>
              Select Member
            </option>
            {
              members.length!=0 && members.map((member,index)=>(
                <option key={index} value={member.username}>{member.username}</option>
              ))
            }
          </select>
        </label>
        {[
          { label: "Goal", type: "text", value: goal, setValue: setGoal, placeholder: "Your goal (e.g., Weight Loss)" },
          { label: "Weight (kg)", type: "number", value: weight, setValue: setWeight, placeholder: "Your weight in kg", min: 0 },
          { label: "Height (cm)", type: "number", value: height, setValue: setHeight, placeholder: "Your height in cm", min: 0 },
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

        {/* Level select */}
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

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          className={`mt-10 w-full py-4 font-bold text-xl rounded-xl text-black bg-green-400 shadow-lg shadow-green-500/60 ${
            loading ? "cursor-not-allowed opacity-70" : "hover:bg-green-500"
          } transition-colors duration-300`}
        >
          {loading ? "Generating your diet plan..." : "Generate Diet Plan"}
        </motion.button>
      </motion.form>

      {/* Display Diet Plan */}
      <AnimatePresence>
        {schedule && (
          <motion.div
            key="diet-plan"
            className="max-w-5xl mx-auto mt-16 bg-gray-800 bg-opacity-90 rounded-3xl p-10 shadow-2xl border border-green-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl text-green-400 font-extrabold mb-8 select-none">
              Your Personalized Diet Plan
            </h2>

            {Object.entries(schedule).map(([day, meals]) => (
              <div key={day} className="mb-10">
                <h3 className="text-2xl text-green-300 font-bold mb-5">{day}</h3>
                {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => {
                  const meal = meals[mealType];
                  if (!meal) return null;

                  if (mealType === "snacks" && Array.isArray(meal)) {
                    return (
                      <div key={mealType} className="mb-6">
                        <h4 className="text-green-400 font-semibold capitalize mb-3">{mealType}</h4>
                        <div className="ml-6">
                          {meal.map((snack, idx) => (
                            <React.Fragment key={idx}>{renderMeal(snack)}</React.Fragment>
                          ))}
                        </div>
                      </div>
                    );
                  } else if (typeof meal === "object") {
                    return (
                      <div key={mealType} className="mb-6">
                        <h4 className="text-green-400 font-semibold capitalize mb-3">{mealType}</h4>
                        <div className="ml-6">{renderMeal(meal)}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 w-full py-4 font-bold text-xl rounded-xl text-black bg-green-400 shadow-lg shadow-green-500/60 hover:bg-green-500 transition-colors duration-300"
              onClick={sendtothemember}
            >
              Send to the Member
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GenDietplan
