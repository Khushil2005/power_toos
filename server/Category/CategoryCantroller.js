const { httpErrors, httpI_S_E, httpsuccess } = require("../Constant")
const Category = require("../Data")
const categoryModel = require("./CategoryModel")

class CategoryController {
    async createCategory(req, res) {
        try {
            const { name, type, alias } = req.body
            if (!name || !type || !alias) throw httpErrors[500]
            const result = await categoryModel.model.create({ ...req.body })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async listCategory(req, res) {
        try {
            const result = await categoryModel.model.find()
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async getCategoryById(req, res) {
        try {
            const { id } = req.body
            const result = await categoryModel.model.findOne({ _id: id })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async updateCategory(req, res) {
        try {
            const { name, alias, type, id } = req.body
            if (!name || !alias || !type || !id) throw httpErrors[400]
            const result = await categoryModel.model.updateOne({ _id: id }, { name: name, alias: alias, type: type })
            if (!result || result.modifiedCount <= 0) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async deleteCategory(req, res) {
        try {
            const { id } = req.params
            const result = await categoryModel.model.deleteOne({ _id: id })
            if (!result || result.deletedCount <= 0) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    // async insertCategory() {
    //     try {

    //         const data = [...Category]
    //         for (let i = 0; i < data.length; i++) {
    //             const category = await categoryModel.model.create({ ...data[i] })
    //             if (!category) {
    //                 console.log("Category Not Craeted")
    //                 return
    //             }
    //         }
    //         console.log("Added")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}
const categoryController = new CategoryController()

module.exports = categoryController