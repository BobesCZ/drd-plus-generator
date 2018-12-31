import React from "react";
import { connect } from "react-redux";
import changeSkill from "../actionPackages/changeSkill";
import getRomanizedNumber from "../helpers/getRomanizedNumber";
import translations from "../translations";

const mapStateToProps = (state) => {
  return {
    skills: state.getIn(['character', 'skills']),
    errata: state.getIn(['errata']),
  };
};

class ConnectedSkillsRow extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    const target = event.target;
    const value = target.value;
    const skillName = target.name;
    const skillType = target.getAttribute('data-type');
    changeSkill(skillName, skillType, value)
  }

  render(props) {
    let skills = this.props.skills
    let skillType = this.props.skillType
    let skillName = this.props.skillName
    let errata = this.props.errata
    let currentAvailablePoints = this.props.currentAvailablePoints
    let skillDegree = skills.getIn(['distributed', skillType, skillName])

    let skillDegreesArray = [];
    let degreesLimit = 3;

    // For all skills in group "fightWithWeapon" create additional degrees when:
    // Errata are allowed
    // Skill is type Combat (except wearingArmor and usingShield)
    if (
        errata.get("warriorHasAdditionalWeaponSkillsDegrees") &&
        skillType === "combat" &&
        skillName !== "wearingArmor" &&
        skillName !== "usingShield"
      )
    {
      degreesLimit = 6
    }

    for (var i=0; i <= degreesLimit; i++) {
      let active = i == skillDegree ? true : false;
      let disabled = true

      if (
        i <= skillDegree ||
        i <= (currentAvailablePoints + skillDegree)
      )
      {
        disabled = false
      }

      skillDegreesArray[i] = {}
      skillDegreesArray[i]["value"] = i;
      skillDegreesArray[i]["active"] = active;
      skillDegreesArray[i]["disabled"] = disabled;
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
              disabled={key.disabled ? true : false}
              >
              {key.value === 0 ? "0" : getRomanizedNumber(key.value) + "."}
            </button>
          </td>
        ))}

      </tr>
    )

  }
}

const SkillsRow = connect(mapStateToProps)(ConnectedSkillsRow);

export default SkillsRow;
