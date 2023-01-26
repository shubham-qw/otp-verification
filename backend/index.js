const express = require("express");
const app = express();
const Mongodb = require("./db");
const cors = require("cors");

app.use(cors());
Mongodb();
app.use(express.json());
app.use("/api", require("./Routes/cred"));
app.use("/api", require("./Routes/userVerify"));

app.get("/", function(req,res) {
    res.send("Hello");
})

app.listen(5000, function() {
    console.log("Server running on local port 5000");
})