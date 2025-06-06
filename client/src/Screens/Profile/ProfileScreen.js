import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiHelper from '../../Constant/ApiHelper'
import path from '../../Constant/Path'
import { useContext } from 'react'
import { CartContext } from '../../Hooks/cartProvider'

export default function ProfileScreen({ UserInfo, setAuth }) {
    const { setcartItems } = useContext(CartContext)
    const [loding, setloding] = useState(false)
    const navigate = useNavigate()
    const [PendingOrder, setPendingOrder] = useState([])
    const [CompletedOrder, setCompletedOrder] = useState([])
    const [Score, setScore] = useState(null)

    async function getScore() {
        try {
            const result = await apiHelper.calculateUserScore(UserInfo?._id)
            setScore(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getPendingOrder() {
        try {
            const data = {
                userId: UserInfo?._id,
                orderStatus: "0"
            }
            const result = await apiHelper.listOrderByStatus(data)
            setPendingOrder(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function getCopletedOrder() {
        try {
            const data = {
                userId: UserInfo?._id,
                orderStatus: "1"
            }
            const result = await apiHelper.listOrderByStatus(data)
            setCompletedOrder(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPendingOrder()
        getCopletedOrder()
    }, [])

    // useEffect(() => {
    //     if (UserInfo?._id) {
    //         getScore()
    //     }
    // }, [])


    const getScoreCategory = (score) => {
        if (score <= 30) return { label: 'Weak', color: 'bg-danger' };
        if (score <= 40) return { label: 'Poor', color: 'bg-warning' };
        if (score <= 50) return { label: 'Fair', color: 'bg-info' };
        if (score <= 70) return { label: 'Good', color: 'bg-primary' };
        if (score <= 80) return { label: 'Super', color: 'bg-success' };
        if (score <= 90) return { label: 'Excellent', color: 'bg-success text-dark' };
        return { label: 'Outstanding', color: 'bg-success text-white' };
    };

    const { label, color } = getScoreCategory(Score?.score);


    console.log(PendingOrder, CompletedOrder)
    return (
        <div className='ProfileScreen d-block d-md-none' style={{ height: "100vh", backgroundColor: "whitesmoke" }}>
            <div className="container p-3 p-md-5">
                <div className="shadow card p-3 my-2">
                    {
                        UserInfo?._id ? <>
                            <div className="h4">{UserInfo.fullName}</div>
                            <div className="h5">{UserInfo.phone}</div>
                            <div className="h5">{UserInfo.email}</div>

                            <div className="my-3 text-center">
                                <div onClick={() => {
                                    if (UserInfo?._id) {
                                        localStorage.removeItem("token")
                                        setAuth(null)
                                        setcartItems([])
                                        navigate(path.home)
                                    }
                                }} className="btn btn_main">Log out</div>
                            </div>
                        </> : <>
                            <div className="h4">Guest User</div>
                            <div className="h5">+XX XXXXX XXXXX</div>
                            <div className="h5">exampleXXX@gamil.com</div>

                            <div className="my-3 text-center">
                                <div onClick={() => navigate(path.login)} className="btn btn_main">Sing In</div>
                            </div>
                        </>
                    }
                </div>
                <div className="shadow card p-3 my-2">
                    <div className="d-flex justify-content-between">
                        <div>Your Current Order : </div><div>{PendingOrder.length}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>Your Completed Order : </div><div>{CompletedOrder.length}</div>
                    </div>
                </div>
                <div className="shadow card p-3 my-2">
                    <div className="text_main h4">
                        Your Shopping Score
                    </div>
                    <div className="h4">
                        <div className="container my-4">
                            {
                                UserInfo?._id ? <>
                                    <div className="card shadow p-2">
                                        <h4 className="text-center mb-3 -3">Monthly Performance Score</h4>
                                        <div className="mb-2 h5">
                                            <strong>Score:</strong> {Score?.score} / 100 — <span className="badge bg-secondary ">{label}</span>
                                        </div>
                                        <div className="progress" style={{ height: '30px' }}>
                                            <div
                                                className={`progress-bar ${color}`}
                                                role="progressbar"
                                                style={{ width: `${Score?.score}%` }}
                                                aria-valuenow={Score?.score}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {Score?.score}%
                                            </div>
                                        </div>
                                    </div>
                                </> : <div onClick={() => navigate(path.home)} className="btn btn_outline container">
                                    Sing In & Shopping Now
                                </div>
                            }
                        </div>
                    </div>
                    {/* <div className="h5">₹ {Score.totalAmount} <div className="text-muted">this month total Order Amount</div></div> */}
                    {/* <div className='h5'>{Score.month} / {Score.year}</div> */}
                </div>
            </div>
        </div>
    )
}
