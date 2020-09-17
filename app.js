const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");

const app = express();
app.use(cors());
//Bodyparser Middleware
app.use(bodyParser.json());

// DB config

const db = config.get("mongoURI");

//connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

//Use routes

app.use("/api/user", require("./routes/api/user"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
