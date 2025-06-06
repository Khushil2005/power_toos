const { default: mongoose } = require("mongoose");

class OrderModel {
    constructor() {
        this.schema = new mongoose.Schema({
            user: { type: mongoose.Types.ObjectId, ref: "tbl_users", require: true },
            address: { type: mongoose.Types.ObjectId, ref: "tbl_addresses", require: true },
            products: { type: Array, require: true },
            totalPrice: { type: Number, required: true },
            totalItems: { type: Number, required: true },
            paymentMethod: { type: Number, required: true, default: 0 },
            paymentStatus: { type: Number, required: true, default: 0 },
            deliveryStatus: { type: Number, required: true, default: 0 },
            orderStatus: { type: Number, required: true, default: 0 },
            deliveryDate: { type: Date, required: true, default: Date.now },
        }, { timestamps: true })
        this.model = mongoose.model("tbl_orders", this.schema)
    }
}
const orderModel = new OrderModel()
module.exports = orderModel
