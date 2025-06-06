const { httpErrors, httpsuccess, httpI_S_E } = require("../Constant")
const addressModel = require("./AddressModel")

class AddressController {
    async createAddress(req, res) {
        try {
            const { address, area, city, state, pincode, userId } = req.body
            if (!address || !area || !city || !state || !pincode || !userId) throw httpErrors[400]
            const result = await addressModel.model.create({ ...req.body })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async listAddress(req, res) {
        try {
            const { userId } = req.params
            const result = await addressModel.model.find({ userId: userId })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async getAddressById(req, res) {
        try {
            const { id } = req.params
            const result = await addressModel.model.findOne({ _id: id })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: httpI_S_E })
        }
    }
}

const addressController = new AddressController()


module.exports = addressController