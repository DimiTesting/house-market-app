import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {ReactComponent as ArrowRigthIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import Oauth from "../components/Oauth"

function SignIn() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData

    const navigate = useNavigate()

    function OnChange(e) {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        })
    )}

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            const userCreditial = await signInWithEmailAndPassword(auth, email, password)
            if (userCreditial.user) {
                navigate("/profile")
            }
            
        } catch (error) {
            toast("Bad credentials")
        }
    }

    return (
        <>
        <div className="pageContainer">
            <header> 
                <p className="pageHeader"> Welcome back </p> 
            </header>
            
            <form onSubmit={handleSubmit}>
                <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={OnChange}/> 
                <div className="passwordInputDiv">
                    <input type={showPassword? 'text': 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={OnChange}/> 
                    <img className="showPassword" src={visibilityIcon} alt="show password" onClick={()=> setShowPassword((prevState) => !prevState)}/>
                </div>
                <Link to="/forgotPassword" className="forgotPasswordLink"> Forgot Password </Link>
                <div className="signInBar">
                    <p className="signInText">Sign In</p>
                    <button className="signInButton">
                        <ArrowRigthIcon fill="#ffffff" width="34px" height="34px"/>
                    </button>
                </div>
            </form>

            <Oauth/>

            <Link to="/sign-up" className="registerLink"> Sign-up instead </Link>

        </div>
        </>
    )
}

export default SignIn