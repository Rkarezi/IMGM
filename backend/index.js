const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const handler = require("./routes/route.js");
const mongoose = require("mongoose");
require("dotenv/config");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", handler);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected and running");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 8081, () => {
  console.log(`IMGM express-server listening on port 8081`);
});
