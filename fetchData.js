const moment = require("moment");
const { fetchRecords } = require("./quandl");

const buildByCompany = records => {
  return records.reduce((records, [ticker, date, price]) => {
    records[ticker] = records[ticker] ? records[ticker] : {};
    records[ticker][+moment(date)] = price;
    return records;
  }, {});
};

const buildDateList = (start, end) => {
  const day = moment(start);
  const dateList = [];
  do {
    dateList.push(+day);
    day.add(1, "day");
  } while (day < end);
  return dateList;
};

const buildByDate = dates => {
  return dates.reduce((obj, date) => {
    obj[date] = {};
    return obj;
  }, {});
};

const getFirstPrice = (prices, start, end) => {
  const day = moment(start);
  while (!prices[+day] && day < end) {
    day.add(1, "day");
  }
  return prices[+day];
};

const populate = (start, end) => (data, [company, prices]) => {
  let mostRecentPrice = getFirstPrice(prices, start, end);

  for (let day of data.dates) {
    const price = prices[day];
    mostRecentPrice = price ? price : mostRecentPrice;
    data.byCompany[company][day] = mostRecentPrice;
    data.byDate[day][company] = mostRecentPrice;
  }
  return data;
};

const fetchData = async (start, end, columns, tickers) => {
  if (!start) throw new Error("A start date is required");

  const records = await fetchRecords(start, end, columns, tickers);

  start = moment(start);
  end = end ? moment(end) : moment(start).add(1, "year");

  const byCompany = buildByCompany(records);
  const symbols = Object.keys(byCompany);
  const dates = buildDateList(start, end);
  const byDate = buildByDate(dates);

  const schema = { symbols, dates, byDate, byCompany };

  return Object.entries(byCompany).reduce(populate(start, end), schema);
};

module.exports = fetchData;
