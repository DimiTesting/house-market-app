import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar"
import Explore from "./pages/Explore"
import ForgotPassword from "./pages/ForgotPassword"
import Offers from "./pages/Offers"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore/>}/>
          <Route path="/offers" element={<Offers/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        </Routes>
        <NavBar/>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
