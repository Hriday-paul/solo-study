const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = Schema(
    {
        email: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
        name: {
            type: String,
            required : true,
            default : ''
        }
    }
);

module.exports = goals = mongoose.model("goals", goalSchema);