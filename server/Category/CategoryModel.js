const { default: mongoose } = require("mongoose");

class CategoryModel {
    constructor() {
        this.shema = new mongoose.Schema({
            name: { type: String, require: true },
            type: { type: String, require: true },
            alias: { type: String, require: true, unique: true },
        }, { timestamps: true })
        this.model = new mongoose.model("tbl_categories", this.shema)
    }
}
const categoryModel = new CategoryModel()
module.exports = categoryModel