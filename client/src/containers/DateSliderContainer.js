import DateSlider from "../components/DateSlider";
import { connect } from "react-redux";
import { dateActions, stockActions } from "../actions";

const mapStateToProps = state => ({
  ...state.dates,
  isFetching: state.status.isFetching
});

const mapDispatchToProps = dispatch => ({
  updateCurrent: date => dispatch(dateActions.setCurrent(+date)),
  updateRange: ({ start, end, stocks }) =>
    dispatch(stockActions.fetchStocks(+start, +end, stocks))
});

const DateSliderContainer = connect(mapStateToProps, mapDispatchToProps)(
  DateSlider
);

export default DateSliderContainer;
