import React from "react";
import { connect } from "react-redux";
import store from "../store/index";
import translations from "../translations";
import SkillsRow from "./SkillsRow";
import PanelAutofill from "./PanelAutofill";
import getBackgroundSkillsPoints from "../calculations/getBackgroundSkillsPoints";
import getLevelingSkillsPoints from "../calculations/getLevelingSkillsPoints";
import getDistributedSkillsPoints from "../calculations/getDistributedSkillsPoints";
import Navbar  from 'react-bootstrap/lib/Navbar';
import tables from "../data/tables";

const mapDispatchToProps = dispatch => {
  return {
    // setBackground: item => dispatch(setBackground(item)),
    // distributeBackground: item => dispatch(distributeBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
    levels: state.getIn(['character', 'levels']),
    skills: state.getIn(['character', 'skills']),
  };
};

class ConnectedScreenSkills extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    // this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  render(props) {
    let charClass = this.props.info.get('class')
    let levels = this.props.levels
    let skills = this.props.skills.get('distributed')
    let availablePoints = this.props.skills.get('availablePoints')
    let backgroundPoints = this.props.background.getIn(['distributed', 'skills'])
    let availablePointsBackground = getBackgroundSkillsPoints(charClass, backgroundPoints)
    let availablePointsLeveling = getLevelingSkillsPoints(levels)

    let availablePointsArray = []
    let currentAvailablePointsArray = []

    skills.keySeq().forEach((key) => {
      let distributedSkillsPoints = getDistributedSkillsPoints(this.props.skills, key)
      let availableSkillsPoints = availablePoints.get(key)

      // Combat points are equal to physical (except for warriors, that have positive value in combat points)
      if (key === "combat" && availableSkillsPoints === 0) {
        availableSkillsPoints = availablePoints.get("physical")
      }
      availablePointsArray[key] = availableSkillsPoints

      let currentAvailablePoints = parseInt(availableSkillsPoints) - parseInt(distributedSkillsPoints)
      currentAvailablePointsArray[key] = currentAvailablePoints
    })

    return (
      <form>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.skillsPanelHeader}
          </div>
          <div className="card-body">
            <div className="mb-4">
              {translations.skillsPanelBody}
            </div>

            <table className="table">
              <tbody>
                <tr>
                  <th>{translations.skillsPanelTableTh1}</th>
                  <th className="text-center">{translations.physical}</th>
                  <th className="text-center">{translations.psychical}</th>
                  <th className="text-center">{translations.combined}</th>
                </tr>
                <tr>
                  <td>{translations.charOrigin}</td>
                  <td className="text-center">{availablePointsBackground["physical"]}</td>
                  <td className="text-center">{availablePointsBackground["psychical"]}</td>
                  <td className="text-center">{availablePointsBackground["combined"]}</td>
                </tr>
                <tr>
                  <td>{translations.leveling}</td>
                  <td className="text-center">{availablePointsLeveling["physical"]}</td>
                  <td className="text-center">{availablePointsLeveling["psychical"]}</td>
                  <td className="text-center">{availablePointsLeveling["combined"]}</td>
                </tr>
                <tr>
                  <td>{translations.totalPoints}</td>
                  <td className="text-center">{availablePoints.get("physical")}</td>
                  <td className="text-center">{availablePoints.get("psychical")}</td>
                  <td className="text-center">{availablePoints.get("combined")}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        {skills.keySeq().map(key => (
          <div key={key} className="card card--collapse bg-light mb-2">
            <Navbar expand="true" expanded="true">
              <div className={currentAvailablePointsArray[key] === 0 ? "card-header bg-success text-white" : "card-header"}>
                {translations[key]}&nbsp;
                ({translations.distributeLeft} {currentAvailablePointsArray[key]} {translations.from} {availablePointsArray[key]} {translations.points})
                {currentAvailablePointsArray[key] === 0 &&
                  <span> <i className="fas fa-check-circle"></i> </span>
                }
              </div>

              <Navbar.Toggle
                aria-controls={'skills' + key}
                children={
                  <i className="fas fa-chevron-circle-down"></i>
                }
              />

              <Navbar.Collapse id={'skills' + key}>

              <div className="card-body">
                <table className="table">
                  <tbody>

                    {skills.get(key).keySeq().map(skillName => (

                      <SkillsRow key={skillName} skillName={skillName} skillType={key} currentAvailablePoints={currentAvailablePointsArray[key]} />

                    ))}

                  </tbody>
                </table>
              </div>

              </Navbar.Collapse>
            </Navbar>
          </div>
        ))}

        <PanelAutofill screen="screenSkills"/>

      </form>
    )

  }
}

const ScreenSkills = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenSkills);

export default ScreenSkills;
