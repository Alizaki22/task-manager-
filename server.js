// server.js
const express = require('express');
const app = express();

const connectDB = require('./db');
connectDB();

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

const taskRoutes = require("./routes/taskRoutes");
app.use(taskRoutes);