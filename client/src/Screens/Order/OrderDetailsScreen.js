import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import apiHelper from '../../Constant/ApiHelper';
import Constant from '../../Constant/Constant';
import InvoiceGenerator from '../../Component/DawonloadPdf';
import path from '../../Constant/Path';

export default function OrderDetailsScreen({ UserInfo }) {
    const { id } = useParams()
    const navigate = useNavigate();
    const [Orders, setOrder] = useState({})
    async function getOreder() {
        try {
            const result = await apiHelper.getOrderById(id)
            setOrder(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOreder()
    }, [])

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate(path.home);
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div><div className="col-12 col-md-4 mb-3">
            <div className="card p-3">
                <div className="h6 text-primary">Order / Delivery Info : </div>
                <div className="d-flex gap-2 justify-content-between">
                    <span>Payment Method : </span><span className={Orders?.paymentMethod === 0 ? 'text-primary' : Orders?.paymentMethod === 1 ? "text-success" : "text-danger"}>{Orders.paymentMethod === 0 ? "Cash On Delivery" : "UPI / Online / Card"}</span>
                </div>
                <div className="d-flex gap-2 justify-content-between">
                    <span>Payment Status : </span><span className={Orders?.paymentStatus === 0 ? 'text-warning' : Orders?.paymentStatus === 1 ? "text-success" : "text-danger"}>{Orders.paymentStatus}</span>
                </div>
                <div className="d-flex gap-2 justify-content-between">
                    <span>Delivery Date : </span><span className='text-dark'>{Orders.deliveryDate?.split("T")[0]}</span>
                </div>
            </div>
        </div>
            <InvoiceGenerator Details={Orders} UserInfo={UserInfo} />

        </div>
    )
}
