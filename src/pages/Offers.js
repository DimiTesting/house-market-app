import { query, orderBy, where, collection, getDocs, limit } from "firebase/firestore"
import {db} from "../firebase.config"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Offers() {

    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(()=> {
        const fetchListings = async() => {
            try {

                const listingsRef = collection(db, 'listings')
                const q = query(
                    listingsRef,
                    where('offer', '==', true), 
                    orderBy('timestamp', 'desc'), 
                    limit(10)
                )
                const querySnap = await getDocs(q)
                let listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id, 
                        data: doc.data()
                    })
                });
                setListings(listings)
                setLoading(false)

            } catch (error) {
                toast.error("Could not fetch the data")
            }
        }

        fetchListings()
    }, [params.categoryName])

    return(
        <div className="category">
            <p className="pageHeader">
                Offers
            </p>
            
            {loading ? <Spinner/>: listings && listings.length>0 ? 
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                            ))}
                        </ul>
                    </main>
                </> : 
            <p> No offers at the moment </p>}
        </div>
    )
}

export default Offers