const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const otpGenerator = require('otp-generator');


router.post("/verifyuser", [
    body('mobile').isLength({ min: 10, max: 10 }),
    body('password').isLength({ min: 5 })
],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const value = errors.errors[0].param;
            const msg = value == "password" ? "Password min length 5" : "Invalid Number";
            return res.json({ msg: msg , success : false});
        }
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets : false,upperCaseAlphabets: false, specialChars: false });
        res.send({ success: true , otp : otp});
    })


module.exports = router;    