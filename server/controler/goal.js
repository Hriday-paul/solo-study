const goalCollection = require('../model/goal')

const addGoal = async (req, res) => {
    try {
        const result = await goalCollection.collection.insertOne(req.body);
        res.send(result);
    } catch (err) {
        res.status(400).send({ err : err.message })
    }
}

const todayGoal = async (req, res) => {
    try {
        const filter = { date: req.query.date, email: req.query.email };
        const runingTask = await goalCollection.find({ ...filter, status: 'runing' })
        const completeTask = await goalCollection.find({ ...filter, status: 'complete' })
        res.send({ runingTask, completeTask });
    } catch (err) {
        res.status(400).send({ err })
    }
}

const deleteGoal = async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const result = await goalCollection.deleteOne(filter)
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

const updateStudyGoal = async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const result = await goalCollection.updateOne(filter, { $set: req.body })
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

const getAllGoal = async (req, res) => {
    try {
        const filter = { email: req.query.email }
        const result = await goalCollection.find(filter);
        res.send(result);
    } catch (err) {
        res.status(400).send({ err })
    }
}

module.exports = {
    addGoal,
    todayGoal,
    deleteGoal,
    updateStudyGoal,
    getAllGoal
}