const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./Router/ProdectRouter.js'); // Fix typo in variable name
const usersRouter = require('./Router/UsersRouter.js'); // Rename to be more descriptive
require('dotenv').config();

// Set up server to listen on specified port
app.listen(process.env.PORT, () => {
    console.log('Server is running on port:', process.env.PORT);
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/article', router);
app.use('/api/users', usersRouter);

// 404 Not Found middleware
app.use('*', (req, res) => {
    res.status(404).json({ 'msg': 'Not Found' });
});
 
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 'msg': 'Internal Server Error' });
});

// Export the app (optional)
module.exports = app;
