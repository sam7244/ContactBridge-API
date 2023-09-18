const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("the connection host", connect.connection.host);
    console.log("the connection name", connect.connection.name);
  } catch (error) {
    console.log("connection error", error);
  }
};

module.exports = connectDb;
