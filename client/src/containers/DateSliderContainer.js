import DateSlider from "../components/DateSlider";
import { connect } from "react-redux";
import { dateActions } from "../actions";

const mapStateToProps = state => ({ ...state.dates });

const mapDispatchToProps = dispatch => ({
  updateCurrent: date => dispatch(dateActions.setCurrent(+date))
});

const DateSliderContainer = connect(mapStateToProps, mapDispatchToProps)(
  DateSlider
);

export default DateSliderContainer;
