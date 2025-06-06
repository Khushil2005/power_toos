import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiHelper from '../../Constant/ApiHelper';
import path from '../../Constant/Path';
import Footer from '../../Component/Footer';

export default function ProductScreen({ UserInfo, fetchUserCart, CartItems }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [Products, setProducts] = useState({})

    async function getProducts() {
        try {
            const result = await apiHelper.getProductById(id)
            setProducts(result.data.data)
            const data = {
                category: result.data.data?.category?.alias?.split("_")[0],
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [id])
    async function addToCart() {
        try {
            if (!UserInfo?._id) return navigate(path.login)
            const data = {

                userId: UserInfo?._id,
                productId: id,
                qty: 1
            }
            const result = await apiHelper.addToCart(data)
            if (result.status === 200) {
                fetchUserCart(UserInfo?._id)
                navigate(path.cart)
            }
        } catch (error) {
            console.log(error)
        }
    }


    function buyNowHandler() {
        return navigate(path.address + "?productId=" + id)
    }
    const index = CartItems?.findIndex((x) => x.product._id === id)

    return (
        <div className='ProductScreen'>
            <div className="container mt-2 p-3">
                <div className="row d-flex align-items-start  pb-4">
                    <div className="col-12 col-md-5">
                        <div className="card p-3  my-2">
                            <img src={Products?.url + Products?.img?.path} alt="" width={"100%"} />
                        </div>
                    </div>
                    <div className="col-12 col-md-7 my-2">
                        <div className="border border-2 rounded-2 p-3">
                            <div className="">
                                <div className="h2 text-primary">{Products.model}</div>
                                <hr className='m-0' />
                            </div>
                            <div className="m-3">
                                <div className="text-muted h5">{Products?.category?.type}</div>
                                <div className="d-flex gap-3 align-items-end">
                                    <div className="text-success h5">{Products?.speed}</div>
                                    <div className=" h5"> {Products?.capacity}</div>
                                </div>
                                <div className="text-primary h4">₹{Products?.price}</div>
                            </div>
                        </div>
                        <div className="d-none d-md-flex gap-3 mt-3">
                            <button onClick={() => {
                                if (index >= 0) {
                                    navigate(path.cart)
                                } else {
                                    console.log("else");
                                    addToCart()
                                }
                            }}
                                className="btn btn_outline  w-50 justify-content-between align-items-center">{index >= 0 ? "Go to Cart" : "Add to Cart"}</button>
                            <button onClick={buyNowHandler} className="btn btn_main  w-50">Buy Now</button>
                        </div>
                    </div>
                    <div className='Footer d-md-none d-block'>
                        <div className="d-flex gap-2 mt-3 p-2">
                            <button onClick={() => {
                                if (index >= 0) {
                                    navigate(path.cart)
                                } else {
                                    console.log("else");
                                    addToCart()
                                }
                            }}
                                className="btn btn_outline  w-50 justify-content-between align-items-center">{index >= 0 ? "Go to Cart" : "Add to Cart"}</button>
                            <button onClick={buyNowHandler} className="btn btn_main  w-50">Buy Now</button>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
