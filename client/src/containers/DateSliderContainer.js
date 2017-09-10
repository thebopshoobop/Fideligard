import DateSlider from "../components/DateSlider";
import { connect } from "react-redux";
import { dateActions } from "../actions";

const mapStateToProps = state => ({ ...state.dates });

const mapDispatchToProps = dispatch => ({
  updateCurrent: e => dispatch(dateActions.setCurrent(e.target.value))
});

const DateSliderContainer = connect(mapStateToProps, mapDispatchToProps)(
  DateSlider
);

export default DateSliderContainer;
