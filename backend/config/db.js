const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Mongo db connected:${conn.connection.host}`);
  } catch (error) {
    console.log(`Error${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
