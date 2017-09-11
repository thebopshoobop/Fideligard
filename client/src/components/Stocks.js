import React from "react";
import { Header, Segment, Grid, Input } from "semantic-ui-react";
import SortableTable from "./elements/SortableTable";

const headers = ["Ticker", "Price", "1d", "7d", "30d"];

const Stocks = ({ stocks, date, sort, filter, onSort, onFilter }) => {
  const rows = stocks.map(values => {
    return headers.map(name => values[name]);
  });
  return (
    <Segment>
      <Grid>
        <Grid.Column width={6}>
          <Header as="h2">Stocks</Header>
        </Grid.Column>
        <Grid.Column width={10} textAlign="right">
          <Input placeholder="Filter..." value={filter} onChange={onFilter} />
        </Grid.Column>
      </Grid>
      <SortableTable
        rows={rows}
        headers={headers}
        sort={sort}
        onClick={onSort}
      />
    </Segment>
  );
};

export default Stocks;
