import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import apiHelper from '../../Common/ApiHelper'
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AppBar, Button, FormControl, IconButton, InputLabel, List, MenuItem, Paper, Select, Toolbar, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EditNoteIcon from '@mui/icons-material/EditNote';
const paginationModel = { page: 0, pageSize: 5 };
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductScreen({ UserInfo }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        rerender()
        setOpen(false);
    };

    const [priceOpen, setpriceOpen] = React.useState(false);


    const handlePriceClose = () => {
        setpriceOpen(false);
    };

    const [Price, setPrice] = useState({
        id: "",
        price: "",


    })




    function priceRowDelete(id) {
        try {
            const updatedSize = productDetails.size?.filter((x) => x.id !== id);
            setproductDetails(prev => ({
                ...prev,
                size: updatedSize
            }));
            const index = productDetails.size?.findIndex((x) => x.id === id);
            if (index !== -1) {
                productDetails.size.splice(index, 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [Category, setCategory] = useState([])

    async function getCategory() {
        try {
            const result = await apiHelper.listCategory()
            setCategory(result.data.data)
        } catch (error) {
            console.log(row)
        }
    }

    useEffect(() => {
        getCategory()
        // eslint-disable-next-line
    }, [])


    const [productDetails, setproductDetails] = useState({
        model: "",
        capacity: "",
        speed: "",
        price: "",
        category: "",
        img: ""

    })
    const [row, setrow] = useState([])

    async function getProduct(id) {
        try {
            const data = {
                category: ""
            }
            const result = await apiHelper.listProduct(data)
            setrow(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line
    }, [])
    const column = [
        { field: "_id", headerName: 'Id', width: 250 },
        {
            field: "category", headerName: 'Category', width: 250, renderCell: (cell) => {
                return cell.row.category.name
            }
        },
        { field: "model", headerName: 'Model', width: 250 },
        { field: "capacity", headerName: 'Capacity', width: 100 },
        { field: "speed", headerName: 'Speed', width: 150 },
        { field: "price", headerName: '₹ Price', width: 150 },

    ]
    async function uploadFile(e) {
        try {
            const formData = new FormData()
            for (let i = 0; i < e.target.files.length; i++) {
                formData.append("file", e.target.files[i])
                console.log(e.target.files[i])
            }
            console.log(formData)
            const result = await apiHelper.uploadfile(formData)
            if (result.status === 200) {
                // getGallery()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [selectedImage, setselectedImage] = React.useState({});
    const [finaleImage, setfinaleImage] = React.useState({});

    const [imageOpen, setimageOpen] = React.useState(false);

    const handleClickImageOpen = () => {
        setimageOpen(true);
    };

    const handleImageClose = () => {
        setimageOpen(false);
        setselectedImage({})
    };

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

    const handleSaveImage = () => {
        setfinaleImage(selectedImage)
        setimageOpen(false)
    }
    async function createProduct() {
        try {
            const data = {
                model: productDetails.model,
                capacity: productDetails.capacity,
                speed: productDetails.speed,
                price: Number(productDetails.price),
                category: productDetails.category,
                img: finaleImage?._id,
            }
            const result = await apiHelper.createProduct(data)
            if (result.status === 200) {
                getProduct()
                rerender()
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function updateProduct() {
        try {
            const data = {
                model: productDetails.model,
                capacity: productDetails.capacity,
                speed: Number(productDetails.speed),
                price: Number(productDetails.price),
                category: productDetails.category,
                img: finaleImage?._id,
            }
            const result = await apiHelper.updateProduct(data)
            if (result.status === 200) {
                getProduct()
                rerender()
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [SelectedProduct, setSelectedProduct] = React.useState({
        model: "",
        capacity: "",
        speed: "",
        price: "",
        category: "",

    });
    const [orderOpen, setorderOpen] = React.useState(false);

    const handleOrderOpen = () => {
        setorderOpen(true);
    };

    const handleOrderClose = () => {
        setorderOpen(false);
    };

    async function deleteHandler(id) {
        try {
            const result = await apiHelper.deleteProduct(id)
            if (result.status === 200) {
                getProduct()
            }
        } catch (error) {
            console.log(error)
        }
    }



    function rerender() {
        setproductDetails({
            model: "",
            capacity: "",
            speed: "",
            price: "",
            category: "",
            img: "",
        })

        setfinaleImage({})
    }
    async function placeOrder() {
        try {
            const data = {
                user: UserInfo?._id,
                address: UserInfo?._id,
                products: [{
                    id: SelectedProduct.product,
                }],
                totalPrice: SelectedProduct.price,
                paymentMethod: "COD",
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='ProductScreen'>

            <div className="d-flex justify-content-between align-items-center">
                <div className="h4 text-primary">Product</div>
                <div>
                    <div onClick={handleClickOpen} className="btn btn-outline-primary">Add Product</div>
                </div>
            </div>
            <hr />
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={[...row]}
                    columns={[...column]}
                    getRowId={(x) => x._id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection={false}
                    sx={{ border: 0 }}
                />
            </Paper>

            {/* Add Product dailog  */}
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            sx: { width: '75vw' }, // ✅ Set width to 75% of the viewport
                        },
                    }}
                >
                    <DialogTitle>{productDetails?.id ? "Update Product" : "Add Product"}</DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-12 col-md-7">
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="model"
                                            name="model"
                                            label="Product model"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            value={productDetails.model}
                                            onChange={(e) => setproductDetails({ ...productDetails, model: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="capacity"
                                            name="capacity"
                                            label="Product capacity"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            value={productDetails.capacity}
                                            onChange={(e) => setproductDetails({ ...productDetails, capacity: e.target.value })}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="speed"
                                                    name="speed"
                                                    label="speed"
                                                    type="text"
                                                    fullWidth
                                                    variant="outlined"
                                                    value={productDetails.speed}
                                                    onChange={(e) => setproductDetails({ ...productDetails, speed: e.target.value })}
                                                />
                                            </div>

                                            <div className="col-md-6 col-12">
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="price"
                                                    name="price"
                                                    label="price"
                                                    type="text"
                                                    fullWidth
                                                    variant="outlined"
                                                    value={productDetails.price}
                                                    onChange={(e) => setproductDetails({ ...productDetails, price: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 mt-2">
                                {
                                    selectedImage?._id || finaleImage?._id ? <div onClick={handleClickImageOpen} className="border border-primary border-2 card" style={{ height: "190px" }}>
                                        <img src={selectedImage?.uri || finaleImage.url + finaleImage?.img?.path} alt="" width={"100%"} height={"100%"} />
                                    </div> : <div onClick={handleClickImageOpen} className="border border-primary p-3 card d-flex justify-content-center align-items-center" style={{ height: "190px" }}>
                                        <PhotoCameraBackIcon className='fs-2 text-primary' />
                                    </div>
                                }
                            </div>
                            <div className="col-12 my-2">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={productDetails.category || productDetails.category?.name}
                                        label="Category"
                                        margin='dense'
                                        onChange={(e) => setproductDetails({ ...productDetails, category: e.target.value })}
                                    >
                                        {
                                            Category && Category?.map((data) => {
                                                return <MenuItem value={data?._id}>{data.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="col-12 my-3">

                                {
                                    productDetails?.size?.length > 0 && <table className='w-100'>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Model</th>
                                                <th>Capacity</th>
                                                <th>Speed</th>
                                                <th>Price</th>
                                                {
                                                    !productDetails?.id && <th>Action</th>
                                                }

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                productDetails?.size?.map((data, index) => {
                                                    return <tr id={data?._id || data?.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{data?.model}</td>
                                                        <td> {data?.capacity}</td>
                                                        <td> {data?.speed}</td>
                                                        <td>₹{data?.price}</td>
                                                        {
                                                            !productDetails?.id &&
                                                            <td><button className='btn' onClick={() => priceRowDelete(data?.id)}><DeleteIcon className='text-danger' /></button></td>
                                                        }
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                }

                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className='btn btn-outline-primary' onClick={handleClose}>Cancel</button>
                        <button onClick={productDetails?.id ? updateProduct : createProduct} className='btn btn-primary'>{productDetails?.id ? "Update" : "Publish"}</button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>


            {/* Sizes / Prices  Dailog  */}
            <React.Fragment>
                <Dialog
                    open={priceOpen}
                    onClose={handlePriceClose}
                >
                    <DialogActions>
                        <button className='btn btn-outline-primary' onClick={handlePriceClose}>Cancel</button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>



            {/* Image Dailog  */}
            <React.Fragment>
                <Dialog
                    fullScreen
                    open={imageOpen}
                    onClose={handleImageClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar >
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleImageClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Select Image
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleSaveImage}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-3 col-lg-2 my-2 border border-primary card">
                                    <label className='d-flex justify-content-center align-items-center h-100' htmlFor="file">
                                        <input onChange={(e) => uploadFile(e)} type="file" id='file' hidden multiple />
                                        <PhotoCameraBackIcon className='fs-2 text-primary' />
                                    </label>
                                </div>
                                {
                                    Gallery && Gallery?.map((data) => {
                                        return <div className="col-12 col-md-3 col-lg-2 my-2">
                                            <div onClick={() => {
                                                if (selectedImage?._id === data?._id) {
                                                    setselectedImage({})
                                                } else {
                                                    setselectedImage(data)
                                                }
                                            }} className={selectedImage._id === data._id ? "card border-primary border-2 shadow" : "card"}>
                                                <img src={data.url} alt="" />
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </List>
                </Dialog>
            </React.Fragment>



            {/* Order Dailog  */}
            <React.Fragment>
                <Dialog
                    open={orderOpen}
                    onClose={handleOrderClose}
                    PaperProps={{
                        sx: {
                            width: { xs: '100vw', md: '50%' },
                            maxWidth: 'none', // Optional: allows it to exceed the default max width
                            margin: 0 // Optional: removes margin for full-width on small screens
                        }
                    }}
                >
                    <DialogTitle>Place Your Order</DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-12 col-md-7 my-2">
                                {
                                    SelectedProduct.id && <div className="card p-2 px-3 h-100">
                                        <div className="h6">Product model : {SelectedProduct?.model}</div>
                                        <div className="h6">Product Capacity : {SelectedProduct?.capacity}</div>
                                        <div className="h6">Product Speed : ₹ {SelectedProduct?.speed}</div>
                                        <div className="h6">Product price : ₹ {SelectedProduct?.price}</div>

                                    </div>
                                }
                            </div>
                            <div className="col-12 col-md-5 my-2">
                                <div className="card p-3 h-100">
                                    <div className="h5">Product Details</div>
                                    <hr />
                                    <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                            <div>Product Price : </div>
                                            <div>₹ {SelectedProduct.price}</div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div>Product Item : </div>
                                            <div>{ }</div>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <div>Total Price : </div>
                                            <div>₹ {SelectedProduct.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className='btn btn-primary' onClick={handleOrderClose}>Cancel</button>
                        <button className='btn btn-success' onClick={placeOrder} autoFocus>Place Order</button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div >
    )
}
