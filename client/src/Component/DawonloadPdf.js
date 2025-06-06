import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import apiHelper from '../Constant/ApiHelper';

const InvoiceGenerator = ({ Details, UserInfo }) => {
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


    // let SubTotal = 0
    // for (let i = 0; i < Details?.products?.length; i++) {
    //     SubTotal += Details.products[i].qty * Details.products[i].varient.mrp
    // }

    return (

        <div className="container mt-5 mb-5 pb-5">
            <div className="text-end mb-2">
                <button className="btn btn-primary" onClick={handleDownload}>
                    Generate Invoice
                </button>
            </div>
            <div className="px-2 py-3 p-md-3 border" ref={invoiceRef} id="invoice">
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


            </div>
        </div>
    );
};

export default InvoiceGenerator;