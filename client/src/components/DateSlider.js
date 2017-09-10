import moment from "moment";
import React from "react";
import Slider from "react-rangeslider";
import { Segment, Header } from "semantic-ui-react";

const form = date => moment(date).format("L");

const DateSlider = ({ current, start, end, updateCurrent }) => {
  return (
    <Segment>
      <Header as="h3" content={`Trading Day: ${form(current)}`} />
      <Slider
        min={start}
        max={end}
        step={86400000}
        value={current}
        tooltip={false}
        onChange={value => updateCurrent(value)}
      />
    </Segment>
  );
};

export default DateSlider;

// import DateTime from "react-datetime";
// <DateTime
//   value={current}
//   timeFormat={false}
//   isValidDate={current => current >= start && current < end}
//   closeOnSelect={true}
//   onChange={updateCurrent}
// />
