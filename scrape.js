const axios = require("axios");
const cheerio = require("cheerio");

exports.indianStateData = async () => {
  const url = "https://www.mohfw.gov.in/";
  const html = await axios.get(url);
  const $ = await cheerio.load(html.data);

  const data = [];

  $(".newtab .table-dark tbody tr").each((index, element) => {
    const tds = $(element).find("td");

    const id = $(tds[0]).text();
    const state = $(tds[1]).text();
    const totalConfIndian = $(tds[2]).text();
    const totalConfForeign = $(tds[3]).text();
    const cured = $(tds[4]).text();
    const death = $(tds[5]).text();

    if (id.length < 4) {
      data.push({
        id,
        state,
        totalConfIndian,
        totalConfForeign,
        cured,
        death
      });
    }
  });

  return data;
};

exports.worldData = async () => {
  const url = "https://www.worldometers.info/coronavirus/";
  const html = await axios.get(url);
  const $ = await cheerio.load(html.data);

  const data = [];

  $(".main_table_countries  tbody  tr").each((index, element) => {
    const tds = $(element).find("td");

    const country = $(tds[0])
      .text()
      .trim();
    const totalCases = $(tds[1])
      .text()
      .trim();
    const totalDeaths = $(tds[3])
      .text()
      .trim();
    const totalRecovered = $(tds[5])
      .text()
      .trim();
    const activeCases = $(tds[6])
      .text()
      .trim();
    const criticalCases = $(tds[7])
      .text()
      .trim();
    const firstCase = $(tds[10])
      .text()
      .trim();

    if (country && !country.toLowerCase().startsWith("total")) {
      data.push({
        country: country.trim(),
        totalCases: totalCases ? totalCases : 0,
        totalDeaths: totalDeaths ? totalDeaths : 0,
        totalRecovered: totalRecovered ? totalRecovered : 0,
        activeCases: activeCases ? activeCases : 0,
        criticalCases: criticalCases ? criticalCases : 0,
        firstCase: firstCase.replace(/\n/g, "")
      });
    }
  });

  const result = removeDuplicates(data, "country");
  return result;
};

exports.overAllWolrdData = async () => {
  const url = "https://www.worldometers.info/coronavirus/";
  const html = await axios.get(url);
  const $ = await cheerio.load(html.data);

  const mainCounter = $("#maincounter-wrap").find(".maincounter-number");
  return {
    totalCases: $(mainCounter[0])
      .children()
      .text(),
    totalDeaths: $(mainCounter[1])
      .children()
      .text(),
    totalRecovered: $(mainCounter[2])
      .children()
      .text()
  };
};

exports.overAllIndianData = async () => {
  const url = "https://www.mohfw.gov.in/";
  const html = await axios.get(url);
  const $ = await cheerio.load(html.data);

  const iBlockText = $(".iblock_text").find(".icount");
  return {
    activeCases: $(iBlockText[1]).text(),
    totalRecovered: $(iBlockText[2]).text(),
    totalDeaths: $(iBlockText[3]).text()
  };
};

const removeDuplicates = (originalArray, prop) => {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};
