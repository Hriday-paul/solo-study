const audioCollection = require('../model/audio')

const addAudio = async (req, res) => {
    try {
        const result = await audioCollection.collection.insertOne(req.body);
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

const getAudios = async (req, res) => {
    try {
        const result = await audioCollection.find()
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

module.exports = {
    addAudio,
    getAudios
}