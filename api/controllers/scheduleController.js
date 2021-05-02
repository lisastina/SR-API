const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";
const utils = require("../core/utilities");

const getChannelSchedule = async (req, res) => {
  let schedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?channelid=${req.params.channelId}&date=${req.query.date}&${json}&${paginationFalse}`
  );
  schedule = await schedule.json();

  schedule.schedule = schedule.schedule.map((p) => {
  return {
  ...p,starttime: p.starttimeutc.replace(/[\/\(\)date]/gi, ""),
  starttimeutc: utils.convertToDateObject(p.starttimeutc),
  endtimeutc: utils.convertToDateObject(p.endtimeutc),
  };
  });
  res.json(schedule.schedule);
};

const getScheduleRightNow = async (req, res) => {
  let schedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes/rightnow?${json}&${paginationFalse}`
  );
  schedule = await schedule.json();
  res.json(schedule.channels)
};

const getScheduleRightNowById = async (req, res) => {
  let schedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes/rightnow?channelid=${req.params.channelId}&${json}&${paginationFalse}`
  );
  schedule = await schedule.json();
  res.json(schedule.channel)
};



module.exports = {
 getChannelSchedule,
 getScheduleRightNow,
 getScheduleRightNowById,
};