import React from "react";
import { connect } from "react-redux";
import setSwitcher from "../actions/setSwitcher";
import getPreferredAbility from "../helpers/getPreferredAbility";
import getPreferredSkills from "../calculations/getPreferredSkills";
import translations from "../translations";

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
  constructor(props) {
    super();
    this.state = {};

    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

   handleChangeFormInput(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // Do custom actions when change switcher
    if (name === "autoFillAbilities") {
      this.props.setSwitcher({ key: name, value: value});
    }
  }

  render(props) {
    let screen = this.props.screen;
    let charClass = this.props.info.get("class");
    let content;

    if (screen === "screenBackground") {
      content = translations.autoFillBackground;
    }
    else if (screen === "screenAbilities") {
      let abilitiesStringArray = [];
      let checked = this.props.switchers.get('autoFillAbilities');

      ["combat", "nonCombat"].forEach((combatType) => {
        let abilities = [];

        ["primaryPreferred", "primaryOther", "primaryEqual", "secondaryPreferred", "secondaryOther", "secondaryEqual"].forEach((item) => {
          let ability = getPreferredAbility(charClass, item, combatType)

          if (ability) {
            if (typeof ability === "object") {
              let abilitiesEqual = []
              let abilitiesEqualString

              ability.forEach((i) => {
                abilitiesEqual.push(translations[i])
              })
              abilitiesEqualString = abilitiesEqual.join(" + ")
              abilities.push(abilitiesEqualString)
            }
            else {
              abilities.push(translations[ability])
            }
          }
        })

        abilitiesStringArray.push( abilities.join(", ") )

      })

      content = <div>
                  <p>
                    {translations.autoFillAbilities}
                  </p>
                  <p>
                    {translations.autoFillAbilitiesClass1}&nbsp;
                    {translations[charClass]}&nbsp;
                    {translations.autoFillAbilitiesClass2}&nbsp;<br />

                    <strong>
                      {translations.combat}
                    </strong>:
                    &nbsp;{abilitiesStringArray[0]}<br />

                    <strong>
                      {translations.nonCombat}
                    </strong>:
                    &nbsp;{abilitiesStringArray[1]}

                  </p>
                  <label className="switch-light">
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
                </div>
    }

    else if (screen === "screenSkills") {
      let orderedSkills = getPreferredSkills();
      let skillsStringArray = [];

      ["psychical", "combined"].forEach((skillType) => {
        let skills = [];

        orderedSkills[skillType]["preferred"].forEach((i) => {
          skills.push(translations[i])
        })
        skillsStringArray.push( skills.join(", ") )
      })

      content = <div>
                  <p>
                    {translations.autoFillSkills}
                  </p>
                  <p>
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
                </div>
    }

    else if (screen === "screenWeapons") {
      content = translations.autoFillWeapons;
    }

    else if (screen === "screenArmors") {
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
