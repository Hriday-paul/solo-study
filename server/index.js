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
        const videoCollection = dataBase.collection("videos");

        app.post('/addVideo', async (req, res) => {
            try {
                const result = await videoCollection.insertOne(req.body);
                res.send(result);
            } catch (err) {
                res.status(400).send({ err })
            }
        });

        app.get('/getVideoByTab/:tabId', async (req, res) => {
            try {
                const result = await videoCollection.find({tabId : parseInt(req.params.tabId)}).toArray();
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