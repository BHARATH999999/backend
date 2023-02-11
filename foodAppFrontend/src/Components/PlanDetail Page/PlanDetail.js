import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../Styles/planDetail.css'
import '../Styles/contact.css'
import AuthProvider, { useAuth } from '../Context/AuthProvider';
// import mongoose from 'mongoose';

function PlanDetail() {
    const [plan, setplan] = useState({})
    const { id } = useParams();
    const [arr, setarr] = useState();
    const [review, setreview] = useState("");
    const [rate, setrate] = useState(5);
    const { user } = useAuth();
    useEffect(async () => {
        if (!user) return;
        console.log(user);
        const data = await axios.get(`/api/v1/plan/${id}`)
        console.log(data.data.plan);
        delete data.data.plan["_id"]
        delete data.data.plan["__v"]
        setplan(data.data.plan)
        const reviews = await axios.get("/api/v1/review/getReviewsOfPlan/" + id);
        if (reviews.data) setarr(reviews.data.reviews)
        console.log(reviews.data.reviews);
    }, [])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // console.log(rate);
    const handleClick = async () => {
        if(!review){
            console.log("review cannot be empty");
            return;
        }
        if (!user) return;
        const data = await axios.post("/api/v1/review", {
            "description": review,
            "rating": rate,
            "user": user._id,
            "plan": id,

        })
        console.log(data.data);
        const reviews = await axios.get("/api/v1/review/getReviewsOfPlan/" + id);
        console.log(reviews.data);
        setarr(reviews.data.reviews);
    }
    async function handleDelete(id){
        try {
            let data = await axios.get("/api/v1/review/deleteReview/" + id);
            console.log(data.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    function round(value, decimals) {
        if ((value + "").length < decimals) {
            return value;
        }
        else (value + "").substring(0, decimals);
    }

    return (
        <div className="pDetailBox">
            <div className='h1Box'>
                <h1 className='h1'>PLAN DETAILS</h1>
                <div className="line"></div>
            </div>
            <div className="planDetailBox">
                <div className='planDetail'>
                    <div className="loginBox">
                        {
                            Object.keys(plan).map((ele, key) => (
                                <div className='entryBox' key={key}>
                                    {ele === "reviews" ?
                                        <>
                                            <div className="entryText">{capitalizeFirstLetter(ele)}</div>
                                            <div className=" input">{arr?.length}</div>
                                        </> : null
                                    }
                                    {ele === "totalRating" ? null : null}
                                    {ele !== "reviews" && ele !== "totalRating" ?
                                        <>
                                            <div className="entryText">{capitalizeFirstLetter(ele)}</div>
                                            <div className=" input">{capitalizeFirstLetter(plan[ele].toString())}</div> </> : null
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>

            <div className='reviewBox'>
                <div className="reviewEnrty">
                    <input type="text" placeholder='Enter review here and select rating' onChange={(e) => setreview(e.target.value)} />
                    <select name="" id="" className="select" onChange={(e) => { setrate(e.target.value) }}>
                        <option value={5} key={1}>5 Exellent</option>
                        <option value={4} key={2}>4 Very Good</option>
                        <option value={3} key={3}>3 Good</option>
                        <option value={2} key={4}>2 Poor</option>
                        <option value={1} key={5}>1 Very Poor</option>
                    </select>
                    <button className="btn" onClick={handleClick}>
                        Submit
                    </button>
                </div>
                {
                    arr && arr?.map((ele, key) => (
                        <div className="reviewsCard" key={key}>
                            <div className="pdreviews">
                                <div className="pdrdetail">
                                    <h3>userID: {ele.user} says</h3>
                                    <div className="input"> {ele.description}</div>
                                </div>
                                <div className='rate'>
                                    {
                                        <label htmlFor="star5" title="text">{round(ele?.rating, 2)}</label>

                                    }
                                </div>
                            </div>
                            {/* {
                                user ?
                                    ele.user === user?._id ?
                                        <div className='rcBtn'>
                                            <button className="showMoreBtn" onClick={handleDelete(ele._id + "")}>Delete</button>
                                        </div>
                                        : null
                                    : null
                            } */}
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default PlanDetail
