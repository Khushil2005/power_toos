module.exports = {
    PORT: 5000,
    MongoDB_URL: "mongodb+srv://khirsariyakhushil11:97FVE109nMI0g3bU@powertools.wlvhy2y.mongodb.net/powertools",
    // App_URL: "http://192.168.1.5:5000",
    // App_URL: "http://192.168.215.65:5000",
    // App_URL: "http://localhost:5000",
    App_URL: "https://power-toos.onrender.com",
    key_id: "rzp_test_oYzCquEuAY3r9N",
    key_secrate: "UOQTdhf1aVVuZwg8Nxf2yDc8",
    httpErrors: {
        500: (() => {
            const err = new Error("Somthing went wrong")
            err.status = 500
            return err
        })(),
        400: (() => {
            const err = new Error("Missing dipendancy")
            err.status = 400
            return err
        })(),
        401: (() => {
            const err = new Error("Unauthorized")
            err.status = 401
            return err
        })(),
    },
    httpsuccess: "Success",
    httpI_S_E: "internal server error",
    httpU_N_F: "User not found",
    httpU_A_E: "User already exitst",
    JWT_SECRETS: "JWT_SECRETS",
    deliverystatus: ["Pending", "Dispatch", "Received", "Rejected"],
    orderstatus: ["Pending", "Completed", "Rejected"],
    Paymentstatus: ["Pending", "Success", "Rejected"],
    PaymentMethod: ["COD", "Online", "Rejected"],
    role: ["User", "Admin"],
}
