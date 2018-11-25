import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import changeScreen from "../actions/changeScreen";
import autofillScreen from "../actions/autofillScreen";
import resolveScreen from "../actions/resolveScreen";
import resolveBackgroundAndChangeScreen from "../actionPackages/resolveBackgroundAndChangeScreen";
import screensArray from "../helpers/screensArray";
import getPreviousArrayItem from "../helpers/getPreviousArrayItem";
import getNextArrayItem from "../helpers/getNextArrayItem";

const mapDispatchToProps = dispatch => {
  return {
    changeScreen: item => dispatch(changeScreen(item)),
    autofillScreen: item => dispatch(autofillScreen(item)),
    resolveScreen: item => dispatch(resolveScreen(item)),
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

    let screenAutofill = target.getAttribute('data-screen-autofill');
    if (screenAutofill) {
      this.props.autofillScreen({ screen: screenAutofill});

      // Do custom actions when autofill screen
      if (screenAutofill === "screenBackground") {
        resolveBackgroundAndChangeScreen();
      }
      else {
        this.props.resolveScreen({ active: screenAutofill});
      }
    }

    let screen = target.getAttribute('data-screen');
    if (screen) {
      this.props.changeScreen({ active: screen});
    }
  }

  render(props) {
    let previous = getPreviousArrayItem(screensArray, this.props.activeScreen);
    let next = getNextArrayItem(screensArray, this.props.activeScreen);
    let previousDisabled = this.props.screens.get(previous) < 0 ? true : false;
    let nextDisabled = this.props.screens.get(next) < 0 ? true : false;

    return (

      <div>
        {/* <div className="panel panel-info">
          <div className="panel-heading">
            {translations.autoFillHeader}
          </div>
          <div className="panel-body">
            Jsem spokojen s tím, co vidím ve formuláři, a chci pokračovat dále.
          </div>
        </div>
      */}

        <div className="stepnavigation">
          {/* Render button only if screen exists */}
          {previous &&
            <button type="button" className="btn btn-primary pull-left" data-screen={previous} onClick={this.handleClick} disabled={previousDisabled}>
              <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
              &nbsp; {translations.previousStep}
            </button>
          }

          {/* Render button only if screen is not filled (button hides itself after click) */}
          {nextDisabled &&
            <button type="button" className="btn btn-success" data-screen-autofill={this.props.activeScreen} onClick={this.handleClick}>
              {translations.autoFillHeader} &nbsp;
              <span className="glyphicon glyphicon-forward" aria-hidden="true"></span>
            </button>
          }

          {/* Render button only if screen exists */}
          {next &&
            <button type="button" className="btn btn-primary pull-right" data-screen={next} onClick={this.handleClick} disabled={nextDisabled}>
              {translations.nextStep} &nbsp;
              <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
            </button>
          }
        </div>
      </div>
    );
  }
}

const StepNavigation = connect(mapStateToProps, mapDispatchToProps)(ConnectedStepNavigation);

export default StepNavigation;
