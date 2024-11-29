const Note = require('../model/notes.model');

exports.addNote = async (req, res) => {
    const { title, content } = req.body;

    try {
        const note = await Note.create({ user: req.user.id, title, content });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const note = await Note.findOneAndUpdate({ _id: id, user: req.user.id }, { title, content }, { new: true });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
