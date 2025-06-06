const { data } = require("react-router-dom")
const { App_URL, httpI_S_E, httpsuccess, httpErrors } = require("../Constant")
const productModel = require("./ProductModel")
const galleryModel = require("../Gallery/GalleryModel")
const categoryModel = require("../Category/CategoryModel")
const appUrl = App_URL || process.env.App_URL
class ProductController {

    async createProduct(req, res) {
        try {
            const { model, capacity, img, speed, price } = req.body
            if (!model || !capacity || !img || !speed || !price) throw httpErrors[400]
            const result = await productModel.model.create({ ...req.body })
            if (!result) throw httpErrors[500]
            for (let i = 0; i < sizes.length; i++) {
                const data = {
                    model: sizes[i].sizes,
                    capacity: sizes[i].capacity,
                    speed: sizes[i].speed,
                    price: sizes[i].price,
                    product: result?._id
                }
                const result = await productModel.model.create({ ...data })
                if (!result) throw httpErrors[500]
            }
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async listProduct(req, res) {
        try {
            const { category } = req.body
            const result = await productModel.model.find({}, {
                model: true,
                capacity: true,
                speed: true,
                price: true,
                category: true,
                img: true,
                url: appUrl
            }).populate([{ path: "category" }, { path: "img" }])
            if (!result) throw httpErrors[500]
            if (category) {
                if (category === "main") {
                    const Product = result.filter(x => x.category?.alias.split("_")[1] === category)

                    return res.status(200).send({ message: httpsuccess, data: Product })
                } else {
                    const Product = result.filter(x => x.category?.alias.split("_")[0] === category)
                    return res.status(200).send({ message: httpsuccess, data: Product })
                }
            }
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async getProductById(req, res) {
        try {
            const { id } = req.params
            const result = await productModel.model.findOne({ _id: id }, {
                model: true,
                capacity: true,
                speed: true,
                price: true,
                category: true,
                img: true,
                url: appUrl
            }).populate([{ path: "category" }, { path: "img" }])
            if (!result) throw httpErrors[500]
            const Product = {
                ...result._doc,
            }
            return res.status(200).send({ message: httpsuccess, data: Product })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async updateproduct(req, res) {
        try {
            const { img, category, id } = req.body
            console.log(req.body)
            if (!title || !content || !highlights || !rating || !numReviews || !img || !category || !id) throw httpErrors[400]
            const result = await productModel.model.updateOne({ _id: id }, { ...req.body })
            if (!result || result.updatedCount <= 0) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params
            const result = await productModel.model.findOneAndDelete({ _id: id })
            if (!result || result.deletedCount <= 0) throw httpErrors[500]
            const data = await varientModel.model.deleteMany({ product: result._id })
            if (!result || data.deletedCount <= 0) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpErrors })
        }
    }
    // async listProductByIdCategory(req, res) {
    //     try {
    //         const { category } = req.body
    //         const result = await productModel.model.findOne({}, {
    //             title: true,
    //             content: true,
    //             Highlight: true,
    //             rating: true,
    //             numReview: true,
    //             img: true,
    //             sizes: true,
    //             category: true,
    //             url: appUrl
    //         }).populate([{ path: "category" }, { path: "img" }])
    //         if (!result) throw httpErrors[500]
    //         const product = result.filter((item) => item.category?.type === category)
    //         if (!result) throw httpErrors[500]
    //         return res.status(200).send({ message: httpSuccess, data: result })
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({ message: httpISE })
    //     }
    // }


    // async addProduct() {
    //     try {
    //         const gallery = await galleryModel.model.find()
    //         const category = await categoryModel.model.find()
    //         if (!category) {
    //             console.log("category Not FOund")
    //             return
    //         }
    //         const data = [...Products]
    //         for (let i = 0; i < category.length; i++) {
    //             for (let j = 0; j < data.length; j++) {
    //                 if (category[i].name === data[j].category.name) {
    //                     const product = await productModel.model.create({ ...data[j], img: gallery[i]._id, category: category[i]._id })
    //                     if (!product) {
    //                         console.log("Product Not Created")
    //                         return
    //                     }
    //                 }
    //             }

    //         }
    //         console.log("Added")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    //     async orderlist() {
    //         try {
    //             const product = await productModel.model.find()
    //             const gallery = await galleryModel.model.find()
    //             console.log(product.length, gallery.length)

    //             for (let i = 0; i < product.length; i++) {
    //                 const result = await productModel.model.updateOne({ _id: product[i]._id }, { img: gallery[i]._id })
    //                 if (!result || result.modifiedCount <= 0) {
    //                     console.log("Error")
    //                 }
    //             }
    //             console.log("Aded")
    //         } catch (error) {
    //             console.log(error);

    //         }
    //     }
}

const productController = new ProductController()
module.exports = productController