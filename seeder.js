const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");

// Scrape functions
const {
  indianStateData,
  worldData,
  overAllWolrdData,
  overAllIndianData
} = require("./scrape");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to db
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(
    `Mongodb connected: ${conn.connection.host} `.cyan.underline.bold
  );
};
connectDB();

// Load models
const WorldData = require("./model/WorldData");
const IndianState = require("./model/IndianStateData");
const OverAllWorld = require("./model/OverAllWorldData");
const OverAllIndian = require("./model/OverAllIndianData");

//Scrape the data
const scrapeData = async () => {
  try {
    const indianState = await indianStateData();
    const world = await worldData();
    const overAllWorld = await overAllWolrdData();
    const overAllIndia = await overAllIndianData();

    console.log(">>>>SCRAPING COMPLETED<<<<".green.bold);

    await insertDataToDB(indianState, world, overAllWorld, overAllIndia);
    process.exit();
  } catch (error) {
    console.log("ERROR-scarpeData: ", error);
  }
};

// Insert data
const insertDataToDB = async (
  indianState,
  world,
  overAllWorld,
  overAllIndia
) => {
  try {
    await IndianState.create(indianState);
    await OverAllWorld.create(overAllWorld);
    await OverAllIndian.create(overAllIndia);
    await WorldData.create(world, { ordered: false });

    console.log(">>>>INSERT TO DB COMPLETED<<<<".green.bold);
  } catch (error) {
    if (error && error.code == 11000) {
      console.log(">>>>Duplicate data ignored<<<<".green.bold);
      console.log(">>>>INSERT TO DB COMPLETED<<<<".green.bold);
      return;
    }
    console.log("ERROR-insertDataToDB:", error);
  }
};

// Remove data from database
const deleteData = async () => {
  try {
    await WorldData.deleteMany();
    await IndianState.deleteMany();
    await OverAllWorld.deleteMany();
    await OverAllIndian.deleteMany();
    console.log(">>>>DATA DELETION COMPLETED<<<<".green.bold);
    process.exit();
  } catch (error) {
    console.log("ERROR-insertDataToDB:", error);
  }
};

// file arguments
if (process.argv[2] === "-si") {
  scrapeData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
