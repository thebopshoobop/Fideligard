import React from "react";
import Trade from "../../components/resources/Trade";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class TradeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "",
      action: "Buy",
      quantity: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const symbol = queryString.parse(this.props.location.search).ticker;
    if (symbol !== prevState.symbol) {
      this.setState({ symbol });
    }
  }

  componentDidMount() {
    const symbol = queryString.parse(this.props.location.search).ticker;
    if (symbol) this.setState({ symbol });
  }

  onChangeAction = (_, data) => this.setState({ action: data.value });

  onChangeSymbol = (_, data) => {
    this.props.history.push(`/trade?${data.value}`);
    this.setState({ symbol: data.value });
  };

  onChangeQuantity = ({ target }) => {
    const quantity = target.value > 0 ? target.value : 0;
    this.setState({ quantity });
  };

  render() {
    const actions = {
      onChangeAction: this.onChangeAction,
      onChangeSymbol: this.onChangeSymbol,
      onChangeQuantity: this.onChangeQuantity
    };
    return <Trade {...this.props} trade={this.state} actions={actions} />;
  }
}

const mapStateToProps = state => {
  return {
    symbols: state.stocks.symbols,
    dates: { ...state.dates, range: state.stocks.dates },
    prices: state.stocks.records[state.dates.current],
    portfolio: state.portfolio
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TradeContainer)
);
