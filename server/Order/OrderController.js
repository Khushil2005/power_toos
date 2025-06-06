const Razorpay = require("razorpay");
const { httpErrors, httpsuccess, httpI_S_E, key_id, key_secrate, PaymentMethod } = require("../Constant");
const productModel = require("../Product/ProductModel");
const userModel = require("../User/UserModel");
const orderModel = require("./OrderModel");
const razorpay = new Razorpay({ key_id: key_id, key_secret: key_secrate })

class OrderController {
    async createOrder(req, res) {
        try {
            const { user, address, products, totalPrice, totalItems, paymentMethod } = req.body
            if (!user || !address || !products || !totalPrice || !totalItems || !paymentMethod) throw httpErrors[400]

            const finaleProduct = []
            for (let i = 0; i < products.length; i++) {
                const Product = await productModel.model.findOne({ _id: products[i].id })
                const data = {
                    ...Product._doc,
                    qty: products[i].qty
                }
                finaleProduct.push(data)
            }
            if (finaleProduct.length <= 0) throw httpErrors[500]
            delete req.body.products
            const result = await orderModel.model.create({ ...req.body, products: finaleProduct, paymentMethod: PaymentMethod[paymentMethod] })
            if (!result) throw httpErrors[500]
            const User = await userModel.model.findOne({ _id: user })

            const create = result._doc
            const option = {
                amount: totalPrice * 100,
                currency: "INR",
                receipt: create._id,
                payment_capture: 1
            }
            const response = await razorpay.orders.create(option)
            if (!response) throw httpErrors[500]
            const data = {
                ...create,
                razorpayDetails: {
                    ...response,
                    key_id: key_id
                }
            }
            return res.status(200).send({ message: httpsuccess, data: data })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })

        }
    }
    async verifyPayment(req, res) {
        try {
            const { orderId, razorpay_payment_id } = req.body
            const payment = await razorpay.payments.fetch(razorpay_payment_id)
            if (!payment) throw httpErrors[500]
            if (payment.status === "captured" || payment.status === "created" || payment.status === "authorized") {
                await orderModel.model.updateOne({ _id: orderId }, { paymentStatus: 1 })
                const data = {
                    orderId: orderId,
                    paymentINfo: {
                        email: payment.email,
                        phone: payment.contact
                    }
                }
                return res.status(200).send({ message: httpsuccess, data: data })
            }
            await orderModel.model.updateOne({ _id: orderId }, { paymentStatus: 2 })
            throw httpErrors[500]
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async getOrderById(req, res) {
        try {
            const { id } = req.params
            const result = await orderModel.model.findOne({ _id: id }).populate({ path: "address" })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }

    async listOrder(req, res) {
        try {
            const { userId } = req.params
            const user = await userModel.model.findOne({ _id: userId })
            if (user?.role === 3) {
                const result = await orderModel.model.find().populate([{ path: "user" }, { path: "address" }])
                if (!result) throw httpErrors[500]
                return res.status(200).send({ message: httpsuccess, data: result })
            }
            const result = await orderModel.model.find({ user: userId }).populate({ path: "address" })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }

    async updateOrder(req, res) {
        try {
            const { deliveryStatus, orderStatus, id } = req.body
            console.log(req.body)
            if (orderStatus === 2) {
                const result = await orderModel.model.updateOne({ _id: id }, {
                    paymentStatus: 2,
                    paymentMethod: "Null",
                    orderStatus: orderStatus,
                    deliveryStatus: 3
                })
                if (!result || result.modifiedCount <= 0) throw httpErrors[500]
            } else {
                if (deliveryStatus === 1) {
                    const result = await orderModel.model.findOneAndUpdate({ _id: id }, {
                        deliveryStatus: deliveryStatus,
                    })
                    console.log(result, "---Dispatch----")
                    if (!result || result.modifiedCount <= 0) throw httpErrors[500]
                }
                if (deliveryStatus === 2) {
                    const result = await orderModel.model.updateOne({ _id: id }, {
                        deliveryStatus: deliveryStatus,
                        paymentStatus: 1,
                        orderStatus: orderStatus
                    })
                    console.log(result, "---Completed----")
                    if (!result || result.modifiedCount <= 0) throw httpErrors[500]
                }
            }
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }


    async listOrderByStatus(req, res) {
        try {
            const { orderStatus, userId } = req.body
            console.log(req.body)
            const user = await userModel.model.findOne({ _id: userId })
            console.log(user)
            let result
            if (user.role === 1) {
                result = await orderModel.model.find().populate([{ path: "user" }, { path: "address" }])
            } else {
                result = await orderModel.model.find({ user: userId }).populate({ path: "address" })
            }
            if (orderStatus) {
                result = result.filter((item) => item.orderStatus === Number(orderStatus))
            }
            console.log(result)
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }

    calculateUserScore = async (req, res) => {
        const { userId } = req.params
        const orders = await orderModel.model.find({ orderStatus: "Completed" })
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const userCompletedOrders = orders.filter(order =>
            order.userId.toString() === userId.toString() &&
            order.orderStatus === "Completed" &&
            new Date(order.createdAt).getMonth() === currentMonth &&
            new Date(order.createdAt).getFullYear() === currentYear
        );

        // Sum total amount
        const totalAmount = userCompletedOrders.reduce((sum, order) => {
            return sum + (order.totalPrice || 0);
        }, 0);

        // Score logic
        let score = 0;
        if (totalAmount >= 50000) {
            score = 100;
        } else {
            score = Math.floor((totalAmount / 50000) * 100);
        }

        const data = {
            userId,
            totalAmount,
            score,
            month: currentMonth + 1,
            year: currentYear
        };
        return res.status(200).send({ message: httpSuccess, data: data })
    };


}

const orderController = new OrderController()
module.exports = orderController