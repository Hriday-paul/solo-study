const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@firstcluster.68frnfz.mongodb.net/?retryWrites=true&w=majority&appName=firstCluster`, {
      dbName : 'soloStudy'
    });
    console.log(`DB Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDb;