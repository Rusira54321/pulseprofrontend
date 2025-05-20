import './App.css'
import {ToastContainer} from "react-toastify"
import Gymdashboard from './components/gymdashboard/gymdashboard'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import {Route,Routes} from "react-router-dom"
import Email from './components/Email/Email'
import Otp from './components/Otp/Otp'
import ResetPassword from './components/ResetPassword/ResetPassword'
function App() {

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/gymdash' element={<Gymdashboard/>}/>
        <Route path='/email' element={<Email/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
