import React from "react";
import { Grid, Form, Dropdown, Message } from "semantic-ui-react";
import Showable from "../elements/Showable";

const buildDrop = ({ options, value, onChange }) => (
  <Dropdown selection options={options} value={value} onChange={onChange} />
);

const Trade = ({ symbols, prices, trade, actions, valid }) => {
  const symbolOptions = {
    options: symbols.map(sym => ({ text: sym, value: sym })),
    value: trade.symbol,
    onChange: actions.onChangeSymbol
  };

  const actionOptions = {
    options: ["Buy", "Sell"].map(sym => ({ text: sym, value: sym })),
    value: trade.action,
    onChange: actions.onChangeAction
  };

  return (
    <Form onSubmit={actions.onPlaceOrder}>
      <Showable condition={!valid.condition}>
        <Message negative>
          <Message.Header>Invalid Order</Message.Header>
          <p>{valid.message}</p>
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
            <label>Available Balance: ${prices.balance}</label>
            <label>Balance After trade: ${prices.balanceAfter}</label>
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={6}>
          <Form.Field>
            <label>Price: ${prices.price}</label>
            <label>Total: ${prices.total}</label>
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={4}>
          <Showable condition={valid.condition}>
            <Form.Button color="violet">Place Order</Form.Button>
          </Showable>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

export default Trade;
