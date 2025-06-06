import React, { useEffect, useState } from 'react'
import apiHelper from '../../Common/ApiHelper'

export default function GalleryScreen() {
    const [Gallery, setGallery] = useState([])

    async function getGallery() {
        try {
            const result = await apiHelper.listGallery()
            setGallery(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGallery()
    }, [])


    async function uploadFile(e) {
        try {
            const formData = new FormData()
            for (let i = 0; i < e.target.files.length; i++) {
                formData.append("file", e.target.files[i])
                console.log(e.target.files[i])
            }
            const result = await apiHelper.uploadfile(formData)
            if (result.status === 200) {
                getGallery()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='GalleryScreen'>
            <div className="d-flex justify-content-between align-items-center">
                <div className="h4 text-primary">Gallery</div>
                <div>
                    <label className='btn btn-outline-primary' htmlFor="file">
                        <input onChange={(e) => uploadFile(e)} type="file" id='file' hidden multiple />
                        Add Image
                    </label>
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row">
                    {
                        Gallery && Gallery?.map((data) => {
                            return <div className="col-6 col-lg-2 my-2">
                                <div className="border border-1 border-primary rounded-3 p-1 mb-2 ">
                                    <img src={data.url} alt={data.title} width={"100%"} height="150px" />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
