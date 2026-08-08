const express = require("express");
const checkPnrStatus = require("../controllers/checkPnrController");
const checkTrainInfo = require("../controllers/checkTrainInfo");
const checkLiveTrainStatus = require("../controllers/checkLiveTrainStatus");
const checkTrainHistory = require("../controllers/checkTrainHistory");
const liveAtStation = require("../controllers/liveAtStatus");
const searchTrainBtwStations = require("../controllers/searchTrains");
const checkAvailability = require("../controllers/checkTrainSeat");
const checkFare = require("../controllers/checkFare");

const railKitRouter = express.Router();

railKitRouter.get("/check-pnr/:pnr",checkPnrStatus);

railKitRouter.get("/check-train-info/:trainNo",checkTrainInfo);

railKitRouter.get("/check-live-train-status/:trainNo{/:date}",checkLiveTrainStatus);

railKitRouter.get("/check-train-history/:trainNo{/:date}",checkTrainHistory);

railKitRouter.get("/live-at-station/:stationCode",liveAtStation);

railKitRouter.get("/search-trains/:fromSTNCode/:toSTNCode{/:date}",searchTrainBtwStations);

railKitRouter.get("/check-seat-availability/:trainNo/:fromSTNCode/:toSTNCode/:date/:coach/:quota",checkAvailability);

railKitRouter.get("/check-fare/:trainNo/:fromSTNCode/:toSTNCode/:date/:coach/:quota",checkFare);






module.exports = railKitRouter;