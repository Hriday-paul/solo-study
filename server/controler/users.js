const userCollection = require('../model/users');
const studyCollection = require('../model/study');

const addOrUpdateUser = async (req, res) => {
    try {
        const filter = { email: req.body.email };
        const options = { upsert: true };
        const data = {
            $set: req.body
        }
        const result = await userCollection.updateOne(filter, data, options);
        const findDoc = await studyCollection.findOne(filter);

        if (!findDoc) {
            const data = await studyCollection.collection.insertOne({ email: req.body.email, studyTime: 0, breakTime: 0, date : `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}` })
            
        }

        res.send(result);
    } catch (err) {
        res.status(400).send({ err : err.message })
    }
};

module.exports = {
    addOrUpdateUser
}