const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = Schema({
    mobile : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Loginuser", userSchema);