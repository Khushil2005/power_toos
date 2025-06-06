const express = require("express")
const orderController = require("./OrderController")

const orderRouter = express.Router()

orderRouter.post("/create", orderController.createOrder)
orderRouter.post("/verify", orderController.verifyPayment)
orderRouter.get("/:userId", orderController.listOrder)
orderRouter.get("/list/:id", orderController.getOrderById)
orderRouter.post("/list/status", orderController.listOrderByStatus)
orderRouter.get("/score/:userId", orderController.calculateUserScore)
orderRouter.put("/update", orderController.updateOrder)

module.exports = orderRouter