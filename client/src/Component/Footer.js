import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import path from '../Constant/Path';


export default function Footer({ UserInfo }) {
    const location = useLocation();
    const navigate = useNavigate()
    const Path = location.pathname;

    const hideFooterPaths = ['/login', '/register'];
    const shouldHideFooter =
        hideFooterPaths.includes(Path) || Path.startsWith('/product/');

    if (shouldHideFooter) return null;

    return (
        <div className="footer fixed-bottom d-block d-md-none bg-light border-top">
            <div className="container-fluid">
                <div className="row text-center py-2">
                    <div className="col">
                        <div className={location.pathname === path.home ? "text-primary" : "text-muted"} onClick={() => navigate(path.home)}>
                            <div>
                                <HomeIcon />
                            </div>
                            <div>Home</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className={location.pathname === path.cart ? "text-primary" : "text-muted"} onClick={() => {
                            if (UserInfo?._id) {
                                navigate(path.cart)
                            } else {
                                navigate(path.login)
                            }
                        }}>
                            <div>
                                <ShoppingCartIcon />
                            </div>
                            <div>Cart</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className={location.pathname === path.order ? "text-primary" : "text-muted"} onClick={() => {
                            if (UserInfo?._id) {
                                navigate(path.order)
                            } else {
                                navigate(path.login)
                            }
                        }}>
                            <div>
                                <ShoppingBagIcon />
                            </div>
                            <div>Order</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className={location.pathname === path.profile ? "text-primary" : "text-muted"} onClick={() => navigate(path.profile)}>
                            <div>
                                <PersonIcon />
                            </div>
                            <div>Profile</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
