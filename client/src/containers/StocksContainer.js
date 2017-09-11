import React, { Component } from "react";
import { connect } from "react-redux";
import Stocks from "../components/Stocks";
import { stockActions } from "../actions";

class StocksContainer extends Component {
  componentDidMount() {
    this.props.hydrateStocks();
  }
  render() {
    return <Stocks {...this.props} />;
  }
}

const filterStocks = stocks => {
  return Object.entries(stocks).slice(0, 15);
};

const mapStateToProps = state => {
  return {
    stocks: filterStocks(state.stocks.records),
    date: state.dates.current
  };
};

const mapDispatchToProps = dispatch => ({
  hydrateStocks: () => dispatch(stockActions.hydrateStocks())
});

// export default () => <StocksContainer />;
export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
