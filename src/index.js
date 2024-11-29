const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/index');

dotenv.config();
connectDB();

const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/admin', adminRoutes);

// Global Error Handler (This should be placed after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace to the console
    res.status(500).send('Something went wrong!'); // Send a generic error response
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


