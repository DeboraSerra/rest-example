const express = require("express");
require("express-async-errors");
const userRoute = require("./routes/user.route.js");
const errorHandler = require("./middlewares/error.middleware.js");

const app = express();

app.use(express.json());

app.use("/users", userRoute);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
