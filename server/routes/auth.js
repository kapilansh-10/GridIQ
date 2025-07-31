const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
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

// @route POST api/auth/login
//  @desc Authenticate user & get the token
//  @access Public

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        // to check if the user already exists
        let user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({ msg: "Invalid credentials" });
        }

        // compare the submitted password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(404).json({ msg: "Invalid credentials" });
        }

        // Create and sign the JWT
        const payload = {
            user: {
                id: user.id, // we can later use this id to fetch user-specific data
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // the token expires in 5 hours
            (err, token) => {
                if (err) throw err;
                res.json({ token }) 
            }
        );
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;