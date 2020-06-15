import React from "react";
import { connect } from "react-redux";
import LevelAbilitiesRow from "./LevelAbilitiesRow";
import PanelAutofill from "./PanelAutofill";
import getAbilitiesByRace from "../calculations/getAbilitiesByRace";
import getAbilitiesByClass from "../calculations/getAbilitiesByClass";
import isLevelRowCompleted from "../helpers/isLevelRowCompleted";
import translations from "../translations";
import Alert  from 'react-bootstrap/Alert';

const mapDispatchToProps = dispatch => {
  return {
    // setBackground: item => dispatch(setBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
    levels: state.getIn(['character', 'levels']),
  };
};

class ConnectedScreenAbilities extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render(props) {
    let charRace = this.props.info.get("race");
    let charSex = this.props.info.get("sex");
    let charClass = this.props.info.get("class");
    let charLevel = this.props.info.get("level");

    let base = getAbilitiesByRace(charRace, charSex);
    let baseClass = getAbilitiesByClass(charClass);

    let maxLevelArray = [];
    let completedLevelArray = [];

    // Array for "hidden" property
    // Row is hidden, if previous row is not completed (first row is always hidden: false)
    for (var i=1; i <= charLevel; i++) {
      let levels = this.props.levels.get(i);
      let completed = isLevelRowCompleted(levels)
      completedLevelArray[i] = completed;

      if (i === 1) {
        maxLevelArray[i] = false;
      }
      else if (completedLevelArray[i-1] === true) {
        maxLevelArray[i] = false;
      }
      else {
        maxLevelArray[i] = true;
      }
    }

    return (
      <form>

        <Alert dismissible variant="warning">
          <Alert.Heading>
            <i className="fas fa-exclamation-triangle"></i>
            {translations.levelAbilitiesAlertTitle}
          </Alert.Heading>
          <p>
            {translations.levelAbilitiesAlert}
          </p>
        </Alert>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.abilitiesPanelHeader}
          </div>
          <div className="card-body">
            {translations.abilitiesPanelBody}
            <ul>
              <li>{translations.abilitiesPanelLi1}</li>
              <li>{translations.abilitiesPanelLi2}</li>
              <li>{translations.abilitiesPanelLi3}</li>
            </ul>

          </div>
        </div>

        <div className="form-group">

          <table className="table level-table">
            <tbody>
              <tr>
                <th></th>
                <th>{translations.strengthAbbr}</th>
                <th>{translations.dexterityAbbr}</th>
                <th>{translations.manualdexterityAbbr}</th>
                <th>{translations.willAbbr}</th>
                <th>{translations.intelligenceAbbr}</th>
                <th>{translations.charismaAbbr}</th>
                <th></th>
              </tr>

              <tr>
                <td>{translations.levelAbilitiesRace}</td>
                <td>{base.strength}</td>
                <td>{base.dexterity}</td>
                <td>{base.manualdexterity}</td>
                <td>{base.will}</td>
                <td>{base.intelligence}</td>
                <td>{base.charisma}</td>
                <td>&nbsp;</td>
              </tr>

              <tr>
                <td>{translations.levelAbilitiesClass}</td>
                <td>{baseClass.strength}</td>
                <td>{baseClass.dexterity}</td>
                <td>{baseClass.manualdexterity}</td>
                <td>{baseClass.will}</td>
                <td>{baseClass.intelligence}</td>
                <td>{baseClass.charisma}</td>
                <td>&nbsp;</td>
              </tr>

              {Object.keys(maxLevelArray).map(item => (
                <LevelAbilitiesRow level={parseInt(item)} key={parseInt(item)} hidden={maxLevelArray[item]} completed={completedLevelArray[item]} />
              ))}

            </tbody>
          </table>

        </div>

        <PanelAutofill screen="screenAbilities"/>

      </form>
    )

  }
}

const ScreenAbilities = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenAbilities);

export default ScreenAbilities;
