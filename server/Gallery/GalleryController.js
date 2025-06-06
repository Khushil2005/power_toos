const { httpI_S_E, httpsuccess, httpErrors, App_URL } = require("../Constant")
const app_Url = App_URL || process.env.App_URL
const Randomstring = require("randomstring");
const galleryModel = require("./GalleryModel");

class GalleryController {
    async uploadFile(req, res) {
        try {
            const files = req.files?.file
            if (!files) throw httpErrors[500]
            const uploadFile = []
            const fileArray = Array.isArray(files) ? files : [files]
            for (let i = 0; i < fileArray.length; i++) {
                const file = fileArray[i]
                const originalFileName = file?.name
                let fileName = Randomstring.generate({ length: 5, charset: "alphabetic" })
                let ext = originalFileName.split(".").pop()
                fileName += "." + ext
                let filepath = "/public/" + fileName
                await file.mv("." + filepath)
                const result = await galleryModel.model.create({
                    name: fileName,
                    title: originalFileName,
                    path: filepath
                })
                if (!files) throw httpErrors[500]
                uploadFile.push({ url: app_Url + filepath })
            }
            return res.status(200).send({ message: httpsuccess, data: uploadFile })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
    async listGallery(req, res) {
        try {
            const result = await galleryModel.model.find({}, {
                name: true,
                title: true,
                path: true,
                url: { $concat: [app_Url, "$path"] }
            }).sort({ "createdAt": -1 })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpsuccess, data: result })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: httpI_S_E })
        }
    }
}
const galleryController = new GalleryController()

module.exports = galleryController