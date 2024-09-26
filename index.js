require('dotenv').config()
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const { user } = require("./user");
const { admin } = require("./admin");
const { course } = require("./course");

const app = express();
app.use(cors());
app.use("/user", user);
app.use("/admin", admin);
app.use("/course", course);

app.get("/", function (req, res)
{
    res.sendFile(__dirname + "/index.html");
});

async function main()
{
    await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL);
    app.listen(3000);
    console.log("listening on port 3000");
}

main();