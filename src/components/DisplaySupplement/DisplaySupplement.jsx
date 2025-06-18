import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { motion } from "framer-motion";

const DisplaySupplement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nutritions, setNutritions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const URL = "http://localhost:5000/suppliment/getsuppliment";

  useEffect(() => {
    const key = localStorage.getItem("gymkey");
    axios.post(URL, { key })
      .then((res) => {
        setNutritions(res.data.suppliment);
      })
      .catch((err) => {
        console.error("Error fetching supplements", err);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplement?")) {
      await axios.delete(`http://localhost:5000/suppliment/deleteSuppliment/${id}`)
        .then((res) => {
          setNutritions(nutritions.filter((item) => item._id !== id));
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/update-supplement/${id}`;
  };

  const handlePay = (id) => {
    window.location.href = `/pay-supplement/${id}`;
  };

  const filteredSupplements = nutritions.filter((item) =>
    item.supplimentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(item.category))
  );

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8 text-white">
      <motion.div
        className="flex p-5 items-center mb-5 justify-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold">Supplements</h1>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="max-w-4xl mx-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search supplements..."
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {["Protein", "Pre-workout", "Post-workout", "Creatine", "Multivitamin"].map((category, i) => (
          <motion.label
            key={category}
            className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1 rounded-md cursor-pointer hover:bg-yellow-600 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategories((prev) =>
                  prev.includes(value)
                    ? prev.filter((cat) => cat !== value)
                    : [...prev, value]
                );
              }}
              className="form-checkbox accent-yellow-400"
            />
            {category}
          </motion.label>
        ))}
      </motion.div>

      {/* Clear Filters Button */}
      {selectedCategories.length > 0 && (
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setSelectedCategories([])}
            className="text-yellow-300 text-sm hover:underline transition"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Supplement Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredSupplements.map((supplement, index) => (
          <motion.div
            key={supplement._id}
            className="bg-gray-800 rounded-xl p-4 shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img
              src={`http://localhost:5000/images/${supplement.image}`}
              alt={supplement.supplimentName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-semibold">{supplement.supplimentName}</h3>
              <span className={`text-sm ${supplement.Quantity <= 0 ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                {supplement.Quantity <= 0 ? 'Out of Stock' : `Qty: ${supplement.Quantity}`}
              </span>
            </div>

            <p className="text-gray-400">{supplement.brandName}</p>
            <p className="text-gray-400">{supplement.category}</p>
            <p className="text-yellow-400 mt-2 font-bold">Rs. {supplement.Price}</p>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2 flex-wrap">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleDelete(supplement._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
              >
                Delete
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleUpdate(supplement._id)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
              >
                Update
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handlePay(supplement._id)}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
              >
                Pay
              </motion.button>
            </div>
          </motion.div>
        ))}
        {filteredSupplements.length === 0 && (
          <motion.p
            className="col-span-full text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            No supplements found
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default DisplaySupplement;
