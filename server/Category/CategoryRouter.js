const express = require("express")
const categoryController = require("./CategoryCantroller")

const categoryRouter = express.Router()

categoryRouter.post("/create", categoryController.createCategory)
categoryRouter.get("/list", categoryController.listCategory)
categoryRouter.get("/list/:_id", categoryController.getCategoryById)
categoryRouter.put("/update", categoryController.updateCategory)
categoryRouter.delete("/delete/:id", categoryController.deleteCategory)



module.exports = categoryRouter 