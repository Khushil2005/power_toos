import { Button, ButtonGroup, patch } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';
import path from '../../Constant/Path';
import apiHelper from '../../Constant/ApiHelper';
import { CartContext } from '../../Hooks/cartProvider';

export default function CartScreen({ fetchUserCart, UserInfo }) {
    const navigate = useNavigate()
    const { getCartData, cartItems: CartItems, setcartItems, CartTotalDetails } = useContext(CartContext)


    async function qtyHandler(product, qty) {
        try {
            const data = {
                productId: product,
                userId: UserInfo?._id,
                qty: qty
            }
            const result = await apiHelper.addToCart(data)
            if (result.status === 200) {
                getCartData(UserInfo?._id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteHandler(id) {
        try {
            const result = await apiHelper.deleteCartItems(id)
            if (result.status === 200) {
                getCartData(UserInfo?._id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCartData(UserInfo?._id)
    }, [])


    return (
        <div className='CartScreen pb-5 mb-5'>
            {
                CartItems && CartItems.length > 0 ? <div className="container my-3">
                    <div className="h4 text-primary">Your Cart <span>| |</span> <span className='text-muted h5'>{CartItems?.length} Items</span></div>
                    <div className="row">
                        <div className="col-12 col-md-7">
                            {
                                CartItems && CartItems?.map((data) => {
                                    return <div className="card my-2 p-3">
                                        <div className="row">
                                            <div className="text-end">
                                                <div onClick={() => deleteHandler(data._id)} className="btn m-0 py-0 ">
                                                    <DeleteIcon color='error' />
                                                </div>
                                            </div>
                                        </div>
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
                                                <ButtonGroup className="w-75 my-3" variant="outlined" aria-label="Basic button group">
                                                    <Button disabled={data.qty >= 20} onClick={() => qtyHandler(data.product?._id, 1)} sx={{ borderColor: "#3e2723", color: "#3e2723" }}>
                                                        <AddIcon />
                                                    </Button>
                                                    <Button sx={{ borderColor: "#3e2723", color: "#3e2723" }}>
                                                        {data.qty}
                                                    </Button>
                                                    <Button disabled={data.qty <= 1} onClick={() => qtyHandler(data.product?._id, -1)} sx={{ borderColor: "#3e2723", color: "#3e2723" }}>
                                                        <RemoveIcon />
                                                    </Button>
                                                </ButtonGroup>

                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            <div onClick={() => navigate(path.home)} className="text-primary text-center my-2">Add More Product...</div>
                        </div>
                        <div className="col-12 col-md-5 mt-2">
                            <div className="card p-3">
                                <div className="h4 text-primary">Product Details</div>
                                <hr />
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <div>Product Prices : </div>
                                        <div>₹ {CartTotalDetails?.productPrice}</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>Total Item : </div>
                                        <div>{CartTotalDetails?.totalItem}</div>
                                    </div>
                                    {/* <div className="d-flex justify-content-between">
                                        <div>Total Discount : </div>
                                        <div>₹ {Math.floor(CartTotalDetails?.totalDiscount)}</div>
                                    </div> */}
                                    {/* <hr /> */}
                                    <div className="d-flex justify-content-between">
                                        <div>Total Price : </div>
                                        <div>₹ {Math.floor(CartTotalDetails?.totalPrice)}</div>
                                    </div>
                                    <hr />
                                    <div className="text-center mt-3">
                                        <div onClick={() => navigate(path.address)} className="btn btn-primary w-50">Continue</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                        <div className='w-50'>
                            <div className="text-center">
                                <img className='img-fluid' src="./assets/grocery.gif" alt="" />
                            </div>
                            <div className="text-center">
                                <div onClick={() => navigate(path.home)} className="btn btn-primary">Add Product in Cart</div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
