import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import CasesIcon from '@mui/icons-material/Cases';
import { useNavigate } from 'react-router-dom';
import Path from '../Constant/Path';
import { Badge } from '@mui/material';

export default function Header({ setAuth, CartItems, UserInfo, setCartItems, Orders, setOrder }) {
    const navigate = useNavigate()

    return (
        <div className='Header shadow pt-1'>
            <div className="mx-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate(Path.home)} className="logo h2 text-primary p-2 p-md-0">
                        Power Tools
                    </div>
                    <div className="head_icons d-none d-md-block">
                        <div className="d-flex">
                            <div onClick={() => {
                                if (UserInfo?._id) {
                                    navigate(Path.cart)
                                } else {
                                    navigate(Path.login)
                                }
                            }} className='btn'>
                                <div className='text-center'>
                                    <Badge badgeContent={CartItems?.length} >
                                        <ShoppingBagIcon className='' />
                                    </Badge>
                                </div>
                                <div className=" text-center">Cart</div>
                            </div>
                            <div onClick={() => {
                                if (UserInfo?._id) {
                                    navigate(Path.order)
                                } else {
                                    navigate(Path.login)
                                }
                            }} className='btn'>
                                <div className='text-center'>
                                    <Badge badgeContent={Orders?.length} color="primary">
                                        <CasesIcon className='' />
                                    </Badge>
                                </div>
                                <div className="text-center">Order</div>
                            </div>
                            <div className='btn profile'>
                                <div className='text-center'>
                                    <PersonIcon className='' />
                                </div>
                                <div className=" text-center">Profile</div>
                                <div className="profile_drop">
                                    <div className="p-2 card">
                                        <div className="h6 text-primary">Hello, Welcome</div>
                                        <div className="text-success h6">{UserInfo?._id ? UserInfo?.fullName : "Guest User"}</div>
                                        <div onClick={() => {
                                            if (UserInfo?._id) {
                                                localStorage.removeItem("token")
                                                setAuth("")
                                                navigate(Path.home)
                                                setCartItems([])
                                                setOrder([])
                                            } else {
                                                navigate(Path.login)
                                            }
                                        }} className="btn btn-primary">{UserInfo?._id ? "Log out" : "Log in"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}