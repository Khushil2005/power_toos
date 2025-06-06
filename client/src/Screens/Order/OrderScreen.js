import html2pdf from 'html2pdf.js';
import React, { useRef } from 'react'
import apiHelper from '../../Constant/ApiHelper';

export default function OrderScreen({ Orders, UserInfo }) {
    const invoiceRef = useRef();
    const handleDownload = () => {
        const element = invoiceRef.current;
        const options = {
            margin: 0.5,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().from(element).set(options).save();
    };

    let SubTotal = 0
    // for (let i = 0; i < Details?.products?.length; i++) {
    //     SubTotal += Details.products[i].qty * Details.products[i].varient.mrp
    // }

    async function orderHandler(id, orderStatus, deliveryStatus, fetchUserOrders) {
        try {
            const data = {
                id: id,
                orderStatus: orderStatus,
                deliveryStatus: deliveryStatus
            }
            const result = await apiHelper.updateOrder(data)
            if (result.status === 200) {
                fetchUserOrders(UserInfo?._id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(Orders)
    return (
        <div className='OrderScreen  mb-5 pb-3 p-2'>
            {
                Orders?.map((Details) => {
                    return <div className="container mt-5 mb-5 pb-5 border pt-2 rounded">
                        <div className="text-end mb-2">
                            {
                                Details?.orderStatus === 0 ? <button onClick={() => orderHandler(Details?._id, 2, null)} className='btn btn-outline-danger mx-1'>
                                    Cancel Order
                                </button> : ""
                            }
                            <button className="btn btn-primary mx-1" onClick={handleDownload}>
                                Generate Invoice
                            </button>

                        </div>
                        <div className="px-2 py-3 p-md-3" ref={invoiceRef} id="invoice">
                            <h2 className="text-center mb-4">Cold Crush Invoice</h2>
                            {/* Customer Details */}
                            <hr />
                            <h5>Customer Details</h5>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table table-bordered w-100" style={{ minWidth: '600px' }}>
                                    <tbody>
                                        <tr>
                                            <th>Full Name</th>
                                            <td>{UserInfo?.fullName}</td>
                                            <th>Phone</th>
                                            <td>{UserInfo?.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{UserInfo?.email}</td>
                                            <th>Address</th>
                                            <td>{Details.address?.address} {Details.address?.area}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{Details.address?.city}</td>
                                            <th>State</th>
                                            <td>{Details.address?.state}</td>
                                        </tr>
                                        <tr>
                                            <th>Pincode</th>
                                            <td colSpan="3">{Details.address?.pincode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                            </div>
                            {/* Product Details */}
                            <h5 className="mt-4">Product Details</h5>
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Qty</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Details.products?.map((data, index) => {
                                            return <tr>
                                                <td>{index + 1}</td>
                                                <td>{data.model}</td>
                                                <td>{data.qty}</td>
                                                <td>₹ {data?.price}</td>
                                                <td>₹ {data?.price * data.qty}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>

                            {/* Summary */}
                            <div className="row justify-content-end">
                                <div className="col-md-6">
                                    <table className="table table-bordered">
                                        <tbody>

                                            <tr className="table-light">
                                                <th>Grand Total</th>
                                                <td><strong>₹ {Details.totalPrice}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card p-2">
                                    <div className="h6 text-primary">Order / Delivery Info : </div>
                                    <div className="d-flex gap-2 justify-content-between">
                                        <span>Payment Method : </span><span className={Details?.paymentMethod === 0 ? 'text-primary' : Details?.paymentMethod === 1 ? "text-success" : "text-danger"}>{Details?.paymentMethod === 0 ? "Cash On Delivery" : Details?.paymentMethod === 1 ? "UPI / Online / Card" : "Rejected"}</span>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-between">
                                        <span>Payment Status : </span><span className={Details?.paymentStatus === 0 ? 'text-warning' : Details?.paymentStatus === 1 ? "text-success" : "text-danger"}>{Details?.paymentStatus}</span>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-between">
                                        <span>Delivery Date : </span><span className='text-dark'>{Details?.deliveryDate?.split("T")[0]}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                })
            }
        </div >
    )
}
