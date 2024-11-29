const express = require('express');
const { addNote, getMyNotes, updateNote, deleteNote } = require('../controllers/notes.controller');
const { protect } = require('../middleware/auth.middlewares');
const router = express.Router();

router.route('/').post(protect, addNote).get(protect, getMyNotes);
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;
