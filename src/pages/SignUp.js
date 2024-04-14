import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {ReactComponent as ArrowRigthIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from "../firebase.config"
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";


function SignUp() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: ""
    })

    const {name, email, password} = formData

    const navigate = useNavigate()

    function OnChange(e) {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        })
    )}

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth();
            const userCreditial = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCreditial.user
            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = {...formData}
            delete formDataCopy.password
            const timeStamp = serverTimestamp()
            formDataCopy.timeStamp = timeStamp
            await setDoc(doc(db, 'users', user.uid), formDataCopy)
            navigate("/")

        } catch (error) {
            console.log(error)
            toast("Something wrong with the Registration form")
        }
        
    }

    return (
        <>
        <div className="pageContainer">
            <header> 
                <p className="pageHeader"> Register </p> 
            </header>
            
            <form onSubmit={handleSumbit}>
                <input type="name" className="nameInput" placeholder="Name" id="name" value={name} onChange={OnChange}/> 
                <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={OnChange}/> 
                <div className="passwordInputDiv">
                    <input type={showPassword? 'text': 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={OnChange}/> 
                    <img className="showPassword" src={visibilityIcon} alt="show password" onClick={()=> setShowPassword((prevState) => !prevState)}/>
                </div>
                <Link to="/forgotPassword" className="forgotPasswordLink"> Forgot Password </Link>
                <div className="signUpBar">
                    <p className="signUpText">Sign Up</p>
                    <button className="signUpButton">
                        <ArrowRigthIcon fill="#ffffff" width="34px" height="34px"/>
                    </button>
                </div>
            </form>

            <Oauth/>

            <Link to="/sign-in" className="registerLink"> Sign-in instead </Link>
        </div>
        </>
    )
}

export default SignUp