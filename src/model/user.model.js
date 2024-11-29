// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
// });

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the 'User' model
const userSchema = new mongoose.Schema({
    name: { 
        type: String, // User's name
        required: true // Name is mandatory
    },
    email: { 
        type: String, // User's email
        required: true, // Email is mandatory
        unique: true // Ensure unique email addresses
    },
    password: { 
        type: String, // User's password
        required: true // Password is mandatory
    },
    role: { 
        type: String, // User's role
        enum: ['user', 'admin'], // Role can either be 'user' or 'admin'
        default: 'user' // Default role is 'user'
    },
});

// Middleware to hash the password before saving it
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password isn't modified
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Continue saving the user
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare passwords
};

module.exports = mongoose.model('User', userSchema); // Export the 'User' model
