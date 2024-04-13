import { Link } from "react-router-dom"
import {ReactComponent as ArrowRigthIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"

function ForgotPassword() {

    const [email, setEmail] = useState('')

    function handleChange(e) {
        setEmail(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success("Email sent")
        } catch (error) {
            toast("Email has not been sent")
        }
    }

    return (
        <div className="pageContainer">
            <p className="pageHeader"> Forgot Password </p>

            <form onSubmit={handleSubmit}>
                <input type="text" className="emailInput" id="email" placeholder="Add email address..." value={email} onChange={handleChange}/>
                <Link to="/sign-in" className="forgotPasswordLink"> Sign-in </Link>
                <div className="signInBar">
                    <p className="signInText">Forgot Password</p>
                    <button className="signInButton">
                        <ArrowRigthIcon fill="#ffffff" width="34px" height="34px"/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword