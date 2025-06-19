import React, { useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { toast, Bounce } from "react-toastify";
import { motion } from 'framer-motion';
const UpdateSuppliment = () => {
    const {id} = useParams()
    const fileInputRef = useRef();
      const [supplimentname, setSupplimentname] = useState("");
      const [category, setCategory] = useState("");
      const [brandname, setBrandname] = useState("");
      const [quantity, setquantity] = useState(0);
      const [unitType, setunitType] = useState("");
      const [itemcode, setitemcode] = useState("");
      const [price, setPrice] = useState(0);
      const [image, setimage] = useState(null);
      const [images,setimages] = useState("")
      const [imageurl,setimageurl]  = useState("")
      const handleSubmit = async(e) =>{
        const updateURL = "http://localhost:5000/suppliment/updateSuppliment"
          e.preventDefault()
          await axios.post(updateURL,{
              "quantity":quantity,
              "price":price,
              "id":id
          }).then((res)=>{
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
          }).catch((error)=>{
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
          })
      }
    useEffect(()=>{
        const getdata = async() =>{
        const URL = "http://localhost:5000/suppliment/getSupplimentbyid"
        await axios.post(URL,{
            "id":id
        }).then((res)=>{
            setSupplimentname(res.data.suppliment.supplimentName)
            setCategory(res.data.suppliment.category)
            setBrandname(res.data.suppliment.brandName)
            setquantity(res.data.suppliment.Quantity)
            setunitType(res.data.suppliment.UnitType)
            setitemcode(res.data.suppliment.ItemCode)
            setPrice(res.data.suppliment.Price)
            setimages(res.data.suppliment.image)
            const Imageurl = `http://localhost:5000/images/${res.data.suppliment.image}`
            setimageurl(Imageurl) 
            
        })
    }
    getdata()
    },[])
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
                src={`http://localhost:5000/images/${images}`}
                alt="Creatine"
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
                    Update Supplements details
                  </motion.p>
                </div>
    
                {[
                  { label: "Supplement Name", value: supplimentname,  setter: setSupplimentname, type: "text",disabled:true },
                  { label: "Brand Name", value: brandname, setter: setBrandname, type: "text",disabled:true },
                  { label: "Quantity", value: quantity, setter: setquantity, type: "number" },
                  { label: "Item Code", value: itemcode, setter: setitemcode, type: "text",disabled:true },
                  { label: "Price", value: price, setter: setPrice, type: "number" },
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
                  <p className='text-white mt-4 w-1/2'>Category</p>
                  <select value={category} disabled onChange={(e) => setCategory(e.target.value)} required className={`${inputStyles} opacity-50 cursor-not-allowed`}>
                    <option value="">Select Category</option>
                    <option value="Protein">Protein</option>
                    <option value="Pre-workout">Pre-workout</option>
                    <option value="Post-workout">Post-workout</option>
                    <option value="Creatine">Creatine</option>
                    <option value="Multivitamin">Multivitamin</option>
                  </select>
                </motion.div>
    
                <motion.div className='flex gap-2' custom={6} initial="hidden" animate="visible" variants={formVariants}>
                  <p className='text-white mt-4 w-1/2'>Unit Type</p>
                  <select value={unitType} disabled onChange={(e) => setunitType(e.target.value)} required className={`${inputStyles} opacity-50 cursor-not-allowed`}>
                    <option value="">Select Unit Type</option>
                    <option value="Bottle">Bottle</option>
                    <option value="Box">Box</option>
                    <option value="Sachet">Sachet</option>
                    <option value="Tub">Tub</option>
                    <option value="Capsules">Capsules</option>
                  </select>
                </motion.div>
    
                <motion.div className='flex gap-2' custom={7} initial="hidden" animate="visible" variants={formVariants}>
                  <p className='text-white mt-4 w-1/2'>Image</p>
                  <input
                    type="file"
                    disabled
                    ref={fileInputRef}
                    onChange={(e) => {const file = e.target.files[0];
  setimage(file);
  setimageurl(URL.createObjectURL(file));}}
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
                    Add
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
  )
}

export default UpdateSuppliment
