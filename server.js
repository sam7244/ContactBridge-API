const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const validateToekn = require("./middleware/validateUserToken");

const dotenv = require("dotenv").config();

const app = express();
connectDb();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/user", require("./Routes/userRoutes"));
app.use(validateToekn);
app.use("/api/contact", require("./Routes/constactRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`the server is running on the port ${port} `);
});
