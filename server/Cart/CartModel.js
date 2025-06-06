const { default: mongoose } = require("mongoose");

class CartModel {
    constructor() {
        this.schema = new mongoose.Schema({
            product: { type: mongoose.Types.ObjectId, ref: "tbl_products", require: true },
            user: { type: mongoose.Types.ObjectId, ref: "tbl_users", require: true },
            qty: { type: Number, require: true, default: 1 }
        }, { timestamps: true })
        this.model = mongoose.model("tbl_carts", this.schema)
    }
}
const cartModel = new CartModel()

module.exports = cartModel
