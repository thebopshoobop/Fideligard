import { setFetching, setSuccess, setError } from "./statusActions.js";
import { FetchError } from "../lib/errors";

export const SET_STOCKS = "SET_STOCKS";
export const SET_SORT = "SET_SORT";

const setStocks = stocks => {
  return {
    type: SET_STOCKS,
    data: stocks
  };
};

export const setSort = (column, direction) => {
  return {
    type: SET_SORT,
    data: { column, direction }
  };
};

const ensureFetch = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new FetchError(response);
  }
  return response.json();
};

export const hydrateStocks = () => async dispatch => {
  try {
    dispatch(setFetching());
    const json = await ensureFetch("/api/stocks");
    dispatch(setStocks(json));
    dispatch(setSuccess());
  } catch (error) {
    dispatch(setError(error));
  }
};
