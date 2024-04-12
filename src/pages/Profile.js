import { useState } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function Profile() {
    const auth = getAuth()
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

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader"> My profile </p>
                <button type="button" className="logOut" onClick={handleLogout}> Logout </button>
            </header>
        </div>
    )
}

export default Profile