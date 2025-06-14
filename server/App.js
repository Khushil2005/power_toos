const express = require("express")
const cors = require("cors")
const { PORT } = require("./Constant")
const connectDb = require("./Connection")
const categoryRouter = require("./Category/CategoryRouter")
const userRouter = require("./User/UserRouter")
const GalleryRouter = require("./Gallery/GalleryRouter")
const productRouter = require("./Product/ProductRouter")
const cartRouter = require("./Cart/CartRouter")
const addressRouter = require("./Address/AddressRouter")
const orderRouter = require("./Order/OrderRouter")
const productController = require("./Product/ProductController")
const categoryController = require("./Category/CategoryCantroller")
require("dotenv").config()

const app = express()
app.use(cors({
    origin: ['https://power-toos-74rz.vercel.app', 'https://power-toos.vercel.app'],
    credentials: true
}));
// app.options('*', cors());
app.use(express.json())
connectDb()
// productController.orderlist()
app.use("/public", express.static("./public"))
app.use("/category", categoryRouter)
app.use("/user", userRouter)
app.use("/gallery", GalleryRouter)
app.use("/address", addressRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)

app.get("/", (req, res) => {
    return res.send({ message: "Success" })
})

app.listen(PORT || 5000, () => {
    console.log("Server Started")
})