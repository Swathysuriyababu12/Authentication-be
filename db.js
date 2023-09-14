const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MongoDb_Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MongoDB Connected");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  module.exports = connectDb