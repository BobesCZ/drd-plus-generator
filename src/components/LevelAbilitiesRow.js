import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { connect } from 'react-redux';
import changeAbility from '../actionPackages/changeAbility';
import isAbilityMain from '../helpers/isAbilityMain';
import translations from '../translations';

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
    abilities: state.getIn(['character', 'abilities']),
    levels: state.getIn(['character', 'levels']),
  };
};

class ConnectedLevelAbilitiesRow extends React.Component {
  constructor (props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
  }

  handleButtonClick (event) {
    const target = event.target;
    const value = target.value;
    const ability = target.name;
    const level = target.getAttribute('data-level');
    changeAbility(ability, level, value);
  }

  handleResetButtonClick (event) {
    let target = event.target;
    const charAbilities = this.props.abilities;
    const charLevel = this.props.info.get('level');
    const levels = this.props.levels;

    // Target can be span with icon inside button
    if (target.nodeName !== 'BUTTON') {
      target = target.closest('button');
    }
    const level = target.getAttribute('data-level');

    // Reset this level and all higher levels
    for (let i = parseInt(level); i <= charLevel; i++) {
      charAbilities.keySeq().forEach((ability) => {
        // Get current value for each ability
        const currentLevelValue = levels.getIn([parseInt(i), 'abilities', ability, 'value']);
        if (currentLevelValue > 0) {
          // Use changeAbility with negative current value (should result in 0)
          changeAbility(ability, i, parseInt(currentLevelValue * -1));
        }
      });
    }
  }

  render () {
    const level = this.props.level;
    const charClass = this.props.info.get('class');
    const charAbilities = this.props.abilities;
    const levels = this.props.levels.get(level);
    const hidden = this.props.hidden;
    const completed = this.props.completed;

    const mainAbilityPoints = levels.get('mainAbilityPoints');
    const secondaryAbilityPoints = levels.get('secondaryAbilityPoints');
    let mainAbilityPointsDistributed = 0;
    let secondaryAbilityPointsDistributed = 0;

    const charAbilitiesArray = [];

    charAbilities.mapKeys(item => {
      const isMain = isAbilityMain(charClass, item);
      const value = levels.getIn(['abilities', item, 'value']);

      charAbilitiesArray[item] = isMain;
      if (isMain) {
        mainAbilityPointsDistributed += parseInt(value);
      }
      else {
        secondaryAbilityPointsDistributed += parseInt(value);
      }
    });

    const mainAbilityPointsLeft = mainAbilityPoints - mainAbilityPointsDistributed;
    const secondaryAbilityPointsLeft = secondaryAbilityPoints - secondaryAbilityPointsDistributed;

    let title = '';
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
              <span className="text-primary">{mainAbilityPointsLeft}</span>
              &nbsp;/&nbsp;
              <span className="text-success">{secondaryAbilityPointsLeft}</span>
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
              className={hidden || (completed && parseInt(levels.getIn(['abilities', item, 'value'])) === 0) ? 'btn btn-default' : charAbilitiesArray[item] ? 'btn btn-primary' : 'btn btn-success'}
              name={item}
              onClick={this.handleButtonClick}
              data-level={level}
              value="+1"
              disabled={hidden ? true : !!levels.getIn(['abilities', item, 'disabled'])}
            >
              {levels.getIn(['abilities', item, 'value'])}
            </button>
          </td>
        ))}

        <td>
          <OverlayTrigger
            placement="left"
            overlay={
              <Popover id="levelAbilitiesPopover">
                <Popover.Title>
                  {translations.levelAbilitiesPopoverTitle}
                </Popover.Title>
                <Popover.Content>
                  {translations.levelAbilitiesPopover}
                </Popover.Content>
              </Popover>
            }
          >
            <button
              type="button"
              className={hidden ? 'btn btn-default btn-sm' : 'btn btn-danger'}
              onClick={this.handleResetButtonClick}
              data-level={level}
              disabled={!!hidden}
            >
              <i className="fas fa-times"></i>
            </button>
          </OverlayTrigger>
        </td>

      </tr>

    );
  }
}

const LevelAbilitiesRow = connect(mapStateToProps)(ConnectedLevelAbilitiesRow);

export default LevelAbilitiesRow;
