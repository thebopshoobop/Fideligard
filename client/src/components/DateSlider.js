import moment from "moment";
import React from "react";
import DatePicker from "react-datepicker";

const DateSlider = ({ current, start, end }) => {
  return (
    <DatePicker
      selected={moment(current)}
      minDate={moment(start)}
      maxDate={moment(end)}
    />
  );
};

export default DateSlider;
