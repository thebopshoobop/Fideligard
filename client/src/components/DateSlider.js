import moment from "moment";
import React from "react";
import Slider from "react-rangeslider";
import {
  Segment,
  Header,
  Accordion,
  Icon,
  Button,
  Loader
} from "semantic-ui-react";

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
      end: this.props.end,
      stocks: 39
    };
  }

  updateStart = start => {
    this.setState(start > this.state.end ? { start, end: start } : { start });
  };
  updateEnd = end => {
    this.setState(end < this.state.start ? { end, start: end } : { end });
  };

  updateStocks = stocks => this.setState({ stocks });

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
          <Loader active={this.props.isFetching} size="large" />
          <Accordion.Title>
            <Icon name="dropdown" />
            {`Range: ${form(this.props.start)} - ${form(this.props.end)}`}
          </Accordion.Title>
          <Accordion.Content>
            <Header as="h4">Fetch some new stocks:</Header>
            Start: {form(this.state.start)}
            <Slider
              min={+earliest}
              max={+latest}
              step={86400000}
              value={this.state.start}
              tooltip={false}
              onChange={value => this.updateStart(value)}
            />
            End: {form(this.state.end)}
            <Slider
              min={+earliest}
              max={+latest}
              step={86400000}
              value={this.state.end}
              tooltip={false}
              onChange={value => this.updateEnd(value)}
            />
            Stocks: {this.state.stocks}
            <Slider
              min={1}
              max={3000}
              step={1}
              value={this.state.stocks}
              tooltip={false}
              onChange={value => this.updateStocks(value)}
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
