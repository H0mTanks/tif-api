const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

const { client } = require("./connection");
const employee = require("./employee");
const attendance = require("./attendance");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Attendance Tracker.");
});

app.use("/employee", employee);
app.use("/attendance", attendance);

const server = app.listen(3000, function () {
  const host = (server.address().address = "127.0.0.1");
  const port = (server.port = 3000);
  console.log(`Attendance tracker api is listening at http://${host}:${port}`);
});
