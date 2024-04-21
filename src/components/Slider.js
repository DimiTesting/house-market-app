import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase.config"
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore"
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/swiper-bundle.css"
import Spinner from "./Spinner"
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() { 

    const [loading, setLoading] = useState(true)
    const [listing, setListing] = useState(null)

    const navigate = useNavigate()

    useEffect(()=> {

        const fetchListing = async() => {
            const listingRef = collection(db, 'listings')
            const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q)

            const listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            setListing(listings)
            setLoading(false)
        }

        fetchListing()

    }, [])

    console.log(listing)

    if(loading) {
        return <Spinner/>
    }

    return (
        <>
            <p className="exploerHeading"> Recommended </p>

            <Swiper slidesPerView={1} pagination={{clickable:true}}>
                {listing.map(({id, data}) => (
                    <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
                        <div
                            style={{
                                background: `url(${data.imageUrls[1]}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                            className='swiperSlideDiv'>
                            <p className="swiperSlideText"> {data.name} </p>
                            <p className="swiperSlidePrice"> {data.discountedPrice ?? data.regularPrice} { } {data.type === "rent" && "/ month" } </p>
                        </div>
                    </SwiperSlide>))}
            </Swiper>
        </>
    )
}

export default Slider