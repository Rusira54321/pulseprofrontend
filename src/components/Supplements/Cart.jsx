import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, Bounce } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {loadStripe} from "@stripe/stripe-js"

const Cart = () => {
  const [supplementsdata, setsupplementsdata] = useState([]);
  const [cartdata, setcartdata] = useState([]); // fix typo: setcarddata -> setcartdata
  const [itemquantity, setitemquantity] = useState([]);
  const [totalprices, setTotalPrices] = useState([]);
  const [members, setmembers] = useState([]);
  const [paymenttype, setPaymentType] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const URL = "http://localhost:5000/suppliment/getsupplementsbyids";
  const getmemberURL = "http://localhost:5000/get/getmembers";
  const APIKEY = "d97daff437071769fb004de9";
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/`;
  const navigate = useNavigate()
  // convert the supplements price to the USD
  const convertCurrency = async (from, to, amount) => {
    try {
      const response = await axios.get(`${BASE_URL}${from}`);
      const rate = response.data.conversion_rates[to];
      if (!rate) {
        console.log(`Exchange rate for ${to} not found.`);
        return 0;
      }
      var convertedAmount = parseFloat((amount * rate).toFixed(2));
      return convertedAmount;
    } catch (error) {
      console.error("Error fetching exchange rate:", error.message);
      return 0;
    }
  };

  // checkout function to handle the checkout process
  const checkout = async (e) => {
    e.preventDefault();
    const suppliments = supplementsdata;
    let newCartData = [];
    for (let i = 0; i < suppliments.length; i++) {
      if(itemquantity[i]<=0 || itemquantity[i] === undefined || itemquantity[i] === null)
      {
         toast.error("quantity must be greater that 0", {
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
                  return
      }
      newCartData.push({
        ItemCode: suppliments[i].ItemCode,
        price: suppliments[i].Price,
        Quantity: itemquantity[i],
        priceinUSD: await convertCurrency("LKR", "USD", suppliments[i].Price),
        image: suppliments[i].image,
        supplimentName: suppliments[i].supplimentName,
        customer: selectedMember
      });
    }
    setcartdata(newCartData);
    if (newCartData.length === 0) {
      toast.error("No items in the cart", {
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
      return;
    }
    if(paymenttype=="Cash")
    {
        navigate(`/cash`,{state:{cart:newCartData}})
        return
    }
    else if(paymenttype=="Card")
    {
        var gymkey = localStorage.getItem("gymkey")
         const stripe = await loadStripe("pk_test_51Rftx6KuSK8YHgFWvFScCIjTzIdBryqtqLp0fslQu7jFIOJSNezU8UgDOBxvuQ36pWD0jn3JUgZFN6EUoQSm99Zk00kN1GNJIk");
          const res = await axios.post(`http://localhost:5000/stripes/create-checkout-session`,{
              items:newCartData,
              key:gymkey
          })
          const session = await res.data;
          const result = await stripe.redirectToCheckout({
            sessionId:session.id
          })
          if(result.error)
          {
            console.log(result.error);
            alert(result.error.message)
          }
          
          setsupplementsdata([])
          setcartdata([])
          setitemquantity([])
          setTotalPrices([])
          setmembers([])
          setPaymentType('')
          setSelectedMember('')
    }
  };

  useEffect(() => {
    const itemsid = JSON.parse(localStorage.getItem("cartItems"));
    const getsupplementsdata = async () => {
      if (!itemsid || !Array.isArray(itemsid) || itemsid.length === 0) {
        setsupplementsdata([]);
        return;
      }
      await axios.post(URL, { ids: itemsid }).then((res) => {
        setsupplementsdata(res.data.supplements);
      });
    };
    getsupplementsdata();

    const getmember = async () => {
      await axios.post(getmemberURL, {
        key: localStorage.getItem("gymkey")
      }).then((res) => {
        setmembers(res.data.member);
      });
    };
    getmember();
  }, []);

  const settotalprice = (index, quantity, unitprice) => {
    // Ensure quantity is a number and at least 1
    const qty = Math.max(1, Number(quantity) || 1);
    // Update itemquantity
    const updatedQuantities = [...itemquantity];
    updatedQuantities[index] = qty;
    setitemquantity(updatedQuantities);
    // Update totalprices
    const updatedTotals = [...totalprices];
    updatedTotals[index] = qty * unitprice;
    setTotalPrices(updatedTotals);
  };

  const handleRemove = (index, id) => {
    // Remove from supplementsdata
    const updatedSupplements = supplementsdata.filter((_, i) => i !== index);
    setsupplementsdata(updatedSupplements);
    // Remove from itemquantity
    const updatedItemQuantity = itemquantity.filter((_, i) => i !== index);
    setitemquantity(updatedItemQuantity);
    // Remove from totalprices
    const updatedTotals = totalprices.filter((_, i) => i !== index);
    setTotalPrices(updatedTotals);
    // Remove from cartdata
    const updatedCartData = cartdata.filter((_, i) => i !== index);
    setcartdata(updatedCartData);
    // Remove from localStorage
    const itemsid = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedIds = itemsid.filter(itemId => itemId !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedIds));
  };

  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-900'>
      <motion.div
        className='flex justify-center gap-4 items-center mt-8 mb-8'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="flex items-center justify-center bg-green-700 hover:bg-green-800 rounded-full p-3 transition">
          <ShoppingCart className="w-7 h-7 text-white" />
        </span>
        <h1 className='text-white text-3xl font-bold'>My cart</h1>
      </motion.div>

      <div className='flex flex-col lg:flex-row gap-5 w-full px-4 pb-10'>
        {/* LEFT SIDE: Items */}
        <motion.div
          className='flex flex-col gap-y-3 w-full lg:w-3/4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {
            supplementsdata.length === 0 ? (
              <p className='text-gray-400 text-lg font-semibold'>No items in the cart</p>
            ) : (
              supplementsdata.map((item, index) => (
                <motion.div
                  key={index}
                  className='flex flex-col md:flex-row bg-gray-800 rounded-xl p-4 gap-6 md:gap-x-8 items-center shadow-lg'
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className='w-full md:w-1/8 flex-shrink-0 flex justify-center'>
                    <img className="w-[110px] h-[110px] md:w-[125px] md:h-[125px] rounded-xl object-cover" src={`http://localhost:5000/images/${item.image}`} />
                  </div>

                  <div className='flex flex-col gap-y-1 w-full md:w-2/8'>
                    <h2 className='text-white font-semibold text-lg'>{item.supplimentName}</h2>
                    <p className='text-gray-400 text-sm'>Item code: {item.ItemCode}</p>
                    {
                      item.Quantity > 0 ? (
                        <p className='text-green-400 font-semibold text-sm'>In Stock</p>
                      ) : (
                        <p className='text-red-400 font-semibold text-sm'>Out of stock</p>
                      )
                    }
                    <button 
                      className='text-red-400 text-sm mt-2 w-0 hover:underline'
                      onClick={() => handleRemove(index, item._id)}
                    >Remove</button>
                  </div>

                  <div className='flex flex-col w-full md:w-2/8 items-center md:items-start'>
                    <h2 className='text-white font-semibold text-sm'>Each</h2>
                    <p className='text-yellow-300 text-lg'>Rs. {item.Price}</p>
                  </div>

                  <div className='flex flex-col w-full md:w-2/8 gap-y-2 items-center md:items-start'>
                    <h2 className='text-white font-semibold text-sm'>Quantity</h2>
                    <input
                      type='number'
                      onChange={(e) => settotalprice(index, e.target.value, item.Price)}
                      className='w-[70px] border-2 border-yellow-500 bg-gray-700 text-white text-center rounded-md'
                      max={item.Quantity}
                      min={1}
                    />
                  </div>

                  <div className='flex flex-col w-full md:w-1/8 items-center md:items-start'>
                    <h2 className='text-white font-semibold text-sm'>Total</h2>
                    {
                      totalprices[index] > 0 && (
                        <p className='text-green-300 font-semibold'>Rs. {totalprices[index]}</p>
                      )
                    }
                  </div>
                </motion.div>
              ))
            )
          }
        </motion.div>

        {/* RIGHT SIDE: Cart Summary */}
        <motion.div
          className='flex flex-col gap-y-4 w-full lg:w-1/4 h-fit bg-gray-800 p-5 rounded-xl shadow-xl mt-8 lg:mt-0'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className='text-white font-bold text-lg border-b pb-2'>Cart Summary</h2>
          <div className='flex justify-between text-gray-300'>
            <span>Total Price:</span>
            <span>Rs. {totalprices.reduce((acc, curr) => acc + (curr || 0), 0)}</span>
          </div>
          <form onSubmit={(e) => {checkout(e)}}>
          <div>
            <label className='text-sm text-gray-300 block mb-1'>Select Member</label>
            <select
            required
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className='w-full p-2 rounded-md bg-gray-700 text-white border border-yellow-500'
            >
              <option value="">-- Select Member --</option>
              {
                members.map((m, i) => (
                  <option key={i} value={m.username}>{m.name} ({m.username})</option>
                ))
              }
            </select>
        </div>
       
        <div>
            <label className='text-sm text-gray-300 block mb-1'>Select Payment type</label>
            <select required
              value={paymenttype}
              onChange={(e) => setPaymentType(e.target.value)}
              className='w-full mt-1  p-2 rounded-md bg-gray-700 text-white border border-yellow-500'
            >
              <option value="">-- Select Payment type --</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
            </select>
         </div> 
         <button
         type='submit'
            className='w-full mt-4 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg transition duration-200 shadow-lg'
         >
            Checkout
         </button>
         </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
