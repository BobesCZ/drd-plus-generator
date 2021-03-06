import React from 'react';
import { connect } from 'react-redux';
import autofillScreenAbilities from '../actionPackages/autofillScreenAbilities';
import autofillScreenArmors from '../actionPackages/autofillScreenArmors';
import autofillScreenSkills from '../actionPackages/autofillScreenSkills';
import autofillScreenWeapons from '../actionPackages/autofillScreenWeapons';
import checkScreen from '../actionPackages/checkScreen';
import resolveBackgroundAndChangeScreen from '../actionPackages/resolveBackgroundAndChangeScreen';
import autofillScreen from '../actions/autofillScreen';
import changeScreen from '../actions/changeScreen';
import getNextArrayItem from '../helpers/getNextArrayItem';
import getPreviousArrayItem from '../helpers/getPreviousArrayItem';
import screensArray from '../helpers/screensArray';
import translations from '../translations';

const mapDispatchToProps = dispatch => {
  return {
    changeScreen: item => dispatch(changeScreen(item)),
    autofillScreen: item => dispatch(autofillScreen(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    screens: state.get('screens'),
    activeScreen: state.get('activeScreen'),
  };
};

class ConnectedStepNavigation extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    const target = event.target;
    const screenAutofill = target.getAttribute('data-screen-autofill');

    if (screenAutofill) {
      this.props.autofillScreen({ screen: screenAutofill });

      // Do custom actions when autofill screen
      if (screenAutofill === 'screenBackground') {
        resolveBackgroundAndChangeScreen();
      }
      else if (screenAutofill === 'screenAbilities') {
        autofillScreenAbilities();
      }
      else if (screenAutofill === 'screenSkills') {
        autofillScreenSkills();
      }
      else if (screenAutofill === 'screenWeapons') {
        autofillScreenWeapons();
      }
      else if (screenAutofill === 'screenArmors') {
        autofillScreenArmors();
      }
      else {
        checkScreen(screenAutofill);
      }
    }

    const screen = target.getAttribute('data-screen');
    if (screen) {
      this.props.changeScreen({ active: screen });
    }
  }

  render () {
    const previous = getPreviousArrayItem(screensArray, this.props.activeScreen);
    const next = getNextArrayItem(screensArray, this.props.activeScreen);
    const previousDisabled = this.props.screens.get(previous) < 0;
    const nextDisabled = this.props.screens.get(next) < 0;

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
        {/* Render button for all screen except last */}
        {next &&
          <button type="button" className="btn btn-success stepnavigation__center" data-screen-autofill={this.props.activeScreen} onClick={this.handleClick} disabled={!nextDisabled}>
            {translations.autoFillHeader} &nbsp;
            <i className="fas fa-angle-double-right"></i>
          </button>
        }

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
