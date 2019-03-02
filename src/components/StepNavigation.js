import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import changeScreen from "../actions/changeScreen";
import autofillScreen from "../actions/autofillScreen";
import resolveScreen from "../actions/resolveScreen";
import resolveBackgroundAndChangeScreen from "../actionPackages/resolveBackgroundAndChangeScreen";
import autofillScreenAbilities from "../actionPackages/autofillScreenAbilities";
import autofillScreenSkills from "../actionPackages/autofillScreenSkills";
import autofillScreenWeapons from "../actionPackages/autofillScreenWeapons";
import autofillScreenArmors from "../actionPackages/autofillScreenArmors";
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
      else if (screenAutofill === "screenAbilities") {
        autofillScreenAbilities();
      }
      else if (screenAutofill === "screenSkills") {
        autofillScreenSkills();
      }
      else if (screenAutofill === "screenWeapons") {
        autofillScreenWeapons();
      }
      else if (screenAutofill === "screenArmors") {
        autofillScreenArmors();
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

      <div className="stepnavigation">
        {/* Render button only if screen exists */}
        {previous &&
          <button type="button" className="btn btn-primary stepnavigation__left" data-screen={previous} onClick={this.handleClick} disabled={previousDisabled}>
          <i className="fas fa-angle-left"></i>
            &nbsp; {translations.previousStep}
          </button>
        }

        {/* Button is enabled only if screen is not filled (button disables itself after click) */}
        <button type="button" className="btn btn-success stepnavigation__center" data-screen-autofill={this.props.activeScreen} onClick={this.handleClick} disabled={!nextDisabled}>
          {translations.autoFillHeader} &nbsp;
          <i className="fas fa-angle-double-right"></i>
        </button>

        {/* Render button only if screen exists */}
        {next &&
          <button type="button" className="btn btn-primary stepnavigation__right" data-screen={next} onClick={this.handleClick} disabled={nextDisabled}>
            {translations.nextStep} &nbsp;
            <i className="fas fa-angle-right"></i>
          </button>
        }
      </div>
    );
  }
}

const StepNavigation = connect(mapStateToProps, mapDispatchToProps)(ConnectedStepNavigation);

export default StepNavigation;
