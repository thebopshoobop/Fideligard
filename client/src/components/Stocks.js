import React from "react";
import { Header, Segment, Table, Icon } from "semantic-ui-react";

const Stock = ([ticker, prices], date) => {
  if (!prices[date]) return null;
  return (
    <Table.Row key={ticker}>
      <Table.Cell>{ticker}</Table.Cell>
      {prices[date].map((p, i) => <Table.Cell key={`${p + i}`} content={p} />)}
    </Table.Row>
  );
};

const headers = ["Ticker", "Price", "1d", "7d", "30d"];

const styleHeader = (name, sort) => {
  if (sort.column === name) {
    const flipped = sort.direction ? "vertically" : undefined;
    return (
      <div>
        {name} <Icon name="dropdown" size="large" flipped={flipped} />
      </div>
    );
  } else {
    return name;
  }
};

const Stocks = ({ stocks, date, sort, onClick }) => (
  <Segment>
    <Header as="h2">Stocks</Header>
    <Table size="small" compact={true} celled striped>
      <Table.Header>
        <Table.Row>
          {headers.map(name => (
            <Table.HeaderCell
              onClick={onClick(name)}
              key={name}
              content={styleHeader(name, sort)}
            />
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>{stocks.map(stock => Stock(stock, date))}</Table.Body>
    </Table>
  </Segment>
);

export default Stocks;
