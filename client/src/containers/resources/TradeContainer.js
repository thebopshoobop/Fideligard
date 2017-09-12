import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Trade from "../../components/resources/Trade";
import { portfolioActions } from "../../actions";

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
    let symbol = queryString.parse(this.props.location.search).ticker;
    if (!symbol) {
      symbol = this.props.symbols[0];
    }
    if (symbol && symbol !== prevState.symbol) {
      this.setState({ symbol });
    }
  }

  componentDidMount() {
    let symbol = queryString.parse(this.props.location.search).ticker;
    if (!symbol) {
      symbol = this.props.symbols[0];
    }
    if (symbol) {
      this.setState({ symbol });
    }
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

  onPlaceOrder = () => {
    if (!this.state.symbol || !this.state.quantity) return;
    const prices = this.props.prices[this.state.symbol];
    if (!prices) return;
    const cost = prices.Price * this.state.quantity;
    this.props.makeTrade(this.state.symbol, this.state.quantity, cost);
  };

  render() {
    const symbols =
      this.state.action === "Buy"
        ? this.props.symbols
        : Object.keys(this.props.portfolio.stocks);

    const tradeSymbol = this.state.symbol || symbols[0];
    const balance = this.props.portfolio.balance;
    const dayPrices = this.props.prices;

    let [price, total, balanceAfter] = [0, 0, balance];
    if (dayPrices && dayPrices[tradeSymbol] && dayPrices[tradeSymbol].Price) {
      price = dayPrices[tradeSymbol].Price;
      total = (price * this.state.quantity).toFixed(2);
      balanceAfter =
        this.state.action === "Buy"
          ? (+balance - +total).toFixed(2)
          : (+balance + +total).toFixed(2);
    }

    const prices = { balance, balanceAfter, price, total };

    const actions = {
      onChangeAction: this.onChangeAction,
      onChangeSymbol: this.onChangeSymbol,
      onChangeQuantity: this.onChangeQuantity,
      onPlaceOrder: this.onPlaceOrder
    };

    const valid = { condition: true, message: "" };
    if (this.state.action === "Buy") {
      if (balanceAfter < 0) {
        valid.condition = false;
        valid.message =
          "Your balance is not sufficient to purchase this many stocks";
      }
    } else {
      if (
        this.props.portfolio.stocks[this.state.symbol] < this.state.quantity
      ) {
        valid.condition = false;
        valid.message = "You don't have enough of this stock to sell";
      }
    }

    return (
      <Trade
        symbols={symbols}
        prices={prices}
        trade={this.state}
        actions={actions}
        valid={valid}
      />
    );
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
  return {
    makeTrade: (ticker, quantity, cost) =>
      dispatch(portfolioActions.makeTrade(ticker, quantity, cost))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TradeContainer)
);
