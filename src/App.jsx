import './App.css'
import {ToastContainer} from "react-toastify"
import Gymdashboard from './components/gymdashboard/Gymdashboard'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import {Route,Routes} from "react-router-dom"
import Cart from './components/Supplements/Cart'
import Notifications from './Notifications'
import UpdateTrainer from "./components/displaytrainer/UpdateTrainer"
import Username from "./components/Username/Username"
import Trainerlayout from "./components/Adminlayout/TrainerDashLayout"
import CustomerPaymenthistory from './components/Payment/CustomerPaymenthistory'
import Displaytrainers from "./components/displaytrainer/DisplayTrainer"
import Email from './components/Email/Email'
import Updatesuppliment from "./components/DisplaySupplement/UpdateSuppliment"
import Otp from './components/Otp/Otp'
import Membercashpayment from './components/displaymembers/Membercashpayment'
import UnsuccessfulPayment from './components/Payment/UnsuccessfulPayment'
import MemberDashboard from './components/Member/MemberDashboard'
import Memberstats from './components/Trainer/PersonalTraining/Memberstats'
import Updatedietplan from './components/Trainer/Updatedietplan'
import DisplayDietplan from './components/Trainer/DisplayDietplan'
import Addsuppliment from "./components/Addsupplemets/Addsupliment"
import GenAi from './components/Trainer/GenAI/GenAi'
import DisplayWorkoutplan from './components/Trainer/DisplayWorkoutplan'
import Classes from './components/Member/Classes'
import DisplaySupplement from './components/DisplaySupplement/DisplaySupplement'
import Supplements from "./components/Supplements/Supplements"
import Members from './components/displaymembers/Members'
import Memberlayout from './components/Adminlayout/Memberlayout'
import Layout from "./components/Adminlayout/Dashboardlayout"
import Addmembership from './components/Paymentplan/Addmembership'
import DisplayMembership from './components/Paymentplan/DisplayMembership'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Successpay from "./components/displaymembers/Successfullpaymentpage"
import Personaltraining from './components/Trainer/PersonalTraining/Personaltraining'
import Dietplans from "./components/Trainer/Dietplan"
import AIDietplan from "./components/AdminAI/DisplayDietplan"
import AIschedule from "./components/AdminAI/DisplaySchedule"
import Home from './components/Home/Home'
import Memberspay from './components/displaymembers/Memberspay'
import Memberss from "./components/Trainer/Members"
import SuccessfulPayment from './components/Payment/SuccessfulPayment'
import Dietplanss from "./components/Member/DietPlan"
import GenDietplan from './components/Trainer/GenAI/GenDietplan'
import GenSchedule from './components/Trainer/GenAI/GenSchedule'
import UpdateMember from './components/Trainer/UpdateMember'
import Dietplan from "./components/AdminAI/Dietplan"
import Paymentplan from './components/Paymentplan/Paymentplan'
import Workoutplanss from "./components/Member/Workoutplan"
import Cash from './components/Supplements/Cash'
import UpdateWorkout from './components/Trainer/UpdateWorkout'
import Schedule from "./components/AdminAI/Schedule"
import AddTraining from './components/Trainer/PersonalTraining/AddTraining'
import SeeTraining from './components/Trainer/PersonalTraining/SeeTraining'
import MarkAttendance from './components/Markattendance/MarkAttendance'
import SeeAttendance from './components/SeeAttendance/SeeAttendance'
import AI from "./components/AdminAI/Aifeatures"
import WorkoutPlan from './components/Trainer/WorkoutPlan'
import Homenavbar from './components/Homenavbar/Homenavbar'
import EditMembershipPlan from './components/Paymentplan/EditMembershipPlan'
import Addtrainer from './components/addtrainer/Addtrainer'
import Trainerlogin from './components/Trainerlogin/Trainerlogin'
import Memberlogin from './components/memberlogin/Memberlogin'
import Trainerdashboard from './components/trainerdashboard/Trainerdashboard'
import Addmember from './components/Addmember/Addmember'
import UpdateMembers from './components/displaymembers/UpdateMembers'
import SendNotification from './SendNotification'
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
          <Route path='username' element={<Username/>}/>
        </Route>

        {/* Standalone route (not using Homenavbar) */}
        <Route path='/member' element={<Memberlayout/>}>
          <Route index element={<MemberDashboard/>}/>
          <Route path='workoutplan' element={<Workoutplanss/>}/>
          <Route path='dietplan' element={<Dietplanss/>}/>
          <Route path='classes' element={<Classes/>}/>
          <Route path='getdietplan' element={<AIDietplan/>}/>
          <Route path='getaischedule' element={<AIschedule/>}/>
          <Route path='seenotification' element={<Notifications/>}/>
          <Route path='sendnotification' element={<SendNotification/>}/>
        </Route>
        <Route path='/trainer/dashboard' element={<Trainerlayout/>}>
          <Route index element={<Trainerdashboard/>}/>
          <Route path='displaymembers' element={<Memberss/>}/>
          <Route path='workoutplan' element={<WorkoutPlan/>}/>
          <Route path='dietplan' element={<Dietplans/>}/>
          <Route path='displayworkoutplan' element={<DisplayWorkoutplan/>}/>
          <Route path='displayDietplan' element={<DisplayDietplan/>}/>
          <Route path='genai' element={<GenAi/>}/>
          <Route path='personaltrainer' element={<Personaltraining/>}/>
          <Route path='seenotification' element={<Notifications/>}/>
          <Route path='sendnotification' element={<SendNotification/>}/>
        </Route>
        <Route path='/admin/dashbaord' element={<Layout/>}>
            <Route path='displaytrainer' element={<Displaytrainers/>}/>
            <Route index element={<Gymdashboard/>}/>
            <Route path="trainer" element={<Addtrainer/>}/>
            <Route path='addmember' element={<Addmember/>}/>
            <Route path='displayMember' element={<Members/>}/>
            <Route path='supplement' element={<Supplements/>}/>
            <Route path='paymenthistory' element={<CustomerPaymenthistory/>}/>
            <Route path='AI/Admin' element={<AI/>}/>
            <Route path='seeAtendance' element={<SeeAttendance/>}/>
            <Route path='markAttendance' element={<MarkAttendance/>}/>
            <Route path='paymentplan' element={<Paymentplan/>}/>
            <Route path='seenotification' element={<Notifications/>}/>
            <Route path='sendnotification' element={<SendNotification/>}/>
        </Route>
        <Route path='/trainer/memberUpdate/:id/:gym' element={<UpdateMember/>}/>
        <Route path='/addsuplliment' element={<Addsuppliment/>}/>
        <Route path='/displaysuplliment' element={<DisplaySupplement/>}/>
        <Route path='/update-supplement/:id' element={<Updatesuppliment/>}/>
        <Route path='/update/trainer/:id' element={<UpdateTrainer/>}/>
        <Route path='/update/members/:id' element={<UpdateMembers/>}/>
        <Route path='/update/workout/:id' element={<UpdateWorkout/>}/>
        <Route path='/AI/Admin/dietplan' element={<Dietplan/>}/>
        <Route path='/AI/Admin/schedule' element={<Schedule/>}/>
        <Route path='/trainer/updatedietplan/:id' element={<Updatedietplan/>}/>
        <Route path='/trainer/Gendietplan' element={<GenDietplan/>}/>
        <Route path='/trainer/genschedule' element={<GenSchedule/>}/>
        <Route path='/trainer/addtraining' element={<AddTraining/>}/>
        <Route path='/trainer/seetraining' element={<SeeTraining/>}/>
        <Route path='/trainer/memberstats/:id' element={<Memberstats/>}/>
        <Route path='/member/dashboard' element={<MemberDashboard/>}/>
        <Route path='/unsuccessful-payment' element={<UnsuccessfulPayment/>}/>
        <Route path='/successful-payment' element={<SuccessfulPayment/>}/>
        <Route path='/cash' element={<Cash/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/displaymembership' element={<DisplayMembership/>}/>
        <Route path='/addmembership' element={<Addmembership/>}/>
        <Route path='/editmembership/:id' element={<EditMembershipPlan/>}/>
        <Route path='/memberspay/:id' element={<Memberspay/>}/>
        <Route path='/success/pay' element={<Successpay/>}/>
        <Route path='/member/cashpayment' element={<Membercashpayment/>}/>
      </Routes>
    </div>
  )
}

export default App
