const express = require("express")
const productController = require("./ProductController")

const productRouter = express.Router()

productRouter.post("/create", productController.createProduct)
productRouter.post("/list", productController.listProduct)
productRouter.get("/list/:id", productController.getProductById)
productRouter.put("/update", productController.updateproduct)
productRouter.delete("/delete/:id", productController.deleteProduct)


module.exports = productRouter