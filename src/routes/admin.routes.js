// const express = require('express');
// const { getAllUsers, getUserNotes } = require('../controllers/admin.controller');
// const { protect, admin } = require('../middleware/auth.middlewares');
// const router = express.Router();

// router.get('/users', protect, admin, getAllUsers);
// router.get('/user/:id/notes', protect, admin, getUserNotes);

// module.exports = router;




const express = require('express');
const { getAllUsers, getUserNotes } = require('../controllers/admin.controller');
const { protect, admin } = require('../middleware/auth.middlewares');
const router = express.Router();

// Route to get all users (accessible only by admin)
router.get('/users', protect, admin, getAllUsers);

// Route to get notes for a specific user (accessible only by admin)
router.get('/user/:id/notes', protect, admin, getUserNotes);

module.exports = router; // Export the router to use in the main app
