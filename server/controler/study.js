const studyCollection = require('../model/study')

const updateStudyTime = async (req, res) => {
    try {
        const filter = { email: req.body.email, date: req.body.date };
        const data = {
            $inc: { studyTime: req.body.studyTime, breakTime: req.body.breakTime },
            $set: { email: req.body.email, date: req.body.date }
        }
        const result = await studyCollection.updateOne(filter, data, { upsert: true });
        res.send(result);
    } catch (err) {
        res.status(400).send({ err : err.message })
    }
}

const getStudyHistory = async (req, res) => {
    try {
        const list = []
        const result = await studyCollection.findOne({ date: req.query.date, email: req.query.email });

        const min24 = 24 * 60;
        const studyTime = (result?.studyTime)
        const breakTime = (result?.breakTime)
        const others = min24 - (studyTime + breakTime);
        await list.push(studyTime)
        await list.push(breakTime)
        await list.push(others);
        res.send(list);
    }
    catch (err) {
        res.status(400).send({ err })
    }
}

const getPrevDaysStudyHistory = async (req, res) => {
    try {
        const counts = {}
        const result = await studyCollection.find({ date: { $in: req.dateList }, email: req.query.email })


        req.dateList.forEach((date) => {
            result.forEach((resObj) => {
                if (resObj.date == date) {
                    counts[date] = Math.round(resObj.studyTime)
                }

            })
            if (!(date in counts)) {
                counts[date] = 0
            }
        })

        const today = req.dateList[req.dateList.length - 1];
        const todayStudy = await studyCollection.findOne({ email: req.query.email, date: today });

        res.send({ counts, todayStudy: todayStudy?.studyTime ? Math.round(todayStudy?.studyTime) : 0 });
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
}

module.exports = {
    updateStudyTime,
    getStudyHistory,
    getPrevDaysStudyHistory
}