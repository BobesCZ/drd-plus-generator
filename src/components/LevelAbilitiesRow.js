import React from "react";
import { connect } from "react-redux";
import isAbilityMain from "../helpers/isAbilityMain";
import translations from "../translations";
import tables from "../data/tables";

const mapDispatchToProps = dispatch => {
  return {
    // setBackground: item => dispatch(setBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
    abilities: state.getIn(['character', 'abilities']),
  };
};

class ConnectedLevelAbilitiesRow extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log({ key: name, value: value});
    // this.props.setBackground({ "name": value});
  }

  render(props) {
    let level = this.props.level;
    let charBackground = this.props.background.get("name");
    let charClass = this.props.info.get("class");
    let charAbilities = this.props.abilities;

    let title = "";
    let mainAbilityPoints = 0;
    let secondaryAbilityPoints = 0;
    let maximumAbilityPoint = 0;

    if (level === 1) {
      title = translations.levelAbilitiesBackground;
      mainAbilityPoints = tables.background[charBackground]["mainAbilityPoints"];
      secondaryAbilityPoints = tables.background[charBackground]["secondaryAbilityPoints"];
      maximumAbilityPoint = tables.background[charBackground]["maximumAbilityPoint"];
    }
    else {
      title = `${level}. ${translations.level}`;
      mainAbilityPoints = 1;
      secondaryAbilityPoints = 1;
      maximumAbilityPoint = 1;
    }

    let charAbilitiesArray = [];

    charAbilities.mapKeys(item => {
      let isMain = isAbilityMain(charClass, item);
      charAbilitiesArray[item] = isMain;
    })

    let base = {}

    return (
      <tr key={level}>
        <td>{title} ({mainAbilityPoints} / {secondaryAbilityPoints})</td>

        {Object.keys(charAbilitiesArray).map(item => (
          <td key={item}>
            <button
              type="button"
              className={charAbilitiesArray[item] ? 'btn btn-primary' : 'btn btn-success'}
              name={item}
              onClick={this.handleButtonClick}
              data-level={level}
              value="0"
              >
              0
            </button>
          </td>
        ))}
      </tr>

    )

  }
}

const LevelAbilitiesRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedLevelAbilitiesRow);

export default LevelAbilitiesRow;
