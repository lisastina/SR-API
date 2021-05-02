const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

router.get("", programController.getAllPrograms);
router.get("/:programId", programController.getProgramById);
router.get("/episodes/:programId", programController.getProgramEpisodes);
router.get("/channel/:channelId", programController.getAllProgramsByChannel);

module.exports = router;