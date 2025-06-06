import apiHelper from '../../Constant/ApiHelper';
import path from '../../Constant/Path';
import React, { useContext, useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import OrderSuccessLoader from '../../Component/OrderSuccessLoader copy'
import { CartContext } from '../../Hooks/cartProvider';

export default function CheckoutScreen({ UserInfo, fetchUserCart, fetchUserOrders }) {
    const [extraLoader, setExtraLoader] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ProductId = searchParams.get("product");
    const AddressId = searchParams.get("address");
    const PaymentMethod = searchParams.get("payment");
    const [Product, setProduct] = useState([])
    const { getCartData, cartItems: CartItems, setcartItems, CartTotalDetails } = useContext(CartContext)

    async function getProduct() {
        try {
            const result = await apiHelper.getProductById(ProductId)
            setProduct(result.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (ProductId) {
            getProduct()
        }
    }, [])


    const [Address, setAddress] = useState({})

    async function getAddress() {
        try {
            const result = await apiHelper.getAddressById(AddressId)
            setAddress(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (AddressId) {
            getAddress()
        }
        // eslint-disable-next-line
    }, [])

    async function handlePayment(orderDetails) {
        try {
            const option = {
                key: orderDetails.razorpayDetails.key_id,
                amount: orderDetails.razorpayDetails.amount,
                currency: orderDetails.razorpayDetails.currency,
                name: "PowerTools",
                description: "Buy Smarter",
                order_id: orderDetails.razorpayDetails.id,
                handler: async (response) => {
                    try {
                        await apiHelper.verifyPayment({ ...response, orderId: orderDetails._id })
                        navigate("/order/" + orderDetails?._id)
                    } catch (error) {
                        console.log(error)
                    }
                },
                prefill: {
                    name: UserInfo.fullName,
                    email: UserInfo.email,
                    contact: UserInfo.phone
                },
                theme: {
                    color: "#3e2723"
                }
            }

            const rzp = new window.Razorpay(option)
            rzp.open()
            fetchUserOrders(UserInfo?._id)
        } catch (error) {
            console.log(error)
        }
    }

    async function placeOrder() {
        try {
            const products = (CartItems?.length > 0) ? CartItems.map((item) => ({
                id: item?.product?._id,
                qty: item.qty
            }))
                : [{
                    id: ProductId,
                    qty: 1
                }];

            const totalPrice = CartTotalDetails?.productPrice || Product?.price;
            const totalItems = CartTotalDetails?.totalItems || 1;


            const data = {
                user: UserInfo?._id,
                address: AddressId,
                paymentMethod: PaymentMethod,
                products,
                totalPrice,
                totalItems

            };

            const result = await apiHelper.createOrder(data)
            if (result.status === 200) {
                if (PaymentMethod === "COD") {
                    setExtraLoader(true); // Show loader component

                    setTimeout(() => {
                        navigate("/order/" + result.data.data?._id);
                        setExtraLoader(false);
                    }, 3000);
                    fetchUserOrders(UserInfo?._id)
                } else {
                    handlePayment(result.data.data)
                }
                if (CartItems.length > 0) {
                    const empty = await apiHelper.emptyUserCart(UserInfo?._id)
                    console.log(empty)
                    if (empty.status === 200) {
                        fetchUserCart(UserInfo?._id)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        < div className='CheckoutScreen'>
            <div className="container my-3">
                <div className="h4 text-primary">Confirm Your Details</div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {
                            CartItems?.length > 0 ? CartItems?.map((data) => {
                                return <div className="card my-2 p-3">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-5 col-md-3">
                                            <div className="text-center">
                                                <img className='img-fluid' src={data.url + data.product?.img?.path} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="line"></div>
                                        </div>
                                        <div className="col-5 col-md-7">
                                            <div className="h5">{data?.product?.model}</div>
                                            <div className="h4 text-success my-2">₹ {data?.product?.price}</div>
                                            <div className="h5 text-primary my-2">Quantity : {data?.qty}</div>
                                        </div>
                                    </div>
                                </div>
                            }) :
                                < div className="card my-2 p-3" >
                                    <div className="row d-flex align-items-center">
                                        <div className="col-5 col-md-3">
                                            <div className="text-center">
                                                <img src={Product?.url + Product?.img?.path} alt="" width={"100%"} />

                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="line"></div>
                                        </div>
                                        <div className="col-5 col-md-7">
                                            <div className="h5">{Product?.model}</div>
                                            <div className="h4 text-success my-2">₹ {Product?.price}</div>
                                            <div className="h5 text-primary my-2">Quantity : {"1"}</div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="col-12 col-md-5 mt-2">
                        <div className="card p-3 mb-2">
                            <div className="h4 text-primary">Product Details</div>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div>Product Prices : </div>
                                    <div>₹ {CartTotalDetails?.totalPrice || Product?.price}</div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>Total Item : </div>
                                    <div>{CartTotalDetails?.totalItem || 1}</div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>Total Price : </div>
                                    <div>₹ {Math.floor(CartTotalDetails?.totalPrice) || (Product?.price)}</div>
                                </div>

                            </div>
                        </div>
                        <div className="card p-3 my-2">
                            <div className="h4 text-primary">Address Details</div>
                            <hr />
                            <div>
                                <div> {Address?.address}{Address?.area},</div>
                                <div>{Address?.city},</div>
                                <div> {Address?.state} - {Address?.pincode}</div>
                            </div>
                        </div>

                        <div className="card p-3 my-2">
                            Payment Method : {PaymentMethod === "Online" ? " Net & Mobile Banking / UPI / Credit Card" : "Cash On Delivery"}
                        </div>
                    </div>{extraLoader && <OrderSuccessLoader />}
                    <>
                        <div className="text-center my-3">
                            <div onClick={placeOrder} className="btn btn-primary w-100">
                                Place Order
                            </div>
                        </div>
                    </>

                    <div className="my-3">
                        <div onClick={() => {
                            if (ProductId) {
                                navigate("/product/" + ProductId)
                            } else {
                                navigate(path.cart)
                            }
                        }} style={{ cursor: "pointer" }}>
                            <EditNoteIcon /> Add / Remove / Edit any details
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
