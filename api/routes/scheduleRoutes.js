const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.get("/channel/:channelId", scheduleController.getChannelSchedule);
router.get("/rightnow", scheduleController.getScheduleRightNow);
router.get("/rightnow/:channelId", scheduleController.getScheduleRightNowById);

module.exports = router;