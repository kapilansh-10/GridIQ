require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();
const PORT = 5000;

// connection string here
const MONGO_URI = 'mongodb+srv://energyAppUser:kapilansh10@energydashboardcluster.wmev3vl.mongodb.net/?retryWrites=true&w=majority&appName=EnergyDashboardCluster'

app.use(cors()); // enable Cross-Origin Resource Sharing
app.use(express.json()) // to accept json data

// --- Connect to MongoDB ---
mongoose.connect(MONGO_URI)
    .then(() => console.log("Successfully connected to MongoDB!"))
    .catch(() => console.error('MongoDB connection error:', err))

// A simple route testing to see if our server is running or not
app.get('/api/test', (req,res) => {
    res.json({message: "Hello from the server!"})
})

app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`The server is running on Port ${PORT}`)
})