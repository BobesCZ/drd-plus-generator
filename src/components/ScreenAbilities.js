import React from "react";
import { connect } from "react-redux";
import LevelAbilitiesRow from "./LevelAbilitiesRow";
import getAbilitiesByRace from "../calculations/getAbilitiesByRace";
import getAbilitiesByClass from "../calculations/getAbilitiesByClass";
import translations from "../translations";

const mapDispatchToProps = dispatch => {
  return {
    // setBackground: item => dispatch(setBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
  };
};

class ConnectedScreenAbilities extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    // this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log({ key: name, value: value});
    this.props.setBackground({ "name": value});
  }

  render(props) {
    let charRace = this.props.info.get("race");
    let charSex = this.props.info.get("sex");
    let charClass = this.props.info.get("class");
    let charLevel = this.props.info.get("level");

    let base = getAbilitiesByRace(charRace, charSex);
    let baseClass = getAbilitiesByClass(charClass);

    let maxLevelArray = [];

    for (var i=1; i <= charLevel; i++) {
      maxLevelArray.push(i);
    }

    return (
      <form>

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
                <td>x</td>
              </tr>

              <tr>
                <td>{translations.levelAbilitiesClass}</td>
                <td>{baseClass.strength}</td>
                <td>{baseClass.dexterity}</td>
                <td>{baseClass.manualdexterity}</td>
                <td>{baseClass.will}</td>
                <td>{baseClass.intelligence}</td>
                <td>{baseClass.charisma}</td>
                <td>x</td>
              </tr>

              {maxLevelArray.map(item => (
                <LevelAbilitiesRow level={item} key={item}/>
              ))}

            </tbody>
          </table>

        </div>

      </form>
    )

  }
}

const ScreenAbilities = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenAbilities);

export default ScreenAbilities;
