// Require es6-promise polyfill and isomorphic-fetch
require("isomorphic-fetch");

// Express
const express = require("express");
const app = express();

// Set development port to 3001
app.set("port", process.env.PORT || 3001);

// When in production, only serve static assets
// from the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Hydration Endpoint
app.get("/api/stocks", (req, res, next) => {
  try {
    res.json(require("./stockData.json"));
  } catch (error) {
    next(error);
  }
});

// Fetch Endpoint
const fetchData = require("./fetchData");
app.get("/api/stocks/fetch", async (req, res, next) => {
  try {
    let { start, end, columns, tickers } = req.query;
    // if (!start) throw new Error("A start date is required");

    columns = columns ? columns.split(",") : columns;
    tickers = isNaN(tickers) && tickers ? tickers.split(",") : tickers;

    res.json(await fetchData(start, end, columns, tickers));
  } catch (error) {
    console.log("catching");
    next(error);
  }
});

// Handle errors
app.use((err, req, res, next) => {
  console.error("Error: ", err.stack);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
