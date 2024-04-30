const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const audioSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        audioUrl: {
            type: String,
            required: true,
        },
    }
);

module.exports = audios = mongoose.model("audios", audioSchema);