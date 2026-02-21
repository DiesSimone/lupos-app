const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        required: true,
        unique: false
    }
});

const task = mongoose.model("Task", taskSchema);

module.exports = task