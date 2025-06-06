import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiHelper from '../../Constant/ApiHelper'
import path from '../../Constant/Path'
import { useNavigate } from 'react-router-dom'

export default function LoginScreen({ setAuth }) {
    const navigate = useNavigate()
    const [userDetails, setuserDetails] = useState({
        phone: "",
        password: "",

    })

    async function submitHandler() {
        try {
            const data = {
                ...userDetails
            }
            const result = await apiHelper.loginUser(data)
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
            navigate(path.home)
        }
    }, [localStorage.getItem("token")])

    return (
        <div className='LoginScreen' style={{
            height: "90vh",
            backgroundColor: "whitesmoke",
            width: "100w",
            overflow: 'hidden'

        }}>
            <div className="d-flex row justify-content-center align-items-center h-100">
                <div className="col-12 col-md-6">
                    <div className="card shadow p-3">
                        <div className="h4 text-primary">Login Your Account</div>
                        <div className="row">
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
                                <div className="text-center">
                                    <div onClick={submitHandler} className="btn btn-primary w-50 mt-3">Log in</div>
                                </div>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <span className='text-muted'>You dont have any account?<span onClick={() => navigate(path.register)} className='text-primary' style={{ cursor: 'pointer' }}>Sign Up</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
