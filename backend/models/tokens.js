const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: false,
    },
    token_hash: {
        type: String,
        required: true,
        unique: false
    },
    expires_at: {
        type: Date,
        required: true,
        unique: false
    },
    revoked:{
        type: Boolean,
        default: false
    }
});

const token = mongoose.model(tokenSchema);
module.exports = token;