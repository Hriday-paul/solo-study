const motivCollection = require('../model/motivation');

const addMotivationText = async (req, res) => {
    try {
        const result = await motivCollection.collection.insertOne(req.body);
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

const getMotivText = async (req, res) => {
    try {
        const result = await motivCollection.find({lang : req.params.lang})
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

module.exports = {
    addMotivationText,
    getMotivText
}