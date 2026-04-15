const mongoose = require("mongoose");

async function connectDB() {
    try {
        // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
        const ATLAS_URL = process.env.ATLAS_URL;
        await mongoose.connect(ATLAS_URL);
        console.log("Database Connected Successfully!")
    } catch (error) {
        console.log("Error Connecting Database ",error)
    }
}

module.exports = connectDB;