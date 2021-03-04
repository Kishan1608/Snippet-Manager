const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//setup express server

const app = express();
app.use(express.json());

//setup routers

app.use('/snippet', require('./routers/snippetRouter'));

mongoose.connect(process.env.MDB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
});

app.listen(5000, ()=>console.log("Server started on port 5000"));

