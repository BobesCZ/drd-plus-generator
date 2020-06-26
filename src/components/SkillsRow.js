import React from 'react';
import { connect } from 'react-redux';
import changeSkill from '../actionPackages/changeSkill';
import getRomanizedNumber from '../helpers/getRomanizedNumber';
import translations from '../translations';

const mapStateToProps = (state) => {
  return {
    skills: state.getIn(['character', 'skills']),
    errata: state.getIn(['errata']),
  };
};

class ConnectedSkillsRow extends React.Component {
  constructor (props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick (event) {
    const target = event.target;
    const value = target.value;
    const skillName = target.name;
    const skillType = target.getAttribute('data-type');
    changeSkill(skillName, skillType, value);
  }

  render () {
    const skills = this.props.skills;
    const skillType = this.props.skillType;
    const skillName = this.props.skillName;
    const errata = this.props.errata;
    const currentAvailablePoints = this.props.currentAvailablePoints;
    const skillDegree = skills.getIn(['distributed', skillType, skillName]);

    const skillDegreesArray = [];
    let degreesLimit = 3;

    // For all skills in group "fightWithWeapon" create additional degrees when:
    // Errata are allowed
    // Skill is type Combat (except wearingArmor and usingShield)
    if (
      errata.get('warriorHasAdditionalWeaponSkillsDegrees') &&
        skillType === 'combat' &&
        skillName !== 'wearingArmor' &&
        skillName !== 'usingShield'
    ) {
      degreesLimit = 6;
    }

    for (let i = 0; i <= degreesLimit; i++) {
      const active = i === skillDegree;
      let disabled = true;

      if (
        i <= skillDegree ||
        i <= (currentAvailablePoints + skillDegree)
      ) {
        disabled = false;
      }

      skillDegreesArray[i] = {};
      skillDegreesArray[i].value = i;
      skillDegreesArray[i].active = active;
      skillDegreesArray[i].disabled = disabled;
    }

    return (
      <tr>
        <td>
          {translations[skillName]}
        </td>

        {skillDegreesArray.map(key => (
          <td key={key.value}>
            <button
              type="button"
              className={key.active ? 'btn btn-primary' : 'btn btn-default'}
              name={skillName}
              data-type={skillType}
              onClick={this.handleButtonClick}
              value={key.value}
              disabled={!!key.disabled}
            >
              {key.value === 0 ? '0' : getRomanizedNumber(key.value) + '.'}
            </button>
          </td>
        ))}

      </tr>
    );
  }
}

const SkillsRow = connect(mapStateToProps)(ConnectedSkillsRow);

export default SkillsRow;
