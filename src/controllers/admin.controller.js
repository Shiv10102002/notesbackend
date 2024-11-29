// const User = require('../model/user.model');
// const Note = require('../model/notes.model');

// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getUserNotes = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const notes = await Note.find({ user: id });
//         res.status(200).json(notes);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



const User = require('../model/user.model'); 
const Note = require('../model/notes.model');

/**
 * Controller to get all users (excluding their password).
 * This is typically an admin-only function to get details of all users in the system.
 */
// exports.getAllUsers = async (req, res) => {
//     try {
//         // Fetch all users from the database, excluding the 'password' field for security reasons
//         const users = await User.find().select('-password');
        
//         // Respond with the list of users and a 200 OK status
//         res.status(200).json(users);
//     } catch (error) {
//         // If an error occurs, catch it and send a 500 Internal Server Error with the error message
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database, excluding the 'password' field and excluding users with 'admin' role
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        
        // Respond with the list of users and a 200 OK status
        res.status(200).json(users);
    } catch (error) {
        // If an error occurs, catch it and send a 500 Internal Server Error with the error message
        res.status(500).json({ message: error.message });
    }
};


/**
 * Controller to get all notes of a specific user by their user ID.
 * Only an admin or the user themselves should be able to access this.
 */
exports.getUserNotes = async (req, res) => {
    const { id } = req.params; // Extracting the user ID from the request parameters

    try {
        // Find all notes belonging to the user with the given ID
        const notes = await Note.find({ user: id });

        // Respond with the list of notes and a 200 OK status
        res.status(200).json(notes);
    } catch (error) {
        // If an error occurs, catch it and send a 500 Internal Server Error with the error message
        res.status(500).json({ message: error.message });
    }
};
