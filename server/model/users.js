const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        dailyStudyTime: {
            type: Number
        }
    }
);

module.exports = users = mongoose.model("users", userSchema);