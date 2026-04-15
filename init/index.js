const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const connectDB = require("../config/db");

connectDB();

const initDB = async () => {
    await Listing.deleteMany();
    initData.data = initData.data.map(el => ({...el, owner: "69de9160660499a2f12102de"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
};

initDB()
