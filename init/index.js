const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const connectDB = require("../config/db");

connectDB();

const initDB = async () => {
    await Listing.deleteMany();
    initData.data = initData.data.map(el => ({...el, owner: "69b05b80ecbc2f53accd7a59"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
};

initDB()
// console.log(initData.data)