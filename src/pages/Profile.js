import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc} from "firebase/firestore"
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"
import homeIcon from "../assets/svg/homeIcon.svg"
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"

function Profile() {
    const auth = getAuth()
    const [changeDetails, setChangesDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = formData

    const navigate = useNavigate()

    function handleLogout() {
        auth.signOut()
        navigate("/")
    }

    const onSumbit = async() => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                const userRef = doc(db, "users", auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }
            
        } catch (error) {
            toast("Profile not updated")
        }
    }

    function onChange(e) {
        e.preventDefault()
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.id] : e.target.value
        }))
    }

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader"> My profile </p>
                <button type="button" className="logOut" onClick={handleLogout}> Logout </button>
            </header>

            <main>
                <div className="profileDetailsHeader">
                    <p className="personalDetailsText"> Personal Detials </p>
                    <p className="changePersonalDetails" onClick={()=> {
                        changeDetails && onSumbit()
                        setChangesDetails((prevState) => !prevState)
                    }}> 
                        {changeDetails? "done": "change"} 
                    </p>
                </div>

                <div className="profileCard">
                    <form>
                        <input 
                            type="text" 
                            id="name" 
                            value={name}
                            className={!changeDetails? 'profileName': "profileNameActive"} 
                            disabled={!changeDetails}
                            onChange={onChange}
                        /> 
                        <input 
                            type="text" 
                            id="email" 
                            value={email}
                            className={!changeDetails? 'profileEmail': "profileEmailActive"} 
                            disabled={!changeDetails}
                            onChange={onChange}
                        /> 
                    </form>
                </div>
            </main>
            
            <Link to="/create-listing" className="createListing"> 
                <img src={homeIcon} alt="home"/> 
                <p> Sell or rent your property </p>
                <img src={arrowRight} alt="arrow icon"/> 
            </Link>

        </div>
    )
}

export default Profile