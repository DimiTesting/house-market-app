import { query, orderBy, where, collection, getDocs, limit, startAfter } from "firebase/firestore"
import {db} from "../firebase.config"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Category() {

    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(()=> {
        const fetchListings = async() => {
            try {

                const listingsRef = collection(db, 'listings')
                const q = query(
                    listingsRef,
                    where('type', '==', params.categoryName), 
                    orderBy('timestamp', 'desc'), 
                    limit(10)
                )
                const querySnap = await getDocs(q)
                const lastListing = querySnap.docs[querySnap.docs.length-1]
                let listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id, 
                        data: doc.data()
                    })
                });
                setLastFetchedListing(lastListing)
                setListings(listings)
                setLoading(false)

            } catch (error) {
                toast.error("Could not fetch the data")
            }
        }

        fetchListings()
    }, [params.categoryName])


    const onLoadMore = async() => {
        try {

            const listingsRef = collection(db, 'listings')
            const q = query(
                listingsRef,
                where('type', '==', params.categoryName), 
                orderBy('timestamp', 'desc'), 
                startAfter(lastFetchedListing),
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
            setListings((prev)=>[...prev, ...listings])
            setLoading(false)

        } catch (error) {
            toast.error("Could not fetch the data")
        }
    }

    return(
        <div className="category">
            <p className="pageHeader">
                {params.categoryName==="rent" ? "Places for rent": "Places for sale"}
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

                    <br/>
                    <br/>

                    {lastFetchedListing&& (<p className="loadMore" onClick={onLoadMore}> Load More </p>)}
                </> : 
            <p> No items for {params.categoryName === "rent"? "rent": "sale"}</p>}
        </div>
    )
}

export default Category