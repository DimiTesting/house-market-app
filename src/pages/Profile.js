import { useState, useEffect } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc, collection, getDocs, deleteDoc, where, orderBy, query} from "firebase/firestore"
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"
import homeIcon from "../assets/svg/homeIcon.svg"
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import ListingItem from "../components/ListingItem"

function Profile() {
    const auth = getAuth()
    const [changeDetails, setChangesDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const [loading, setLoading] = useState(true)
    const [listing, setListing] = useState(null)

    const {name, email} = formData

    const navigate = useNavigate()

    useEffect(()=> {

        const fetchUserListings = async() => {
            const userListingRef = collection(db, "listings")
            const q = query(userListingRef, where("userRef", "==", auth.currentUser.uid), orderBy('timestamp', 'desc'))
            const querySnap = await getDocs(q)
            
            const listings = []
            querySnap.forEach((doc)=> {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListing(listings)
            setLoading(false)
        }

        fetchUserListings()

    }, [auth.currentUser.uid])

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

    function handleLogout() {
        auth.signOut()
        navigate("/")
    }

    const handleDelete = async(listingId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const docRef = doc(db, "listings", listingId)
            await deleteDoc(docRef)
            const filteredListings = listing.filter((listing) => listing.id !== listingId)
            setListing(filteredListings)
            toast.success("Listing has been deleted")
        }
    }

    const handleEdit = async(listingid) => {
        navigate(`/edit-listing/${listingid}`)
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

            

            {!loading && listing?.length>0 && (
                <>
                    <p className="listingText"> Your Listings </p>
                    <ul className="lisitingsList">
                        {listing.map((listing) => (
                            <ListingItem 
                                key={listing.id} 
                                id={listing.id} 
                                listing={listing.data}
                                onDelete={()=>handleDelete(listing.id)}
                                onEdit={()=>handleEdit(listing.id)}
                            />
                        ))}
                    </ul>
                </>
            )}

        </div>
    )
}

export default Profile