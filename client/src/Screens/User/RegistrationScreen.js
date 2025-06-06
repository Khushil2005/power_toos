import React, { useEffect, useState } from 'react'
import path from '../../Constant/Path'
import { data, useNavigate } from 'react-router-dom'
import apiHelper from '../../Constant/ApiHelper'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'


export default function RegistrationScreen({ setAuth }) {
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate()
    const [city, setcity] = useState([])
    async function getCity() {
        try {
            const result = await apiHelper.listCity()
            setcity(result.data.data)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getCity()
    }, [])

    const [userDetails, setuserDetails] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        role: 0,
        cityId: "",
    })

    async function submitHandler() {
        try {
            const data = {
                ...userDetails
            }
            const result = await apiHelper.registerUser(data)
            if (result.status === 200) {
                localStorage.setItem("token", result.data.token)
                setAuth(result.data.token)
                navigate(path.home)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate(path?.home)
        }
    }, [localStorage.getItem("token")])


    return (
        <div className='LoginScreen' style={{
            height: "90vh",
            backgroundColor: "whitesmoke",
            width: "100w",
            overflow: 'hidden'

        }}> {

                <div className="d-flex row justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-4">
                        <div className="card shadow p-3">
                            <div className="h4 text_primary">Register Your Account</div>
                            <div className="row">
                                <div className="col-12">
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        id='fullName'
                                        type='text'
                                        label='Enter Your fullName'
                                        margin='dense'
                                        variant='outlined'
                                        value={userDetails?.fullName}
                                        onChange={(e) => setuserDetails({ ...userDetails, fullName: e.target.value })}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        id='email'
                                        type='email'
                                        label='Enter Your email'
                                        margin='dense'
                                        variant='outlined'
                                        value={userDetails?.email}
                                        onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        id='phone'
                                        type='text'
                                        label='Phone Number'
                                        margin='dense'
                                        variant='outlined'
                                        value={userDetails?.phone}
                                        onChange={(e) => setuserDetails({ ...userDetails, phone: e.target.value })}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        id='password'
                                        type='text'
                                        label='password'
                                        margin='dense'
                                        variant='outlined'
                                        value={userDetails?.password}
                                        onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
                                    />
                                </div>

                                <div className="col-12">
                                    <div className="text-center mt-3">
                                        <div onClick={submitHandler} className="btn btn-primary w-50">Sing Up</div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <div className="text-center">
                                        <span className='text-muted'>You have already account?<span onClick={() => navigate(path.login)} className='text-primary' style={{ cursor: 'pointer' }}>Log in</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
