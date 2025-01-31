const config = require("./config/config.js");
const express = require('express');
const cors = require("cors");
const notesRoutes = require("./routes/notesRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/notes", notesRoutes);

// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({
        error: "Invalid URL"
    });
});

module.exports = app;