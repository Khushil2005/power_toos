import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Component/Footer';
import Header from './Component/Header';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'
import AddressScreen from './Screens/Address/AddressScreen';
import CheckoutScreen from './Screens/Checkout/CheckoutScreen';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import LoginScreen from './Screens/User/LoginScreen';
import RegistrationScreen from './Screens/User/RegistrationScreen';
import ProductScreen from './Screens/Product/ProductScreen';
import HomeScreen from './Screens/Home/HomeScreen';
import CartScreen from './Screens/Cart/CartScreen';
import { CartProvider } from './Hooks/cartProvider';
import apiHelper from './Constant/ApiHelper';
import path from './Constant/Path';
import OrderDetailsScreen from './Screens/Order/OrderDetailsScreen';
import OrderScreen from './Screens/Order/OrderScreen'

function App() {
  const JWTDECODE = (arg) => {
    try {
      return jwtDecode(arg)
    } catch (error) {
      return null
    }
  }
  const [Auth, setAuth] = useState(localStorage.getItem("token"))
  const [UserInfo, setUserInfo] = useState(JWTDECODE(localStorage.getItem("token")))
  const [userCart, fetchUserCart] = useState()
  const [Order, setOrder] = useState([])

  async function getOrder(id) {
    try {
      const result = await apiHelper.listOrder(id)
      setOrder(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (UserInfo?._id) {
      getOrder(UserInfo?._id)
    }
  }, [Auth])


  useEffect(() => {
    if (Auth) {
      setUserInfo(JWTDECODE(Auth))
    } else {
      if (localStorage.getItem("token")) {
        setAuth(localStorage.getItem("token"))
        setUserInfo(JWTDECODE(localStorage.getItem("token")))
      }
      setUserInfo(null)
    }
  }, [Auth])




  return (
    <BrowserRouter>
      <CartProvider >
        <Header UserInfo={UserInfo} Orders={Order} setOrder={setOrder} setAuth={setAuth} />
        <main style={{ paddingTop: "50px" }}>
          <Routes>
            <Route path={path.home} element={<HomeScreen />} />
            <Route path={path.product} element={<ProductScreen UserInfo={UserInfo} fetchUserCart={fetchUserCart} />} />
            <Route path={path.login} element={<LoginScreen setAuth={setAuth} />} />
            <Route path={path.register} element={<RegistrationScreen setAuth={setAuth} />} />
            <Route path={path.profile} element={<ProfileScreen Orders={Order} setOrder={setOrder} UserInfo={UserInfo} setAuth={setAuth} />} />
            <Route path={path.cart} element={<CartScreen UserInfo={UserInfo} fetchUserCart={fetchUserCart} />} />
            <Route path={path.address} element={<AddressScreen UserInfo={UserInfo} />} />
            <Route path={path.checkout} element={<CheckoutScreen UserInfo={UserInfo} fetchUserCart={fetchUserCart} fetchUserOrders={getOrder} />} />
            <Route path={path.orderdetails} element={<OrderDetailsScreen UserInfo={UserInfo} fetchUserOrders={getOrder} />} />
            <Route path={path.order} element={<OrderScreen Orders={Order} UserInfo={UserInfo} />} />

          </Routes>
        </main>
        <Footer UserInfo={UserInfo} />
      </CartProvider>
    </BrowserRouter >
  );
}

export default App;
