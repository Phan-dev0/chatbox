const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");


const app = express();
// This will help read env
require("dotenv").config(); 


// Middleware
// This allow us to use json in our data
app.use(express.json());
// This allow us to communicate with the FrontEnd
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


//CRUD
app.get("/", (req, res) => {
    res.send("Welcome to our chat api");
});


const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || 5000;


app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`);
})

mongoose.connect(uri, {
}).then(() => {
    console.log("MongoDB connection established")
}).catch((error) => {
    console.log("MongoDB connection fail: ", error.message);
})
