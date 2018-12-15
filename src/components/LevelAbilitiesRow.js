import React from "react";
import { connect } from "react-redux";
import isAbilityMain from "../helpers/isAbilityMain";
import changeAbility from "../actionPackages/changeAbility";
import translations from "../translations";
import tables from "../data/tables";
import OverlayTrigger  from 'react-bootstrap/lib/OverlayTrigger';
import Popover  from 'react-bootstrap/lib/Popover';

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
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
  }

  handleButtonClick(event) {
    const target = event.target;
    const value = target.value;
    const ability = target.name;
    const level = target.getAttribute("data-level");
    changeAbility(ability, level, value);
  }

  handleResetButtonClick(event) {
    let target = event.target;
    let charAbilities = this.props.abilities;
    let charLevel = this.props.info.get('level');
    let levels = this.props.levels;

    // Target can be span with icon inside button
    if (target.nodeName !== "BUTTON") {
      target = target.closest('button')
    }
    const level = target.getAttribute("data-level");

    // Reset this level and all higher levels
    for (var i = parseInt(level); i <= charLevel; i++) {
      charAbilities.keySeq().forEach((ability) => {
        // Get current value for each ability
        let currentLevelValue = levels.getIn([parseInt(i), 'abilities', ability, 'value'])
        if (currentLevelValue > 0) {
          // Use changeAbility with negative current value (should result in 0)
          changeAbility(ability, i, parseInt(currentLevelValue * -1));
        }
      })
    }

  }

  render(props) {
    let level = this.props.level;
    let charClass = this.props.info.get("class");
    let charAbilities = this.props.abilities;
    let levels = this.props.levels.get(level);
    let hidden = this.props.hidden;
    let completed = this.props.completed;

    let mainAbilityPoints = levels.get("mainAbilityPoints");
    let secondaryAbilityPoints = levels.get("secondaryAbilityPoints");
    let mainAbilityPointsDistributed = 0;
    let secondaryAbilityPointsDistributed = 0;

    let charAbilitiesArray = [];

    charAbilities.mapKeys(item => {
      let isMain = isAbilityMain(charClass, item);
      let value = levels.getIn(["abilities", item, "value"]);

      charAbilitiesArray[item] = isMain;
      if (isMain) {
        mainAbilityPointsDistributed += parseInt(value)
      }
      else {
        secondaryAbilityPointsDistributed += parseInt(value)
      }
    })

    let mainAbilityPointsLeft = mainAbilityPoints - mainAbilityPointsDistributed;
    let secondaryAbilityPointsLeft = secondaryAbilityPoints - secondaryAbilityPointsDistributed;

    let title = "";
    if (level === 1) {
      title = translations.levelAbilitiesBackground;
    }
    else {
      title = `${level}. ${translations.level}`;
    }

    return (
      <tr key={level}>
        <td>
          {title}
          {!completed &&
            <span> (
              <span className="text-primary">{mainAbilityPointsLeft}</span> / <span className="text-success">{secondaryAbilityPointsLeft}</span>
            )</span>
          }

          {completed &&
            <span> <i className="fas fa-check-circle text-success"></i> </span>
          }

        </td>

        {Object.keys(charAbilitiesArray).map(item => (
          <td key={item}>
            <button
              type="button"
              className={hidden ? 'btn btn-default' : charAbilitiesArray[item] ? 'btn btn-primary' : 'btn btn-success'}
              name={item}
              onClick={this.handleButtonClick}
              data-level={level}
              value="+1"
              disabled={hidden ? true : levels.getIn(["abilities", item, "disabled"]) ? true : false}
              >
              {levels.getIn(["abilities", item, "value"])}
            </button>
          </td>
        ))}

        <td>
          <OverlayTrigger
            trigger="hover"
            placement="left"
            overlay={
              <Popover id="levelAbilitiesPopover" title={translations.levelAbilitiesPopoverTitle}>
               {translations.levelAbilitiesPopover}
              </Popover>
            }
          >
            <button
              type="button"
              className={hidden ? 'btn btn-default btn-sm' : 'btn btn-danger'}
              onClick={this.handleResetButtonClick}
              data-level={level}
              disabled={hidden ? true : false}
              >
              <i className="fas fa-times"></i>
            </button>
          </OverlayTrigger>
        </td>

      </tr>

    )

  }
}

const LevelAbilitiesRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedLevelAbilitiesRow);

export default LevelAbilitiesRow;
