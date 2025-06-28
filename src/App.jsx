import './App.css'
import {ToastContainer} from "react-toastify"
import Gymdashboard from './components/gymdashboard/gymdashboard'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import {Route,Routes} from "react-router-dom"
import UpdateTrainer from "./components/displaytrainer/UpdateTrainer"
import Username from "./components/Username/Username"
import Trainerlayout from "./components/Adminlayout/TrainerDashLayout"
import Displaytrainers from "./components/displaytrainer/DisplayTrainer"
import Email from './components/Email/Email'
import Updatesuppliment from "./components/DisplaySupplement/UpdateSuppliment"
import Otp from './components/Otp/Otp'
import Updatedietplan from './components/Trainer/Updatedietplan'
import DisplayDietplan from './components/Trainer/DisplayDietplan'
import Addsuppliment from "./components/Addsupplemets/Addsupliment"
import GenAi from './components/Trainer/GenAI/GenAi'
import DisplayWorkoutplan from './components/Trainer/DisplayWorkoutplan'
import DisplaySupplement from './components/DisplaySupplement/DisplaySupplement'
import Supplements from "./components/Supplements/Supplements"
import Members from './components/displaymembers/Members'
import Layout from "./components/Adminlayout/Dashboardlayout"
import ResetPassword from './components/ResetPassword/ResetPassword'
import Personaltraining from './components/Trainer/PersonalTraining/Personaltraining'
import Dietplans from "./components/Trainer/Dietplan"
import Home from './components/Home/Home'
import Memberss from "./components/Trainer/Members"
import GenDietplan from './components/Trainer/GenAI/GenDietplan'
import GenSchedule from './components/Trainer/GenAI/GenSchedule'
import UpdateMember from './components/Trainer/UpdateMember'
import Dietplan from "./components/AdminAI/Dietplan"
import UpdateWorkout from './components/Trainer/UpdateWorkout'
import Schedule from "./components/AdminAI/Schedule"
import AddTraining from './components/Trainer/PersonalTraining/AddTraining'
import SeeTraining from './components/Trainer/PersonalTraining/SeeTraining'
import MarkAttendance from './components/Markattendance/MarkAttendance'
import SeeAttendance from './components/SeeAttendance/SeeAttendance'
import AI from "./components/AdminAI/Aifeatures"
import WorkoutPlan from './components/Trainer/WorkoutPlan'
import Homenavbar from './components/Homenavbar/Homenavbar'
import Addtrainer from './components/addtrainer/Addtrainer'
import Trainerlogin from './components/Trainerlogin/Trainerlogin'
import Memberlogin from './components/memberlogin/Memberlogin'
import Trainerdashboard from './components/trainerdashboard/Trainerdashboard'
import Addmember from './components/Addmember/Addmember'
import UpdateMembers from './components/displaymembers/UpdateMembers'
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

        <Route path='/trainer/dashboard' element={<Trainerlayout/>}>
          <Route index element={<Trainerdashboard/>}/>
          <Route path='displaymembers' element={<Memberss/>}/>
          <Route path='workoutplan' element={<WorkoutPlan/>}/>
          <Route path='dietplan' element={<Dietplans/>}/>
          <Route path='displayworkoutplan' element={<DisplayWorkoutplan/>}/>
          <Route path='displayDietplan' element={<DisplayDietplan/>}/>
          <Route path='genai' element={<GenAi/>}/>
          <Route path='personaltrainer' element={<Personaltraining/>}/>
        </Route>
        <Route path='/admin/dashbaord' element={<Layout/>}>
            <Route path='displaytrainer' element={<Displaytrainers/>}/>
            <Route index element={<Gymdashboard/>}/>
            <Route path="trainer" element={<Addtrainer/>}/>
            <Route path='addmember' element={<Addmember/>}/>
            <Route path='displayMember' element={<Members/>}/>
            <Route path='supplement' element={<Supplements/>}/>
            <Route path='AI/Admin' element={<AI/>}/>
            <Route path='seeAtendance' element={<SeeAttendance/>}/>
            <Route path='markAttendance' element={<MarkAttendance/>}/>
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
      </Routes>
    </div>
  )
}

export default App
