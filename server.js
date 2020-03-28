const express = require("express");
const dotevn = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cheerio = require("cheerio");
const request = require("request");

dotevn.config({ path: "./config/config.env" });

const app = express();

//body parser
app.use(express.json());

// Mount routes

//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes
app.get("/scrape", (req, res) => {
  // The URL we will scrape from - in our example Anchorman 2.
  url = "https://www.mohfw.gov.in/";

  const scrapedData = [];

  request(url, async function(error, response, html) {
    if (!error) {
      const $ = await cheerio.load(html);
      $(".newtab   .table-dark  tbody > tr ").each((index, element) => {
        const tds = $(element).find("td");

        const id = $(tds[0]).text();
        const state = $(tds[1]).text();
        const totalConfIndian = $(tds[2]).text();
        const totalConfForeign = $(tds[3]).text();
        const cured = $(tds[4]).text();
        const death = $(tds[5]).text();

        let data;
        if (id.length < 4) {
          data = {
            id,
            state,
            totalConfIndian,
            totalConfForeign,
            cured,
            death
          };
        }

        scrapedData.push(data);
      });

      res.status(200).json({
        success: true,
        data: scrapedData
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
