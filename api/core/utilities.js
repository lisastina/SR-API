const convertToDateObject = (SRTimeString) => {

  return new Date(

    parseInt(SRTimeString.replace(/[\/\(\)date]/gi, ""))

  ).toLocaleString().slice(0, -3);

};

// See the following link to an excellent regex site: https://regex101.com/
module.exports = {
  convertToDateObject,
};