import React, { useEffect, useState } from 'react'
import apiHelper from '../../Constant/ApiHelper'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import TuneIcon from '@mui/icons-material/Tune';

export default function HomeScreen() {
    const [Product, setProduct] = useState([])
    const [selectCategory, setselectCategory] = useState("main")

    async function getProduct(category) {
        try {
            const data = {
                category: category
            }
            const result = await apiHelper.listProduct(data)
            setProduct(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (selectCategory) {
            getProduct(selectCategory)
        }
        // eslint-disable-next-line
    }, [selectCategory])


    return (
        <div className='HomeScreen container pb-5 '>
            <div className="d-none d-md-flex d-block justify-content-center gap-3 w-100 p-2 my-2 flex-wrap ">
                <div onClick={() => setselectCategory("main")} style={selectCategory === "main" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Home</div>
                <div onClick={() => setselectCategory("drillingmachine")} style={selectCategory === "drillingmachine" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Drillingmachine</div>
                <div onClick={() => setselectCategory("cutter")} style={selectCategory === "cutter" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Cutter</div>
                <div onClick={() => setselectCategory("breaker")} style={selectCategory === "breaker" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Breaker</div>
                <div onClick={() => setselectCategory("cutoffmachines")} style={selectCategory === "cutoffmachines" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Cutoffmachines</div>
                <div onClick={() => setselectCategory("paintmixer")} style={selectCategory === "paintmixer" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Paintmixer</div>
                <div onClick={() => setselectCategory("blowers")} style={selectCategory === "blowers" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Blowers</div>
                <div onClick={() => setselectCategory("weldingmachines")} style={selectCategory === "weldingmachines" ? { borderBottom: "2px solid #0073e6", color: "#0073e6" } : {}} className="btn">Weldingmachines</div>
            </div>
            {/* Show only on mobile (below md screen) */}
            <div className="d-block d-md-none">
                <div className="category-scroll-container my-2 py-2">
                    {[
                        { key: "main", label: "Home" },
                        { key: "drillingmachine", label: "Drillingmachine" },
                        { key: "cutter", label: "Cutter" },
                        { key: "breaker", label: "Breaker" },
                        { key: "cutoffmachines", label: "Cutoffmachines" },
                        { key: "paintmixer", label: "Paintmixer" },
                        { key: "blowers", label: "Blowers" },
                        { key: "weldingmachines", label: "Weldingmachines" },
                    ].map((item) => (
                        <div
                            key={item.key}
                            onClick={() => setselectCategory(item.key)}
                            className="category-btn btn"
                            style={
                                selectCategory === item.key
                                    ? { borderBottom: "2px solid #0073e6", color: "#0073e6" }
                                    : {}
                            }
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>


            <div className="container my-4">
                <div className="h4 text-primary">Feature Product</div>
                <div className="row">
                    {
                        Product.length > 0 && Product?.map((data) => {
                            return <Link to={"/product/" + data?._id} className="col-6 col-md-3 my-2">
                                <div className="box border border-2 align-item-center justify-content-between flex-column my-1">
                                    <div className="card-img text-center p-3 " >
                                        <img src={data.url + data.img?.path} alt="" width={"100%"} />
                                    </div>
                                    <div className="card-content text-align-center p-2">
                                        <div className="h5 text-primary d-none d-md-block" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{data.model}</div>
                                        <div className="h5 text-primary d-block d-md-none" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{data.model.split("PowerTools")[1]}</div>
                                        <div className=" flex-md-row align-items-center">
                                            <div className="text-muted"> Speed {data.speed}</div>
                                            <div className="text-success fw-bold"> {data.capacity}</div>
                                            <div className="text-primary h4">₹{data?.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }

                </div>
            </div>
        </div>
    )
}
