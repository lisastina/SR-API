const express = require("express");
const router = express.Router();
const favouriteController = require("../controllers/favouriteController");


router.get('/programs/:userId', favouriteController.getFavouritePrograms);
router.get('/channels/:userId', favouriteController.getFavouriteChannels);

router.post('/channels/:userId', favouriteController.addFavouriteChannel);
router.post('/programs/:userId', favouriteController.addFavouriteProgram);

router.delete('/channels/:userId/:channelId', favouriteController.deleteFavouriteChannel);
router.delete('/programs/:userId/:programId', favouriteController.deleteFavouriteProgram);

module.exports = router;
