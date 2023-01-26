const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Loginuser = require("../models/user");



router.post("/loginuser", [
    body('mobile').isLength({ min: 10, max: 10 }),
    body('password').isLength({ min: 5 })
],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const value = errors.errors[0].param;
            const msg = value == "password" ? "Password min length 5" : "Invalid Number";
            return res.json({ msg: msg , success : false});
        }

        const temp = await Loginuser.findOne({ password: req.body.password });

        if (temp == null) {
            res.send({ success: false, msg: "Wrong password" });
        }

        else {
            res.send({ success: true });
        }
    })

router.post("/createuser", function (req, res) {
    const user = new Loginuser({
        mobile: req.body.mobile,
        password: req.body.password
    })

    res.send({ success: true });
})

module.exports = router;

