// const jwt = require('jsonwebtoken');
// const User = require('../model/user.model');

// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// exports.registerUser = async (req, res) => {
//     const { name, email, password, role } = req.body;

//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: 'User already exists' });

//         const user = await User.create({ name, email, password, role });
//         res.status(201).json({ token: generateToken(user.id) });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (user && (await user.matchPassword(password))) {
//             res.status(200).json({ token: generateToken(user.id) });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const jwt = require('jsonwebtoken'); 
const User = require('../model/user.model'); 

/**
 * Function to generate a JWT token for a user
 * @param {string} id - The user's ID to include in the token payload
 * @returns {string} - The generated JWT token
 */
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

/**
 * Controller to register a new user.
 * This endpoint takes user details, creates a new user in the database, 
 * and returns a JWT token for the newly registered user.
 */
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body; // Destructuring the user details from the request body

    try {
        // Check if a user already exists with the provided email
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' }); // If user exists, return error

        // Create a new user in the database
        const user = await User.create({ name, email, password, role });

        // Send the JWT token as part of the response for authentication
        res.status(201).json({ token: generateToken(user.id),message:'user created successfully'});
    } catch (error) {
        // If an error occurs during user creation, catch it and send a 500 Internal Server Error with the error message
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to log in an existing user.
 * This endpoint checks if the provided email and password match any user in the database, 
 * and if valid, returns a JWT token for authentication.
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body; // Destructuring the email and password from the request body

    try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        // If user exists and password matches, generate a JWT token and send it back in the response
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({ token: generateToken(user.id),message:"user logged in successfully" });
        } else {
            // If the email or password is incorrect, return an Unauthorized (401) status with a message
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // If an error occurs during login, catch it and send a 500 Internal Server Error with the error message
        res.status(500).json({ message: error.message });
    }
};
