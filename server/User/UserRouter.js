const express = require("express")
const userController = require("./UserController")
const userRouter = express.Router()

userRouter.post("/register", userController.registerUser)
userRouter.post("/login", userController.loginUser)
userRouter.post("/list", userController.listUser)
userRouter.delete("/delete/:id", userController.deleteUser)

module.exports = userRouter