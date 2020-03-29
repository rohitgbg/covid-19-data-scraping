const cron = require("node-cron");
const colors = require("colors");
const shell = require("./child_helper");

cron.schedule("0 */4 * * *", function() {
  console.log(">>>>CRON JOB STARTED<<<<".red.bold);
  const commandList = ["node seeder.js -d", "node seeder.js -si"];
  shell.series(commandList, function(err) {
    if (err) {
      console.log("Cron job error", err);
    }
    console.log(">>>>CRON JOB COMPLETED<<<<".red.bold);
  });
});
