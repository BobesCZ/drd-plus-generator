import React from "react";
import { connect } from "react-redux";
import setSkill from "../actions/setSkill";
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
    let skillDegree = skills.getIn(['distributed', skillType, skillName])

    let skillDegreesArray = [];

    for (var i=0; i <= 3; i++) {
      // let levels = this.props.levels.get(i);
      // let completed = isLevelRowCompleted(levels)
      // completedLevelArray[i] = completed;

    }
    // console.log(skillDegreesArray)

    return (
      <tr>
        <td>
          {translations[skillName]}
        </td>

        <td>
          <button
            type="button"
            className={'btn btn-default'}
            name={skillName}
            data-type={skillType}
            onClick={this.handleButtonClick}
            value="0"
            >
            0
            {/* skills.getIn(["distributed", skillType, skillName])*/}
          </button>
        </td>
        <td>
          <button
            type="button"
            className={'btn btn-default'}
            name={skillName}
            data-type={skillType}
            onClick={this.handleButtonClick}
            value="1"
            >
            1
          </button>
        </td>
      </tr>
    )

  }
}

const SkillsRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedSkillsRow);

export default SkillsRow;
