import React, { useEffect, useState } from 'react'
import apiHelper from '../../Common/ApiHelper'
import { DataGrid } from '@mui/x-data-grid'
import { Alert, Paper } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const paginationModel = { page: 0, pageSize: 5 };

export default function OrderScreen({ UserInfo }) {
    const [open, setOpen] = React.useState(false);
    const [selectedOrder, setselectedOrder] = React.useState({});

    const handleClickOpen = (id) => {
        if (id) {
            getOrdersById(id)
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [row, setrow] = useState([])

    async function getOrders() {
        try {
            const data = {
                userId: UserInfo?._id,
                orderStatus: ""
            }
            const result = await apiHelper.listOrder(data)
            setrow(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    async function getOrdersById(id) {
        try {
            const result = await apiHelper.getOrderById(id)
            setselectedOrder(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
        // eslint-disable-next-line
    }, [])

    const columns = [

        { field: 'totalPrice', headerName: 'Total Amount (₹)', width: 200 },
        { field: 'orderStatus', headerName: 'Order Status', width: 180 },
        { field: 'deliveryStatus', headerName: 'Delivery Status', width: 180 },
        {
            field: 'deliveryDate', headerName: 'Delivery Date', width: 200, renderCell: (cell) => {
                return cell.row?.deliveryDate?.split("T")[0]
            }
        },
        {
            field: 'action', headerName: 'Action', width: 100, renderCell: (cell) => {
                return <div onClick={() => handleClickOpen(cell.row._id)} className='btn btn-outline-primary'>
                    <InfoIcon />
                </div>
            }
        },
    ]



    async function orderHandler(id, orderStatus, deliveryStatus) {
        try {
            const data = {
                id: id,
                orderStatus: orderStatus,
                deliveryStatus: deliveryStatus
            }
            console.log(data)
            const result = await apiHelper.updateOrder(data)
            if (result.status === 200) {
                getOrders()
                getOrdersById(id)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="h4">Order List</div>
                </div>
                <hr />
            </div>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={[...row]}
                    columns={[...columns]}
                    getRowId={(item) => item._id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    rowSelection={false}
                    checkboxSelection={false}
                    sx={{ border: 0 }}
                />
            </Paper>



            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    sx={{
                        '& .MuiDialog-paper': {
                            width: '75vw',
                            maxWidth: '90vw',
                            margin: 'auto',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }
                    }}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Traking Id :  <span className='text-success'>{selectedOrder?._id}</span>
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div className="h5 text_main">Your Order Details</div>
                        <div className="row">
                            <div className="col-12">
                                <div className="order_border p-3">
                                    <div className="row">
                                        <div className="col-12 col-md-4 mb-3">
                                            <div className="card p-3">
                                                <div className="h6 text-primary">Delivery By : </div>
                                                <div>{UserInfo.fullName}</div>
                                                <div>{UserInfo.email}</div>
                                                <div>{UserInfo.phone}</div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 mb-3">
                                            <div className="card p-3">
                                                <div className="h6 text-primary">Delivery Address : </div>
                                                <div>{selectedOrder?.address?.address}</div>
                                                <div>{selectedOrder?.address?.area}, {selectedOrder?.address?.city}</div>
                                                <div>{selectedOrder?.address?.state} - {selectedOrder?.address?.pincode}</div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 mb-3">
                                            <div className="card p-3">
                                                <div className="h6 text-primary">Order / Delivery Info : </div>
                                                <div className="d-flex gap-2 justify-content-between">
                                                    <span>Payment Method : </span><span className={selectedOrder?.paymentMethod === 0 ? 'text-primary' : selectedOrder?.paymentMethod === 1 ? "text-success" : "text-danger"}>{selectedOrder?.paymentMethod === 0 ? "Cash On Delivery" : "UPI / Online / Card"}</span>
                                                </div>
                                                <div className="d-flex gap-2 justify-content-between">
                                                    <span>Payment Status : </span><span className={selectedOrder?.paymentStatus === 0 ? 'text-warning' : selectedOrder?.paymentStatus === 1 ? "text-success" : "text-danger"}>{selectedOrder?.paymentStatus}</span>
                                                </div>
                                                <div className="d-flex gap-2 justify-content-between">
                                                    <span>Delivery Date : </span><span className='text-dark'>{selectedOrder?.deliveryDate?.split("T")[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card p-3">
                                                <div className="h6 text-primary">Product Details : </div>
                                                <div className="table-responsive-wrapper" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                                                    <table className="table table-bordered" style={{ minWidth: "600px" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>No.</th>
                                                                <th>Product Title</th>
                                                                <th>Unite Price</th>
                                                                <th>qty</th>
                                                                <th>Total Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                selectedOrder?.products?.map((data, index) => {
                                                                    return <tr key={index}>
                                                                        <td>{index + 1} .</td>
                                                                        <td>{data?.model}</td>
                                                                        <td>₹ {data?.price}</td>
                                                                        <td> {data?.qty}</td>
                                                                        <td>₹ {data?.price * data.qty}</td>
                                                                    </tr>
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="d-flex justify-content-end my-2">
                                                    <div className="order_bill">
                                                        <div className="d-flex gap-2 justify-content-between pt-3 ">
                                                            <span> Total Price :</span><span className='text-primary'>₹ {selectedOrder?.totalPrice}</span>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-2 mx-3">
                            <div className='my-2'>
                                {
                                    selectedOrder.deliveryStatus === 0 ? <div onClick={() => orderHandler(selectedOrder?._id, null, 1)} className="btn btn-primary w-25">Dispatch Order</div> :
                                        selectedOrder.deliveryStatus === 1 ? <Alert variant="filled" severity="info">
                                            Order On the Way
                                        </Alert> :
                                            selectedOrder.deliveryStatus === 2 ? <Alert variant="filled" severity="success">
                                                Order Recieved
                                            </Alert> : ""
                                }
                            </div>
                            <div className='my-2'>
                                {
                                    selectedOrder.orderStatus === 2 ? <Alert variant="filled" severity="error">
                                        Order Cancelled
                                    </Alert> :
                                        selectedOrder.orderStatus === 1 ? <Alert variant="filled" severity="success">
                                            Order Completed
                                        </Alert> : ""
                                }
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {
                            selectedOrder.orderStatus !== 2 && selectedOrder.orderStatus !== 1 ? <button onClick={() => orderHandler(selectedOrder?._id, 2, null)} className='btn btn-outline-danger'>
                                Cancel Order
                            </button> : ""
                        }
                        <Button autoFocus onClick={handleClose}>
                            CLose
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
        </div>
    )
}
