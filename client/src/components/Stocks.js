import React from "react";
import { Header, Segment } from "semantic-ui-react";
import SortableTable from "./elements/SortableTable";

const headers = ["Ticker", "Price", "1d", "7d", "30d"];

const Stocks = ({ stocks, date, sort, onClick }) => {
  const rows = stocks.map(values => {
    return headers.map(name => values[name]);
  });
  return (
    <Segment>
      <Header as="h2">Stocks</Header>
      <SortableTable
        rows={rows}
        headers={headers}
        sort={sort}
        onClick={onClick}
      />
    </Segment>
  );
};

export default Stocks;
