import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import apiHelper from '../../Common/ApiHelper';

const paginationModel = { page: 0, pageSize: 5 };

export default function CategoryScreen() {
    const [Error, setError] = React.useState({
        message: "",
        color: ""
    });

    React.useEffect(() => {
        if (Error.message) {
            const timer = setTimeout(() => {
                setError({ message: "", color: "" });
            }, 3000); // 3 seconds

            return () => clearTimeout(timer); // cleanup
        }
    }, [Error]);

    const [categoryDetails, setcategoryDetails] = useState({
        name: "",
        alias: "",
        type: "",
    })

    function rerender() {
        setcategoryDetails({
            name: "",
            alias: "",
            type: "",
            id: ""
        })
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        rerender()
        setOpen(false);
    };

    const [row, setrow] = useState([])

    async function getCategory() {
        try {
            const result = await apiHelper.listCategory()
            setrow(result.data.data)
        } catch (error) {
            console.log(row)
        }
    }

    useEffect(() => {
        getCategory()
        // eslint-disable-next-line
    }, [])

    const column = [
        // { field: "_id", headerName: 'Id', width: 250 },
        { field: "name", headerName: 'Name', width: 250 },
        { field: "alias", headerName: 'Alias', width: 200 },
        { field: "type", headerName: 'Type', width: 150 },
        {
            field: "action", headerName: 'Action', renderCell: (cell) => {
                return <div className="d-flex">
                    <div onClick={() => {
                        setcategoryDetails({
                            name: cell.row?.name,
                            alias: cell.row?.alias,
                            type: cell.row?.type,
                            id: cell.row?._id,
                        })
                        setOpen(true)
                    }} className="btn"><EditNoteIcon className='text-warning' /></div>
                    <div onClick={() => deleteHandler(cell.row?._id)} className="btn"><DeleteIcon className='text-danger' /></div>
                </div>
            }
        },
    ]

    async function createCategory() {
        try {
            const data = {
                ...categoryDetails
            }
            const result = await apiHelper.createCategory(data)
            if (result.status === 200) {
                getCategory()
                rerender()
                setOpen(false)
                setError({
                    message: "Category Create Successfully",
                    color: "success"
                })
            }
        } catch (error) {
            setError({
                message: "Category Not Created",
                color: "error"
            })
            console.log(error)
        }
    }

    async function updateCategory() {
        try {
            const data = {
                ...categoryDetails,
                id: categoryDetails?.id
            }
            const result = await apiHelper.updateCategory(data)
            if (result.status === 200) {
                getCategory()
                rerender()
                setOpen(false)
                setError({
                    message: "Category Update Successfully",
                    color: "info"
                })
            }
        } catch (error) {
            setError({
                message: "Category Not Updated",
                color: "error"
            })
            console.log(error)
        }
    }

    async function deleteHandler(id) {
        try {
            const result = await apiHelper.deleteCategory(id)
            if (result.status === 200) {
                getCategory()
                setError({
                    message: "Category Delete Successfully",
                    color: "warning"
                })
            }
        } catch (error) {
            setError({
                message: "Category Not Deletd",
                color: "error"
            })
            console.log(error)
        }
    }

    return (
        <div className='CategoryScreen'>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="h4 text-primary">Category</div>
                    <div>
                        <div onClick={handleClickOpen} className="btn btn-outline-primary">Add Category</div>
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
            </div>

            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>{categoryDetails?.id ? "Update Category" : "Add Category"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Category Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={categoryDetails.name}
                            onChange={(e) => setcategoryDetails({ ...categoryDetails, name: e.target.value })}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="alias"
                            name="alias"
                            label="Category ALias"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={categoryDetails.alias}
                            onChange={(e) => setcategoryDetails({ ...categoryDetails, alias: e.target.value })}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="type"
                            name="type"
                            label="Category Type"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={categoryDetails.type}
                            onChange={(e) => setcategoryDetails({ ...categoryDetails, type: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button onClick={categoryDetails?.id ? updateCategory : createCategory} variant="contained">{categoryDetails?.id ? "Update" : "Publish"}</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Alert style={{ width: "50%", marginTop: "20px" }} variant="filled" severity={Error.color}>
                {Error.message}
            </Alert>
        </div>
    )
}
