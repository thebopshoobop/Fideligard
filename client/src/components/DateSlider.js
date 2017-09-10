import moment from "moment";
import React from "react";
import Slider from "react-rangeslider";
import { Segment, Header, Accordion, Icon, Button } from "semantic-ui-react";

const form = date => moment(date).format("L");
const latest = moment()
  .startOf("day")
  .subtract(1, "week");
const earliest = latest.clone().subtract(30, "years");

class DateSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: this.props.start,
      end: this.props.end
    };
  }

  updateStart = start => this.setState({ start });
  updateEnd = end => this.setState({ end });

  render() {
    return (
      <Segment>
        <Header as="h3">{`Trading Day: ${form(this.props.current)}`}</Header>

        <Slider
          min={this.props.start}
          max={this.props.end}
          step={86400000}
          value={this.props.current}
          tooltip={false}
          onChange={value => this.props.updateCurrent(value)}
        />

        <Accordion>
          <Accordion.Title>
            <Icon name="dropdown" />
            {`Range: ${form(this.props.start)} - ${form(this.props.end)}`}
          </Accordion.Title>
          <Accordion.Content>
            <Header as="h4">Select a New Range:</Header>
            Start: {form(this.state.start)}
            <Slider
              min={+earliest}
              max={this.state.end}
              step={86400000}
              value={this.state.start}
              tooltip={false}
              onChange={value => this.updateStart(value)}
            />
            End: {form(this.state.end)}
            <Slider
              min={this.state.start}
              max={+latest}
              step={86400000}
              value={this.state.end}
              tooltip={false}
              onChange={value => this.updateEnd(value)}
            />
            <Button primary onClick={() => this.props.updateRange(this.state)}>
              Fetch!
            </Button>
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

export default DateSlider;
