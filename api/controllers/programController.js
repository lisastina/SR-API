const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";
const utils = require("../core/utilities");

const getAllPrograms = async(req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?${json}&${paginationFalse}`
  );
  programs = await programs.json();
  res.json(programs.programs);
};

const getProgramById = async (req, res) => {
  let program = await fetch(
    `http://api.sr.se/api/v2/programs/${req.params.programId}?${json}`
  );
    program = await program.json();
    res.json(program.program);
};

const getProgramEpisodes = async (req, res) => {
  let episodes = await fetch(
    `http://api.sr.se/api/v2/episodes/index?programid=${req.params.programId}&${json}&${paginationFalse}`
  );
  episodes = await episodes.json();

  episodes.episodes = episodes.episodes.map((p) => {
    return {
    ...p,
    publishdateutc: utils.convertToDateObject(p.publishdateutc)
    };
    });

  res.json(episodes.episodes)
}

const getAllProgramsByChannel = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${paginationFalse}`
  );
  programs = await programs.json();
  res.json(programs.programs);
};

module.exports = {
  getAllPrograms,
  getProgramById,
  getAllProgramsByChannel,
  getProgramEpisodes,

};