import { createContext, useEffect, useState } from "react"
import apiHelper from "../Constant/ApiHelper"


export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setcartItems] = useState([])
    const [CartTotalDetails, setCartTotalDetails] = useState({
        totalPrice: "",
        productPrice: "",
        totalItem: "",
        totalDiscount: ""
    })

    const getCartData = async (userId) => {
        const data = await apiHelper.listCart(userId)
        if (data?.status === 200) {
            setcartItems(data?.data?.data)
        }
    }
    useEffect(() => {
        if (cartItems) {
            let productPrice = 0
            let totalItem = 0

            for (let i = 0; i < cartItems.length; i++) {
                let subTotal = cartItems[i]?.product?.price * cartItems[i]?.qty
                productPrice += subTotal
                totalItem += cartItems[i]?.qty
            }

            setCartTotalDetails({
                totalItem: totalItem,
                productPrice: productPrice,
                totalPrice: productPrice
            })
        }
    }, [cartItems])

    return (
        <CartContext.Provider value={{ cartItems, setcartItems, getCartData, CartTotalDetails }} >
            {children}
        </CartContext.Provider>
    )
}