const { default: mongoose } = require("mongoose")

class ProductModel {
    constructor() {
        this.schema = new mongoose.Schema({
            model: { type: String, required: true },
            capacity: { type: String, required: true },
            speed: { type: String, required: true },
            price: { type: Number, required: true },
            category: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_categories" },
            img: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_galleries" },
        }, { timestamps: true }),
            this.model = mongoose.model("tbl_products", this.schema)
    }
}
const productModel = new ProductModel()

module.exports = productModel