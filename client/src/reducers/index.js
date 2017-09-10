import { combineReducers } from "redux";

import dates from "./dates";
import stocks from "./stocks";
import status from "./status";

const stocksApp = combineReducers({ dates, stocks, status });
export default stocksApp;
