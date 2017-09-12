import { portfolioActions } from "../actions";

const defaultState = {
  balance: 100000,
  stocks: {}
};

const dates = (state = defaultState, action) => {
  switch (action.type) {
    case portfolioActions.TRADE:
      const { cost, ticker, quantity } = action.data;
      return {
        balance: state.balance - cost,
        stocks: {
          ...state.stocks,
          [ticker]: state.stocks[ticker]
            ? state.stocks[ticker] + quantity
            : quantity
        }
      };
    default:
      return state;
  }
};

export default dates;
