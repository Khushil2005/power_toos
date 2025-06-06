import axios from "axios"

class ApiHelper {
    constructor() {
        this.baseUrl = "http://192.168.1.5:5000"
        // this.baseUrl = "http://192.168.215.65:5000"
        this.baseUrl = "http://localhost:5000"
    }
    loginUser(data) {
        return axios.post(this.baseUrl + "/user/login", data)
    }
    registerUser(data) {
        return axios.post(this.baseUrl + "/user/register", data)
    }
    listProduct(data) {
        return axios.post(this.baseUrl + "/product/list", data)
    }
    createProduct(data) {
        return axios.post(this.baseUrl + "/product/create", data)
    }
    updateProduct(data) {
        return axios.put(this.baseUrl + "/product/update", data)
    }
    deleteProduct(id) {
        return axios.delete(this.baseUrl + "/product/delete/" + id)
    }
    filteredProduct(data) {
        return axios.post(this.baseUrl + "/product/filter", data)
    }
    getProductById(id) {
        return axios.get(this.baseUrl + "/product/list/" + id)
    }
    createAddress(data) {
        return axios.post(this.baseUrl + "/address/create", data)
    }
    listAddress(userId) {
        return axios.get(this.baseUrl + "/address/" + userId)
    }
    getAddressById(id) {
        return axios.get(this.baseUrl + "/address/list/" + id)
    }
    createOrder(data) {
        return axios.post(this.baseUrl + "/order/create", data)
    }
    verifyPayment(data) {
        return axios.post(this.baseUrl + "/order/verify", data)
    }
    listOrder(userId) {
        return axios.get(this.baseUrl + "/order/" + userId)
    }
    getOrderById(id) {
        return axios.get(this.baseUrl + "/order/list/" + id)
    }
    addToCart(data) {
        return axios.post(this.baseUrl + "/cart/create", data)
    }
    listCart(userId) {
        return axios.get(this.baseUrl + "/cart/" + userId)
    }
    deleteCartItems(id) {
        return axios.delete(this.baseUrl + "/cart/delete/" + id)
    }
    emptyUserCart(userId) {
        return axios.delete(this.baseUrl + "/cart/empty/" + userId)
    }
    listOrderByStatus(data) {
        return axios.post(this.baseUrl + "/order/list/status", data)
    }
    calculateUserScore(userId) {
        return axios.get(this.baseUrl + "/order/score/" + userId)
    }
    updateOrder(data) {
        return axios.put(this.baseUrl + "/order/update", data)
    }
}
const apiHelper = new ApiHelper()

export default apiHelper