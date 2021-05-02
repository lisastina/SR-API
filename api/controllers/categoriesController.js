const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";
const utils = require("../core/utilities");


const getAllCategories = async (req, res) => {
  let categories = await fetch("http://api.sr.se/api/v2/programcategories?format=json&pagination=false")
  categories = await categories.json();
  res.json(categories.programcategories)
};

const getProgramsByCategory = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.categoryId}&${json}&${paginationFalse}`
  );

  programs = await programs.json();
  res.json(programs.programs)
};

module.exports = {
  getAllCategories,
  getProgramsByCategory,

};