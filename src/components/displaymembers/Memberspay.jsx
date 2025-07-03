import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { motion } from 'framer-motion'
import {loadStripe} from "@stripe/stripe-js"

const Memberspay = () => {
  const navigate = useNavigate()
  const [memberplan, setmemberplan] = useState([])
  const [member, setmember] = useState({})
  const URL = "http://localhost:5000/memberplan/get"
  const memberURL = "http://localhost:5000/get/getmemberbyid"
  const [packageid, setpackageid] = useState("")
  const [packagedata, setpackagedata] = useState({})
  const packageURL = "http://localhost:5000/memberplan/getmembershipplanID"
  const [paymenttype, setpaymenttype] = useState("")
  const { id } = useParams()
    const items = [{
        "planID":"",
        "memberusername":"",
        "totalprice":"",
        "totalpriceinusd":""
    }]
    const APIKEY = "d97daff437071769fb004de9";
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/`;
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
  useEffect(() => {
    const getData = async () => {
      const key = localStorage.getItem("gymkey")
      try {
        const res = await axios.post(URL, {
          "key": key
        })
        setmemberplan(res.data.membershipPlan || [])
      } catch (err) {
        console.error("Failed to fetch membership plans", err)
      }
    }
    getData()
    const getmember = async () => {
      await axios.post(memberURL, {
        "id": id
      }).then((res) => {
        setmember(res.data.member)
      })
    }
    getmember()
  }, [id])

  useEffect(() => {
    const getplanData = async () => {
      if (!packageid) {
        setpackagedata({})
        return
      }
      await axios.post(packageURL, {
        "planID": packageid
      }).then((res) => {
        setpackagedata(res.data.membership)
      }).catch((error)=>{
        console.log("pakaya")
      })
    }
    getplanData()
  }, [packageid])
  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(paymenttype=="Cash")
    {
       items[0].planID =packageid 
        items[0].memberusername = member.username
        items[0].totalprice = packagedata.price
        navigate(`/member/cashpayment`,{state:{details:items}})

    }else if(paymenttype=="Card")
    {
        const priceinUSD = await convertCurrency("LKR", "USD", packagedata.price)
        items[0].planID =packageid 
        items[0].memberusername = member.username
        items[0].totalprice = packagedata.price
        items[0].totalpriceinusd = priceinUSD
        const stripe = await loadStripe("pk_test_51Rftx6KuSK8YHgFWvFScCIjTzIdBryqtqLp0fslQu7jFIOJSNezU8UgDOBxvuQ36pWD0jn3JUgZFN6EUoQSm99Zk00kN1GNJIk");
          const res = await axios.post(`http://localhost:5000/stripes/memberpayment`,{
              items:items
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
    }
  }
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-amber-100 via-gray-900 to-black justify-center items-center px-4 py-8">
      <motion.div
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-amber-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Member Payment
        </motion.h2>
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Member Username</label>
            <select value={member.username} disabled className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 border border-gray-300 cursor-not-allowed">
              <option value={member.username}>{member.username}</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Package ID</label>
            <select required onChange={(e) => { setpackageid(e.target.value) }} className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition">
              <option value="">Choose package ID</option>
              {memberplan.length !== 0 && memberplan.map((memberp, index) => (
                <option value={memberp.PlanID} key={index}>{memberp.PlanID}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Price</label>
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300">{packagedata.price ? `Rs ${packagedata.price}` : '--'}</div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Select Payment Type</label>
            <select required onChange={(e) => { setpaymenttype(e.target.value) }} className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition">
              <option value="">Choose payment type</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>
          <motion.button
            type='submit'
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-2 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-lg shadow-lg transition-all"
          >
            Checkout
          </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default Memberspay
