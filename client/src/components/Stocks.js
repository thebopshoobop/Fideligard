import React from "react";
import { Header, Segment, Table } from "semantic-ui-react";

const Stock = ([ticker, prices], date) => (
  <Table.Row key={ticker}>
    <Table.Cell>{ticker}</Table.Cell>
    {prices[date].map((p, i) => <Table.Cell key={`${p + i}`} content={p} />)}
  </Table.Row>
);

const headers = ["Ticker", "Price", "1d", "7d", "30d"];

const Stocks = ({ stocks, date }) => (
  <Segment>
    <Header as="h2">Stocks</Header>
    <Table size="small" compact={true} celled striped>
      <Table.Header>
        <Table.Row>
          {headers.map(h => <Table.HeaderCell key={h} content={h} />)}
        </Table.Row>
      </Table.Header>
      <Table.Body>{stocks.map(stock => Stock(stock, date))}</Table.Body>
    </Table>
  </Segment>
);

export default Stocks;
