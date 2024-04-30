const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studySchema = Schema(
    {
        email: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        studyTime: {
            type: Number,
            default : 0
        },
        breakTime: {
            type: Number,
            default : 0
        }
    }
);

module.exports = study = mongoose.model("study", studySchema);