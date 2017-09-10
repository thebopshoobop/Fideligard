import { stockActions } from "../actions";

const defaultState = {
  symbols: [],
  dates: [],
  byDate: {},
  byCompany: {},
  sort: {
    column: "Symbol",
    direction: true
  }
};

const dates = (state = defaultState, action) => {
  switch (action.type) {
    case stockActions.SET_STOCKS:
      return { ...state, ...action.data };
    case stockActions.SET_SORT:
      return { ...state, sort: action.data };
    default:
      return state;
  }
};

export default dates;
