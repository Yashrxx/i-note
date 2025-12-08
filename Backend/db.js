const mongoose = require("mongoose");

// Replace with your actual Atlas credentials
// IMPORTANT: Encode special characters in password!!
const mongoURI = "mongodb+srv://Yash:Aditi_jain01@cluster0.uaizsnm.mongodb.net/inote?retryWrites=true&w=majority";

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
