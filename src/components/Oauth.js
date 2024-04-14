import googleIcon from "../assets/svg/googleIcon.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import {db} from "../firebase.config"
import { toast } from "react-toastify"

function Oauth() {

    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            //checking user authorisation
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //checking if user is exists in the database
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            //adding non existing user to database 
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName, 
                    email: user.email, 
                    timeStamp: serverTimestamp()
                })
            }
            navigate("/")
        } catch (error) {
            toast.error("Could not authorise you with your google account")
        }
    }

    return (
        <div className="socialLogin">
            <p> Sign-{location.pathname === "/sign-in" ? "In": "Up"} with </p>
                <button className="socialIconDiv" onClick={handleClick}>
                    <img className="socialIconImg" src={googleIcon} alt="Google Icon"/>
                </button>
        </div>
    )
}

export default Oauth