require("dotenv").config();   // <-- IMPORTANT

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;  // <-- READ FROM ENV

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB Atlas 🚀");
        })
        .catch(err => {
            console.error("MongoDB connection error ❌", err);
        });
}

module.exports = connectToMongo;