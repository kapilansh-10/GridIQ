const express = require("express");
const router = express.Router();
const brcypt = require("bcryptjs");
const User = require("../models/User") // Import the User model

// @route POST api/auth/register
// @desc Register a new user
// @access Public

router.post('/register', async (req, res) => {
    const {email, password} = req.body;

    try {
        // To check if the user already exists
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        // Create a new user instance

        user = new User ({
            email,
            password
        })

        // Hash the password
        const salt = await brcypt.genSalt(10);
        user.password = await brcypt.hash(password, salt)

        // Save the user to the database
        await user.save()   

        res.status(201).json({msg: 'User registered successfully'})

    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;