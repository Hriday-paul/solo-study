const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@firstcluster.68frnfz.mongodb.net/?retryWrites=true&w=majority&appName=firstCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const dataBase = client.db("soloStudy");
        const users = dataBase.collection("users");
        const study = dataBase.collection("study");
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

                if(!findDoc){
                    await study.insertOne({email: req.body.email, studyTime: 0, breakTime: 0})
                }

                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        app.put('/updateStudy',  async (req, res) => {
            try {
                // const filter = { email: req.body.email, date :  req.body.date};
                // console.log(req.body);
                // const data = {
                //     $inc: { studyTime: req.body.studyTime, breakTime: req.body.breakTime },
                //     $set : {email : req.body.email, date : req.body.date}
                // }
                // const result = await study.updateOne(filter, data, {upsert : true});
                // res.send(result);
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