const express = require("express")
const cartController = require("./CartController")

const cartRouter = express.Router()

cartRouter.post("/create", cartController.addToCart)
cartRouter.get("/:userId", cartController.listCart)
cartRouter.get("/list/:id", cartController.getCartById)
cartRouter.delete("/delete/:id", cartController.deleteCartById)
cartRouter.delete("/empty/:userId", cartController.emptyCart)

module.exports = cartRouter