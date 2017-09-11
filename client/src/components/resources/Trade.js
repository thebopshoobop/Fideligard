import React from "react";
import { Grid, Form, Dropdown, Message } from "semantic-ui-react";
import Showable from "../elements/Showable";

const buildDrop = ({ options, value, onChange }) => (
  <Dropdown selection options={options} value={value} onChange={onChange} />
);

const afterBalance = (balance, total, action) =>
  action === "Buy"
    ? (+balance - +total).toFixed(2)
    : (+balance + +total).toFixed(2);

const Trade = ({ symbols, dates, prices, portfolio, trade, actions }) => {
  symbols = trade.action === "Buy" ? symbols : Object.keys(portfolio.stocks);
  const tradeSymbol = trade.symbol || symbols[0];
  const balance = portfolio.balance;

  let [price, total, balanceAfter] = [0, 0, balance];
  if (prices && prices[tradeSymbol] && prices[tradeSymbol].Price) {
    price = prices[tradeSymbol].Price;
    total = (price * trade.quantity).toFixed(2);
    balanceAfter = afterBalance(balance, total, trade.action);
  }

  const symbolOptions = {
    options: symbols.map(sym => ({ text: sym, value: sym })),
    value: tradeSymbol,
    onChange: actions.onChangeSymbol
  };

  const actionOptions = {
    options: ["Buy", "Sell"].map(sym => ({ text: sym, value: sym })),
    value: trade.action,
    onChange: actions.onChangeAction
  };

  return (
    <Form>
      <Showable condition={balanceAfter < 0}>
        <Message negative>
          <Message.Header>Invalid Order</Message.Header>
          <p>You don't have enough money to make this trade.</p>
        </Message>
      </Showable>
      <Form.Group>
        <Form.Field width={6}>
          <label>Action</label>
          {buildDrop(actionOptions)}
        </Form.Field>
        <Form.Field width={6}>
          <label>Symbol</label>
          {buildDrop(symbolOptions)}
        </Form.Field>
        <Form.Input
          type="number"
          value={trade.quantity}
          onChange={actions.onChangeQuantity}
          label="Quantity"
          width={4}
        />
      </Form.Group>
      <Grid verticalAlign="middle">
        <Grid.Column width={6}>
          <Form.Field>
            <label>Available Balance: ${balance}</label>
            <label>Balance After trade: ${balanceAfter}</label>
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={6}>
          <Form.Field>
            <label>Price: ${price}</label>
            <label>Total: ${total}</label>
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={4}>
          <Showable condition={balanceAfter > 0}>
            <Form.Button color="violet">Place Order</Form.Button>
          </Showable>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

export default Trade;
