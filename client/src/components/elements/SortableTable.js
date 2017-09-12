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

const Row = ({ cells, onClick }) => (
  <Table.Row onClick={onClick}>
    {cells.map((p, i) => (
      <Table.Cell className="clickable" key={`${p + i}`} content={p} />
    ))}
  </Table.Row>
);

const SortableTable = ({ headers, rows, onClick, sort }) => (
  <Table size="small" compact={true} celled striped>
    <Table.Header>
      <Table.Row>
        {headers.map(name => (
          <Table.HeaderCell
            onClick={onClick(name)}
            key={name}
            content={HeaderCellContent(name, sort)}
            className="clickable"
          />
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.map(({ cells, onClick }, i) => (
        <Row onClick={onClick} key={`${cells[0] + i}`} cells={cells} />
      ))}
    </Table.Body>
  </Table>
);

export default SortableTable;
