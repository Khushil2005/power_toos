import { TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import apiHelper from '../../Constant/ApiHelper'
import { CartContext } from '../../Hooks/cartProvider'

export default function AddressScreen({ UserInfo }) {
  const navigate = useNavigate()
  const location = useLocation()
  const productId = location.search?.split("?productId=")[1]
  const [Product, setProduct] = useState([])
  const { getCartData, cartItems: CartItems, setcartItems, CartTotalDetails } = useContext(CartContext)


  async function getProduct() {
    try {
      const result = await apiHelper.getProductById(productId)
      setProduct(result.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (productId) {
      getProduct()
    }
  }, [])



  const [Address, setAddress] = useState([])
  const [open, setopen] = useState(false)
  const [addressDetails, setaddressDetails] = useState({
    block: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: ""
  })

  async function getAddress() {
    try {
      const result = await apiHelper.listAddress(UserInfo?._id)
      setAddress(result.data.data)
    } catch (error) {
      console.log(error);
    }
  }


  async function addAddress() {
    try {
      const data = {
        userId: UserInfo?._id,
        // eslint-disable-next-line
        address: addressDetails?.block + "," + " " + addressDetails.landmark + ",",
        area: addressDetails.area,
        city: addressDetails.city,
        state: addressDetails.state,
        pincode: addressDetails.pincode,
      }
      console.log(data);

      const result = await apiHelper.createAddress(data)
      if (result.status === 200) {
        getAddress()
        setopen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAddress()
    // eslint-disable-next-line
  }, [])

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  function clickToContinue() {
    if (selectedAddress && selectedPaymentMethod) {
      const url = productId
        ? `/checkout?address=${selectedAddress}&payment=${selectedPaymentMethod}&product=${productId}`
        : `/checkout?address=${selectedAddress}&payment=${selectedPaymentMethod}`;
      navigate(url);
    }
  }


  return (
    <div className='AddressScreen pb-5'>
      <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-7 my-2">
            {
              Address && !open && Address.length > 0 ? <div>
                <div className="h4 text-primary">Select Your Address</div>
                {
                  Address?.map((data) => {
                    return <label key={data?._id} style={selectedAddress === data._id ? { border: "2px solid #3e2723", boxShadow: "2px 2px 8px rgba(62, 39, 35, 0.4)" } : {}} className="card p-3 my-3">
                      <div className="d-flex gap-2">
                        <input onChange={() => setSelectedAddress(data._id)} type="radio" name="address" id="" />
                        <div>
                          <div>{data.address}{data.area},</div>
                          <div>{data.city},</div>
                          <div> {data.state} - {data.pincode}</div>
                        </div>
                      </div>
                    </label>
                  })
                }
                <div onClick={() => setopen(true)} className="text-center btn w-100">+ Add new Address</div>
              </div>
                : <div className="card p-2">
                  <div className="h4 text-primary">Add Your Address</div>
                  <div className="row">
                    <div className="col-12">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='block'
                        name='block'
                        type='text'
                        label="Enter Block / House No. / Home Title"
                        onChange={(e) => setaddressDetails({ ...addressDetails, block: e.target.value })}
                        value={addressDetails.block}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='landmark'
                        name='landmark'
                        type='text'
                        label="Building Name / Landmark"
                        onChange={(e) => setaddressDetails({ ...addressDetails, landmark: e.target.value })}
                        value={addressDetails.landmark}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='area'
                        name='area'
                        type='text'
                        label="Area"
                        onChange={(e) => setaddressDetails({ ...addressDetails, area: e.target.value })}
                        value={addressDetails.area}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='city'
                        name='city'
                        type='text'
                        label="City"
                        onChange={(e) => setaddressDetails({ ...addressDetails, city: e.target.value })}
                        value={addressDetails.city}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='state'
                        name='state'
                        type='text'
                        label="State"
                        onChange={(e) => setaddressDetails({ ...addressDetails, state: e.target.value })}
                        value={addressDetails.state}
                      />
                    </div>
                    <div className="col-12">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='pincode'
                        name='pincode'
                        type='text'
                        label="Pincode"
                        onChange={(e) => setaddressDetails({ ...addressDetails, pincode: e.target.value })}
                        value={addressDetails.pincode}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div onClick={() => setopen(false)} className="btn btn-outline-primary my-1">Preview</div>
                    <div onClick={addAddress} className="btn btn-primary my-1">Publish</div>

                  </div>
                </div>
            }
          </div>
          <div className="col-12 col-md-5 my-2">
            <div className="card p-3 mb-3">
              <div className="h4 text-primary">Product Details</div>
              <hr />
              <div>
                <div className="d-flex justify-content-between">
                  <div>Product Prices : </div>
                  <div>₹ {CartTotalDetails?.productPrice || Product?.price}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Total Item : </div>
                  <div>{CartTotalDetails?.totalItem || 1}</div>
                </div>

                <hr />
                <div className="d-flex justify-content-between">
                  <div>Total Price : </div>
                  <div>₹ {Math.floor(CartTotalDetails?.totalPrice || Product?.price)}</div>
                </div>

              </div>
            </div>
            <div className="card p-3 my-3">
              <div className="h4 text-primary">Select Payment Method</div>
              <hr />
              <div className="row">
                <div className="col-12 d-flex gap-2 btn">
                  <input type="radio" id='cod' name='payment' onChange={() => setSelectedPaymentMethod("COD")} />
                  <label htmlFor="cod">
                    Cash On Delivery
                  </label>
                </div>
                <div className="col-12 col-md-6 w-100 d-flex gap-2 btn">
                  <input type="radio" id='online' name='payment' onChange={() => setSelectedPaymentMethod("Online")} />
                  <label className='' htmlFor="online">
                    Net & Mobile Banking / UPI / Credit Card
                  </label>
                </div>
                <hr className='m-3' />
                <div className="text-center">
                  <div onClick={clickToContinue} className="btn btn-primary w-50">Continue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
