import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import changeScreen from "../actions/changeScreen";
import screensArray from "../helpers/screensArray";
import getPreviousArrayItem from "../helpers/getPreviousArrayItem";
import getNextArrayItem from "../helpers/getNextArrayItem";

const mapDispatchToProps = dispatch => {
  return {
    changeScreen: item => dispatch(changeScreen(item))
  };
};

const mapStateToProps = (state) => {
  return { 
    screens: state.get('screens'),
    activeScreen: state.get('activeScreen'),
  };
};

class ConnectedStepNavigation extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    const target = event.target;
    let screen = target.getAttribute('data-screen');
    this.props.changeScreen({ active: screen});
  }

  render(props) {
    console.log(this.props.screens.get(this.props.activeScreen))
    
    let previous = getPreviousArrayItem(screensArray, this.props.activeScreen);
    let next = getNextArrayItem(screensArray, this.props.activeScreen);
    let previousDisabled = this.props.screens.get(previous) < 0 ? true : false;
    let nextDisabled = this.props.screens.get(next) < 0 ? true : false;

    return (
      <div className="stepnavigation">
        {/* Render button only if screen exists */}
        {previous &&
          <button type="button" className="btn btn-primary pull-left" data-screen={previous} onClick={this.handleClick} disabled={previousDisabled} >
            <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
            &nbsp; Zpět
          </button>
        }

        {/* Render button only if screen exists */}
        {next &&
          <button type="button" className="btn btn-primary pull-right" data-screen={next} onClick={this.handleClick} disabled={nextDisabled}>
            Pokračovat &nbsp;
            <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
          </button>
        }
      </div>
    );
  }
}

const StepNavigation = connect(mapStateToProps, mapDispatchToProps)(ConnectedStepNavigation);

export default StepNavigation;
