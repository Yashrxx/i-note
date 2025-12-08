const express = require('express')
const router = express.Router();
const User = require("../models/User")
const Login = require("../models/Login")
const fetchUser = require("../middleware/fetchUser")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "yashrxx$orry"
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {
    let success =false;
    const errors = validationResult(req);
    // if errors return Bad request and respond errors
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({success, error: "sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        //   console.log(JWT_DATA)
        success=true;
        res.json({success, authToken: authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// authenticate user
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    // if errors return Bad request and respond errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        // console.log(user.password)
        if (!user) {
            return res.status(400).json({success, error: "Please try to login with correct credentials xor" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials poor" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        //   console.log(JWT_DATA)
        res.json({ success, authToken: authToken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 3 getUser
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;