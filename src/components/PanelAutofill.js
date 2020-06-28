import React from 'react';
import { connect } from 'react-redux';
import setSwitcher from '../actions/setSwitcher';
import getPreferredSkills from '../calculations/getPreferredSkills';
import getPreferredAbility from '../helpers/getPreferredAbility';
import translations from '../translations';

const mapDispatchToProps = dispatch => {
  return {
    setSwitcher: item => dispatch(setSwitcher(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    switchers: state.get('switchers'),
  };
};

class ConnectedPanelAutofill extends React.Component {
  constructor (props) {
    super(props);
    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // Do custom actions when change switcher
    if (name === 'autoFillAbilities') {
      this.props.setSwitcher({ key: name, value: value });
    }
  }

  render () {
    const screen = this.props.screen;
    const charClass = this.props.info.get('class');
    let content;

    if (screen === 'screenBackground') {
      content = translations.autoFillBackground;
    }
    else if (screen === 'screenAbilities') {
      const abilitiesStringArray = [];
      const checked = this.props.switchers.get('autoFillAbilities');

      ['combatFocus', 'nonCombatFocus'].forEach((combatType) => {
        const abilities = [];

        ['primaryPreferred', 'primaryOther', 'primaryEqual', 'secondaryPreferred', 'secondaryOther', 'secondaryEqual'].forEach((item) => {
          const ability = getPreferredAbility(charClass, item, combatType);

          if (ability) {
            if (typeof ability === 'object') {
              const abilitiesEqual = [];
              let abilitiesEqualString;

              ability.forEach((i) => {
                abilitiesEqual.push(translations[i]);
              });
              abilitiesEqualString = abilitiesEqual.join(' + ');
              abilities.push(abilitiesEqualString);
            }
            else {
              abilities.push(translations[ability]);
            }
          }
        });

        abilitiesStringArray.push(abilities.join(', '));
      });

      content = <div>
        <p>
          {translations.autoFillAbilities}
        </p>
        <p>
          {translations.autoFillAbilitiesClass1}&nbsp;
          {translations[charClass]}&nbsp;
          {translations.autoFillAbilitiesClass2}&nbsp;<br />

          <strong>
            {translations.combatFocus}
          </strong>:
                    &nbsp;{abilitiesStringArray[0]}<br />

          <strong>
            {translations.nonCombatFocus}
          </strong>:
                    &nbsp;{abilitiesStringArray[1]}

        </p>
        <label className="switch-light mb-0">
          <input
            type="checkbox"
            name="autoFillAbilities"
            checked={checked}
            onChange={this.handleChangeFormInput}
          />

          <span className="switch-light__inner">
            <span className="switch-light__false">
              {translations.autoFillAbilitiesFalse}
            </span>

            <span className="switch-light__true">
              {translations.autoFillAbilitiesTrue}
            </span>

            <a className="btn btn-success"></a>
          </span>

        </label>
      </div>;
    }

    else if (screen === 'screenSkills') {
      const orderedSkills = getPreferredSkills();
      const skillsStringArray = [];

      ['psychical', 'combined'].forEach((skillType) => {
        const skills = [];

        orderedSkills[skillType].preferred.forEach((i) => {
          skills.push(translations[i]);
        });
        skillsStringArray.push(skills.join(', '));
      });

      content = <div>
        <p>
          {translations.autoFillSkills}
        </p>
        <p className="mb-0">
          {translations.autoFillSkillsInfo1}<br />

          <strong>
            {translations.psychical}
          </strong>:
                    &nbsp;{skillsStringArray[0]}<br />

          <strong>
            {translations.combined}
          </strong>:
                    &nbsp;{skillsStringArray[1]}

        </p>
      </div>;
    }

    else if (screen === 'screenWeapons') {
      content = translations.autoFillWeapons;
    }

    else if (screen === 'screenArmors') {
      content = translations.autoFillArmors;
    }

    return (
      <div className="card alert-success mb-4">
        <div className="card-header">
          <i className="fas fa-angle-double-right"></i>
          {translations.autoFillHeader}
        </div>
        <div className="card-body">
          {content}
        </div>
      </div>
    );
  }
}

const PanelAutofill = connect(mapStateToProps, mapDispatchToProps)(ConnectedPanelAutofill);

export default PanelAutofill;
