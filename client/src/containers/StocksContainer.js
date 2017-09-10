import React, { Component } from "react";
import { connect } from "react-redux";
import Stocks from "../components/Stocks";
import { stockActions } from "../actions";

class StocksContainer extends Component {
  componentDidMount() {
    this.props.hydrateStocks();
  }

  render() {
    return <Stocks />;
  }
}

const mapStateToProps = state => ({
  stocks: state.stocks
});

const mapDispatchToProps = dispatch => ({
  hydrateStocks: () => dispatch(stockActions.hydrateStocks())
});

// export default () => <StocksContainer />;
export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
