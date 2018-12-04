import React from "react";
import { connect } from "react-redux";
import isAbilityMain from "../helpers/isAbilityMain";
import changeAbility from "../actionPackages/changeAbility";
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
    levels: state.getIn(['character', 'levels']),
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
    const ability = target.name;
    const level = target.getAttribute("data-level");
    changeAbility(ability, level, value);
  }

  render(props) {
    let level = this.props.level;
    let charClass = this.props.info.get("class");
    let charAbilities = this.props.abilities;
    let levels = this.props.levels.get(level);

    let mainAbilityPoints = levels.get("mainAbilityPoints");
    let secondaryAbilityPoints = levels.get("secondaryAbilityPoints");
    let maximumAbilityPoint = levels.get("maximumAbilityPoint");

    let charAbilitiesArray = [];

    charAbilities.mapKeys(item => {
      let isMain = isAbilityMain(charClass, item);
      charAbilitiesArray[item] = isMain;
    })

    let title = "";
    if (level === 1) {
      title = translations.levelAbilitiesBackground;
    }
    else {
      title = `${level}. ${translations.level}`;
    }

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
              value="+1"
              disabled={levels.getIn(["abilities", item, "disabled"]) ? true : false}
              >
              {levels.getIn(["abilities", item, "value"])}
            </button>
          </td>
        ))}
      </tr>

    )

  }
}

const LevelAbilitiesRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedLevelAbilitiesRow);

export default LevelAbilitiesRow;
