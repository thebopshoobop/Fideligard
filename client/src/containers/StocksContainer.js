import React, { Component } from "react";
import { connect } from "react-redux";
import Stocks from "../components/Stocks";
import { stockActions } from "../actions";

class StocksContainer extends Component {
  componentDidMount() {
    this.props.hydrateStocks();
  }

  onClick = column => () => {
    console.log(this.props);
    const direction =
      this.props.sort.column === column ? !this.props.sort.direction : true;
    this.props.updateSort(column, direction);
  };

  render() {
    return <Stocks {...this.props} onClick={this.onClick} />;
  }
}

const filterStocks = stocks => {
  return Object.entries(stocks).slice(0, 15);
};

const mapStateToProps = state => {
  return {
    stocks: filterStocks(state.stocks.records),
    date: state.dates.current,
    sort: state.stocks.sort
  };
};

const mapDispatchToProps = dispatch => ({
  hydrateStocks: () => dispatch(stockActions.hydrateStocks()),
  updateSort: (column, direction) =>
    dispatch(stockActions.setSort(column, direction))
});

// export default () => <StocksContainer />;
export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
