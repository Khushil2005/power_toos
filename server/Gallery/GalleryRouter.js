const express = require("express")
const fileUpload = require("express-fileupload")
const galleryController = require("./GalleryController")
const GalleryRouter = express.Router()

GalleryRouter.use(fileUpload())

GalleryRouter.post("/upload", galleryController.uploadFile)
GalleryRouter.get("/list", galleryController.listGallery)

module.exports = GalleryRouter