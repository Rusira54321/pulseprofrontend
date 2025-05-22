import './App.css'
import {ToastContainer} from "react-toastify"
import Gymdashboard from './components/gymdashboard/gymdashboard'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import {Route,Routes} from "react-router-dom"
import Email from './components/Email/Email'
import Otp from './components/Otp/Otp'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Home from './components/Home/Home'
import Homenavbar from './components/Homenavbar/Homenavbar'
import Addtrainer from './components/addtrainer/Addtrainer'
import Trainerlogin from './components/Trainerlogin/Trainerlogin'
import Memberlogin from './components/memberlogin/Memberlogin'
import Trainerdashboard from './components/trainerdashboard/Trainerdashboard'
import Addmember from './components/Addmember/Addmember'
function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Layout route with Homenavbar */}
        <Route path="/" element={<Homenavbar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='/member/login' element={<Memberlogin/>}/>
          <Route path="email" element={<Email />} />
          <Route path="otp" element={<Otp />} />
          <Route path='/trainer/login' element={<Trainerlogin/>}/>
          <Route path="reset" element={<ResetPassword />} />
        </Route>

        {/* Standalone route (not using Homenavbar) */}
        <Route path="/trainer" element={<Addtrainer/>}/>
        <Route path='/trainer/dashboard' element={<Trainerdashboard/>}/>
        <Route path="/gymdash" element={<Gymdashboard />} />
        <Route path='/addmember' element={<Addmember/>}/>
      </Routes>
    </div>
  )
}

export default App
