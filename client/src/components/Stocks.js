import React from "react";
import { Header, Segment, Table } from "semantic-ui-react";

const Stock = ([ticker, prices], date) => (
  <Table.Row key={ticker}>
    <Table.Cell>{ticker}</Table.Cell>
    <Table.Cell>{prices[date]}</Table.Cell>
  </Table.Row>
);

const Stocks = ({ stocks, date }) => (
  <Segment>
    <Header as="h2">Stocks</Header>
    <Table size="small" compact={true} celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Ticker</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{stocks.map(stock => Stock(stock, date))}</Table.Body>
    </Table>
  </Segment>
);

export default Stocks;
