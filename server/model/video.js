const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tabId: {
            type: Number,
            required: true,
        },
        thumb: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
    }
);

module.exports = videos = mongoose.model("videos", videoSchema);