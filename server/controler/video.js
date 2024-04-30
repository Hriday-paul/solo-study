const videoCollection = require('../model/video')

const addVideo = async (req, res) => {
    try {
        const result = await videoCollection.collection.insertOne(req.body);
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

const getVideoByTab = async (req, res) => {
    try {
        const result = await videoCollection.find({ tabId: parseInt(req.params.tabId) });
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

module.exports = {
    addVideo,
    getVideoByTab
}