const fs = require("fs");
const fetchData = require("./fetchData");
const CACHE_FILE = "./stockData.json";
const START_DATE = "20160101";
const END_DATE = "20170101";

console.log("Building Cache...");
fetchData(START_DATE, END_DATE)
  .then(records => {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(records));
    console.log("Done!");
  })
  .catch(e => console.log(e.stack ? e.stack : e));
