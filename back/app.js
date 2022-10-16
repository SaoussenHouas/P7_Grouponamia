const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
const path = require('path');
const cors = require('cors')

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

// Middleware
app.use(express.json())
app.use(cors()); // Use CORS and allowed sharing the API
app.use(bodyParser.json()) // Parse the response for the database
app.use('/images', express.static(path.join(__dirname, 'images')));// Charge images

//Route Middleware
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)

// Connect to DB
dotenv.config()

mongoose.connect( process.env.DB_CONNECTION,{ useNewUrlParser: true }, () => 
    console.log('Connected to DB')
)

module.exports = app;