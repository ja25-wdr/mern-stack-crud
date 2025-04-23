// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // For loading environment variables

// Import Express Routes
const studentRoute = require('./routes/student.route.js');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/reactdb";

// Connecting to MongoDB Database
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Database successfully connected!');
    })
    .catch((error) => {
        console.log('Could not connect to database: ' + error);
    });

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(cors());
app.use('/students', studentRoute);

// Define the PORT
const port = 4000;

// Start the server
app.listen(port, () => {
    console.log('Connected to port ' + port);
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
});