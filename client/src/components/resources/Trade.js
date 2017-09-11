import React from "react";
import { Grid, Form } from "semantic-ui-react";

const Trade = () => (
  <Grid>
    <Grid.Column width={8}>
      <Form>
        <Form.Input label="Symbol" />
        <Form.Input label="Action" />
        <Form.Input label="Quantity" />
        <Form.Input label="Date" />
        <p>
          <strong>Price:</strong> $dollaz <strong>Total:</strong> $more
        </p>
        <Form.Button>Place Order</Form.Button>
      </Form>
    </Grid.Column>
    <Grid.Column width={8}>Status Stuff</Grid.Column>
  </Grid>
);

export default Trade;
