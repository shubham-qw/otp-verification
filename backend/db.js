const mongoose = require("mongoose");
const mongodbURI = require("./models/uri");
mongoose.set('strictQuery', false);
const Mongodb = async () => {
    await mongoose.connect(mongodbURI, { useNewUrlParser: true })
    .then (() => {
        console.log("successfull");
    })
    .catch ((errors) => {
        console.log(errors);
    })
}

module.exports = Mongodb;
