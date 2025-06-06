const { data } = require("react-router-dom")
const { httpErrors, httpsuccess, App_URL, httpI_S_E } = require("../Constant")
const cartModel = require("./CartModel")

class CartController {
    async addToCart(req, res) {
        try {
            const { userId, qty, productId } = req.body
            if (!userId || !qty || !productId) throw httpErrors[400]
            const cart = await cartModel.model.findOne({ user: userId, product: productId })
            if (cart) {
                const totalqty = cart.qty + qty
                const update = await cartModel.model.updateOne({ user: userId, product: productId }, { qty: totalqty })
                if (!update || update.modifiedCount <= 0) throw httpErrors[500]
            } else {
                const result = await cartModel.model.create({ user: userId, product: productId, qty: qty })
                if (!result) httpErrors[500]
            }
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }

    async listCart(req, res) {
        try {
            const { userId } = req.params
            const result = await cartModel.model.find({ user: userId }, {
                product: true,
                user: true,
                qty: true,
                url: App_URL || process.env.App_URL
            }).populate([{ path: "user" }, { path: "product", populate: { path: "img" } }])
            if (!result) httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async getCartById(req, res) {
        try {
            const { id } = req.params
            const result = await cartModel.model.findOne({ _id: id }, {
                product: true,
                user: true,
                qty: true,
                url: App_URL || process.env.App_URL
            }).populate([{ path: "user" }, { path: "product" }, { path: "varient" }])
            if (!result) httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async deleteCartById(req, res) {
        try {
            const { id } = req.params
            const result = await cartModel.model.deleteOne({ _id: id })
            if (!result || result.deletedCount <= 0) httpErrors[500]
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async emptyCart(req, res) {
        try {
            const { userId } = req.params
            const result = await cartModel.model.deleteMany({ user: userId })
            if (!result || result.deletedCount <= 0) httpErrors[500]
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
}
const cartController = new CartController()

module.exports = cartController