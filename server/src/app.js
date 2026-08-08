const express = require("express");
const railKitRouter = require("./routes/railKitRoutes");

const app = express();

app.use(express.json());


app.use("/api",railKitRouter);

module.exports = app;