import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
import path from './Common/Path';
import DashboardScreen from './Screen/Dashboard/DashboardScreen';
import CategoryScreen from './Screen/Category/CategoryScreen';
import GalleryScreen from './Screen/Gallery/GalleryScreen';
import ProductScreen from './Screen/Product/ProductScreen';
import OrderScreen from './Screen/Order/OrderScreen';
import LoginScreen from './Screen/User/LoginScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import UserScreen from './Screen/User/UserScreen';
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

  useEffect(() => {
    if (Auth) {
      setUserInfo(jwtDecode(Auth))
    } else {
      if (localStorage.getItem("token")) {
        setAuth(localStorage.getItem("token"))
        setUserInfo(jwtDecode(localStorage.getItem("token")))
      }
      setUserInfo(null)
    }
  }, [Auth])
  return (
    <BrowserRouter>
      <Routes>{
        UserInfo?._id ? <>
          <Route path={path.login} element={<LoginScreen />} />
          <Route path={path.dashboard} element={<Layout UserInfo={UserInfo} component={<DashboardScreen UserInfo={UserInfo} />} />} />
          <Route path={path.category} element={<Layout UserInfo={UserInfo} component={<CategoryScreen />} />} />
          <Route path={path.gallery} element={<Layout UserInfo={UserInfo} component={<GalleryScreen />} />} />
          <Route path={path.product} element={<Layout UserInfo={UserInfo} component={<ProductScreen UserInfo={UserInfo} />} />} />
          <Route path={path.order} element={<Layout component={<OrderScreen UserInfo={UserInfo} />} />} />
          <Route path={path.user} element={<Layout component={<UserScreen UserInfo={UserInfo} />} />} />
          <Route path={path.login} element={<Layout UserInfo={UserInfo} component={<LoginScreen UserInfo={UserInfo} setAuth={setAuth} />} />} />
        </> : <>
          <Route path='*' element={<LoginScreen setAuth={setAuth} />} />
        </>
      }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
