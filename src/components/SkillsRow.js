import React from "react";
import { connect } from "react-redux";
import setSkill from "../actions/setSkill";
import getRomanizedNumber from "../helpers/getRomanizedNumber";
import translations from "../translations";

const mapDispatchToProps = dispatch => {
  return {
    setSkill: item => dispatch(setSkill(item)),
    // distributeBackground: item => dispatch(distributeBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    skills: state.getIn(['character', 'skills']),
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
    this.props.setSkill({ skillName, skillType, value});
  }

  render(props) {
    let skills = this.props.skills
    let skillType = this.props.skillType
    let skillName = this.props.skillName
    let currentAvailablePoints = this.props.currentAvailablePoints
    let skillDegree = skills.getIn(['distributed', skillType, skillName])

    let skillDegreesArray = [];

    for (var i=0; i <= 3; i++) {
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

const SkillsRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedSkillsRow);

export default SkillsRow;
