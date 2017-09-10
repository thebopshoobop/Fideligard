import DateSlider from "../components/DateSlider";
import { connect } from "react-redux";
import { dateActions } from "../actions";

const mapStateToProps = state => ({ ...state.dates });

const mapDispatchToProps = dispatch => ({
  updateCurrent: date => dispatch(dateActions.setCurrent(+date)),
  updateRange: ({ start, end }) => dispatch(dateActions.setRange(+start, +end))
});

const DateSliderContainer = connect(mapStateToProps, mapDispatchToProps)(
  DateSlider
);

export default DateSliderContainer;
