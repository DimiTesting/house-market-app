import {useState} from "react"
import {Link} from "react-router-dom"
import {ReactComponent as ArrowRigthIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"

function SignIn() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData

    function OnChange(e) {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        })
    )}

    return (
        <>
        <div className="pageContainer">
            <header> 
                <p className="pageHeader"> Welcome back </p> 
            </header>
            
            <form>
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

            <Link to="/sign-up" className="registerLink"> Sign-up instead </Link>

        </div>
        </>
    )
}

export default SignIn