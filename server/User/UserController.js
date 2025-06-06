const { httpI_S_E, httpErrors, httpU_A_E, JWT_SECRETS, httpsuccess, httpU_N_F } = require("../Constant");
const userModel = require("./UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

class UserController {
    async registerUser(req, res) {
        try {
            const { fullName, email, phone, password } = req.body
            if (!fullName || !email || !phone || !password) httpErrors[400]
            const User = await userModel.model.findOne({ phone: phone })
            if (User) return res.status(500).send({ message: httpU_A_E })
            const encryptedPassword = bcrypt.hashSync(password, 5)
            if (!encryptedPassword) throw httpErrors[500]
            delete req.body.password
            const result = await userModel.model.create({ ...req.body, password: encryptedPassword })
            if (!result) throw httpErrors[500]
            const payload = result._doc
            const token = jwt.sign(payload, JWT_SECRETS, { expiresIn: "30d" })
            if (!token) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, token })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }

    }
    async loginUser(req, res) {
        try {
            const { phone, password } = req.body
            if (!phone || !password) throw httpErrors[400]
            const User = await userModel.model.findOne({ phone: phone })
            if (!User) return res.status(500).send({ message: httpU_N_F })
            if (!bcrypt.compareSync(password, User.password)) throw httpErrors[401]
            const payload = User._doc
            const token = jwt.sign(payload, JWT_SECRETS, { expiresIn: "30d" })
            if (!token) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, token })
        } catch (error) {
            return res.status(500).send({ message: httpI_S_E })

        }
    }
    async listUser(req, res) {
        try {
            const { id } = req.body
            if (!id) throw httpErrors[400]
            const result = await userModel.model.find().populate({ path: "id" })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params
            const result = await userModel.model.deleteOne({ _id: id })
            if (!result || result.deletedCount <= 0) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }

    async insertUser() {
        for (let i = 0; i < users.length; i++) {
            users[i].password = bcrypt.hashSync(users[i].password, 5)
        }
        await userModel.model.insertMany(users)
        console.log("Added");
    }
}
const userController = new UserController()
module.exports = userController