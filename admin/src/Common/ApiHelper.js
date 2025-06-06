import axios from "axios"

class ApiHelper {
    constructor() {
        // this.baseUrl = "http://192.168.1.5:5000"
        // this.baseUrl = "http://192.168.215.65:5000"
        // this.baseUrl = "http://localhost:5000"
        this.baseUrl = "https://power-toos.onrender.com"
    }
    loginUser(data) {
        return axios.post(this.baseUrl + "/user/login", data)
    }
    listGallery() {
        return axios.get(this.baseUrl + "/gallery/list")
    }
    uploadfile(data) {
        return axios.post(this.baseUrl + "/gallery/upload", data)
    }
    createCategory(data) {
        return axios.post(this.baseUrl + "/category/create", data)
    }
    listCategory() {
        return axios.get(this.baseUrl + "/category/list")
    }
    getCategoryById(id) {
        return axios.get(this.baseUrl + "/category/list/" + id)
    }
    updateCategory(data) {
        return axios.put(this.baseUrl + "/category/update", data)
    }
    deleteCategory(id) {
        return axios.delete(this.baseUrl + "/category/delete/" + id)
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
    getProduct() {
        return axios.post(this.baseUrl + "/product/list")
    }
    listOrder(data) {
        return axios.post(this.baseUrl + "/order/list/status", data)
    }
    updateOrder(data) {
        return axios.put(this.baseUrl + "/order/update", data)
    }
    getOrderById(id) {
        return axios.get(this.baseUrl + "/order/list/" + id)
    }
}


const apiHelper = new ApiHelper

export default apiHelper