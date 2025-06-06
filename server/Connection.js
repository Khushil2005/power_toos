const { default: mongoose } = require("mongoose");
const { MongoDB_URL } = require("./Constant");

function connectDb() {
    try {
        mongoose.connect(MongoDB_URL)
        console.log("Db_connected")

    } catch (error) {

        console.log("Db connection Lose");
    }
}
module.exports = connectDb 