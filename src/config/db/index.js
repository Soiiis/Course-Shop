const mongoose = require('mongoose');
async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log("Successfully connected");

    }
    catch (err) {
        console.log("Connection Failed: " + err.message);
    }
}

module.exports = {connect}