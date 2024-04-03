const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@firstcluster.68frnfz.mongodb.net/?retryWrites=true&w=majority&appName=firstCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const previesDate = (dateCount, nowYear, nowMonth, nowDate) => {
    let newMonth = 0;
    let newDate = 0;
    if ((nowYear % 4 == 0 && nowYear % 100 != 0) || nowYear % 400 == 0) {
        // if current year is leap year and current month is march and preview month is february
        if (nowMonth == 3 && nowDate - dateCount < 1) {
            newMonth = nowMonth - 1;
            newDate = 29 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
        }
        // যদি এখনকার মাস থেকে ৫ বাদ দিলে মান ঋনাত্মক হয়, তাহলে আমাকে পূর্বের মাসে যেতে হবে 
        else if (nowDate - dateCount < 1) {
            // যদি পূর্বের মাস ৩০ দিনে হয় 
            if (nowMonth - 1 % 2 == 0) {
                newMonth = nowMonth - 1;
                newDate = 30 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
            }
            // যদি পূর্বের মাস ৩১ দিনে হয় 
            else if (nowMonth - 1 % 2 != 0) {
                newMonth = nowMonth - 1;
                newDate = 31 + (nowDate - dateCount);
            }
        }
        else {
            newMonth = nowMonth;
            newDate = nowDate - dateCount;
        }
    }
    else {
        if (nowMonth == 3 && nowDate - dateCount < 1) {
            newMonth = nowMonth - 1;
            newDate = 28 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
        }
        // যদি এখনকার মাস থেকে ৫ বাদ দিলে মান ঋনাত্মক হয়, তাহলে আমাকে পূর্বের মাসে যেতে হবে 
        else if (nowDate - dateCount < 1) {
            // যদি পূর্বের মাস ৩০ দিনে হয় 
            if (nowMonth - 1 % 2 == 0) {
                newMonth = nowMonth - 1;
                newDate = 30 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
            }
            // যদি পূর্বের মাস ৩১ দিনে হয় 
            else if (nowMonth - 1 % 2 != 0) {
                newMonth = nowMonth - 1;
                newDate = 31 + (nowDate - dateCount);
            }
        }
        else {
            newMonth = nowMonth;
            newDate = nowDate - dateCount;
        }
    }

    return (`${nowYear}-${newMonth}-${newDate}`)
}

const prevDateList = (req, res, next) => {
    const currentDay = new Date().getDate();
    const currentMonth = (new Date().getMonth()) + 1;
    const currentYear = new Date().getFullYear();
    const dateList = []

    for (let i = 0; i < parseInt(req.params.prevDays); i++) {
        const date = previesDate(i, currentYear, currentMonth, currentDay);
        dateList.unshift(date);
    }
    // return dateList
    req.dateList = dateList
    next();
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const dataBase = client.db("soloStudy");
        const users = dataBase.collection("users");
        const study = dataBase.collection("study");
        const goals = dataBase.collection("goals");
        const videoCollection = dataBase.collection("videos");
        const audioCollection = dataBase.collection("audios");
        const motivationCollection = dataBase.collection("motivation");

        app.put('/addUser', async (req, res) => {
            try {
                const filter = { email: req.body.email };
                const options = { upsert: true };
                const data = {
                    $set: req.body
                }
                const result = await users.updateOne(filter, data, options);
                const findDoc = await study.findOne(filter);

                if (!findDoc) {
                    await study.insertOne({ email: req.body.email, studyTime: 0, breakTime: 0, openGoal: 0, comGoal: 0 })
                }

                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        app.put('/updateStudyTime', async (req, res) => {
            try {
                const filter = { email: req.body.email, date: req.body.date };
                const data = {
                    $inc: { studyTime: req.body.studyTime, breakTime: req.body.breakTime },
                    $set: { email: req.body.email, date: req.body.date }
                }
                const result = await study.updateOne(filter, data, { upsert: true });
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        // insert a new goal
        app.post('/addGoal', async (req, res) => {
            try {
                const result = await goals.insertOne(req.body);
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        })

        // get task length
        app.get('/getTodayTask', async (req, res) => {
            try {
                const filter = { date: req.query.date, email: req.query.email };
                const runingTask = await goals.find({ ...filter, status: 'runing' }).toArray();
                const completeTask = await goals.find({ ...filter, status: 'complete' }).toArray();
                res.send({ runingTask, completeTask });
            } catch (err) {
                res.status(400).send({ err })
            }
        })

        // delete a task
        app.delete('/deleteTask/:id', async (req, res) => {
            try {
                const filter = { _id: new ObjectId(req.params.id) };
                const result = await goals.deleteOne(filter)
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        // update study goal
        app.put('/updateStudyGoal/:id', async (req, res) => {
            try {
                const filter = { _id: new ObjectId(req.params.id) };
                const result = await goals.updateOne(filter, { $set: req.body })
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        app.post('/addVideo', async (req, res) => {
            try {
                const result = await videoCollection.insertOne(req.body);
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        app.post('/addAudio', async (req, res) => {
            try {
                const result = await audioCollection.insertOne(req.body);
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        app.get('/getVideoByTab/:tabId', async (req, res) => {
            try {
                const result = await videoCollection.find({ tabId: parseInt(req.params.tabId) }).toArray();
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        })

        app.get('/audios', async (req, res) => {
            try {
                const result = await audioCollection.find().toArray();
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        })

        app.post('/addMotivation', async (req, res) => {
            try {
                const result = await motivationCollection.insertOne(req.body);
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        // get motivation
        app.get('/motivations', async (req, res) => {
            try {
                const result = await motivationCollection.find().toArray();
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        })

        // today study history
        app.get('/todayStudyHistory', async (req, res) => {
            try {
                const list = []
                const result = await study.findOne({ date: req.query.date, email: req.query.email });

                const min24 = 24 * 60;
                const studyTime = (result?.studyTime)
                const breakTime = (result?.breakTime)
                const others = min24 - (studyTime + breakTime);
                await list.push(studyTime)
                await list.push(breakTime)
                await list.push(others)
                res.send(list);
            }
            catch (err) {
                res.status(400).send({ err })
            }
        });

        //get all goals history
        app.get('/allGoal', async (req, res) => {
            try {
                const filter = { email: req.query.email }
                const result = await goals.find(filter).toArray();
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        app.get('/previousDaysStudy/:prevDays', prevDateList, async (req, res) => {
            try {
                const counts = {}
                const result = await study.find({ date: { $in: req.dateList }, email: req.query.email }).toArray();

                req.dateList.forEach((date) => {
                    result.forEach((resObj) => {
                        if (resObj.date == date) {
                            counts[date] = resObj.studyTime
                        }
                        
                    })
                    if (!(date in counts)) {
                        counts[date] = 0
                    }
                })

                const today = req.dateList[req.dateList.length-1];
                const todayStudy = await study.findOne({email: req.query.email, date : today});

                res.send({counts, todayStudy : todayStudy.studyTime});
            }
            catch (err) {
                res.status(400).send({ err })
            }
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send({ msg: 'connection is ok' })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})