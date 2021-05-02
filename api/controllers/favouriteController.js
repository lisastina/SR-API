const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../srDatabase.db"));


const getFavouritePrograms = (req, res) => {
  let query = /* sql */ `
  SELECT * FROM favouritePrograms
  WHERE userId = $userId`;
  let params = { $userId: req.params.userId };

  db.all(query, params,(err, favourites) => {
    res.json(favourites)
  });
};

const getFavouriteChannels = (req, res) => {
  let query = /* sql */ `
  SELECT * FROM favouriteChannels
  WHERE userId = $userId`;
  let params = { $userId: req.params.userId };

  db.all(query, params, (err, favourites) => {
    res.json(favourites)
  });
};

const addFavouriteChannel = (req, res) => {
  let query = /* sql */ `
  INSERT INTO favouriteChannels (channelId, name, description, image, userId)
  VALUES( $channelId, $name, $description, $image, $userId)`;
  let params = {
    $channelId: req.body.id,
    $name: req.body.name,
    $description: req.body.tagline,
    $image: req.body.image,
    $userId: req.params.userId
  };

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Channel successfully added to favourites", lastID: this.lastID })
  });
};
const addFavouriteProgram = (req, res) => {
  let query = /* sql */ `
  INSERT INTO favouritePrograms (programId, name, description, image, userId)
  VALUES( $programId, $name, $description, $image, $userId)`;
  let params = {
    $programId: req.body.id,
    $name: req.body.name,
    $description: req.body.description,
    $image: req.body.programimage,
    $userId: req.params.userId
  };

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Program successfully added to favourites", lastID: this.lastID })
  });
};

const deleteFavouriteChannel = (req, res) => {
  let query = /* sql */ `
  DELETE FROM favouriteChannels
  WHERE userId = $userId AND channelId = $channelId`;
  let params = { 
    $userId: req.params.userId,
    $channelId: req.params.channelId
  };
  
  db.run(query, params, function(err){
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Channel has been deleted from favourites", changes: this.changes });
  });
};

const deleteFavouriteProgram = (req, res) => {
  let query = /* sql */ `
  DELETE FROM favouritePrograms
  WHERE userId = $userId AND programId = $programId`;
  let params = { 
    $userId: req.params.userId,
    $programId: req.params.programId
  };
  
  db.run(query, params, function(err){
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Program has been deleted from favourites", changes: this.changes });
  });
};


module.exports = {
  getFavouritePrograms,
  getFavouriteChannels,
  addFavouriteChannel,
  addFavouriteProgram,
  deleteFavouriteChannel,
  deleteFavouriteProgram
};
