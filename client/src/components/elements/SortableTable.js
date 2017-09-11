import React from "react";
import { Table, Icon } from "semantic-ui-react";

const HeaderCellContent = (name, sort) => {
  if (name !== sort.column) return name;

  const flip = sort.direction ? "vertically" : undefined;
  return (
    <div>
      {name} <Icon name="dropdown" size="large" flipped={flip} />
    </div>
  );
};

const Row = ({ cells }) => (
  <Table.Row>
    {cells.map((p, i) => <Table.Cell key={`${p + i}`} content={p} />)}
  </Table.Row>
);

const SortableTable = ({ headers, rows, onClick, sort }) => (
  <Table size="small" compact={true} fixed celled striped>
    <Table.Header>
      <Table.Row>
        {headers.map(name => (
          <Table.HeaderCell
            onClick={onClick(name)}
            key={name}
            content={HeaderCellContent(name, sort)}
          />
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.map((cells, i) => <Row key={`${cells[0] + i}`} cells={cells} />)}
    </Table.Body>
  </Table>
);

export default SortableTable;
