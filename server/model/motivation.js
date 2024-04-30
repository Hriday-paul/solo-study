const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const motivSchema = Schema(
    {
        role: {
            type: String,
            required: true,
        },
        motivation: {
            type: String,
            required: true,
        },
        lang: {
            type: String,
            required : true
        }
    }
);

module.exports = motivation = mongoose.model("motivation", motivSchema);