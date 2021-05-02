const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";
const utils = require("../core/utilities");

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  channels = await channels.json();
  res.json(channels.channels);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
    channel = await channel.json();
    res.json(channel.channel);
};

module.exports = {
  getAllChannels,
  getChannelById,

};