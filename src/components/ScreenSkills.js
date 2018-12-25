import React from "react";
import { connect } from "react-redux";
import store from "../store/index";
import translations from "../translations";
import getBackgroundSkillsPoints from "../calculations/getBackgroundSkillsPoints";
import getLevelingSkillsPoints from "../calculations/getLevelingSkillsPoints";
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
            <Navbar expand="true">
              <div className="card-header">
                {translations[key]}
              </div>

              <Navbar.Toggle
                aria-controls={'skills' + key}
                children={
                  <i className="fas fa-chevron-circle-down"></i>
                }
              />

              <Navbar.Collapse id={'skills' + key}>

              <div className="card-body">

                {skills.get(key).keySeq().map(skill => (
                  <p key={skill}>
                    {translations[skill]}
                    , {skills.getIn([key, skill])}
                  </p>
                ))}

              </div>

              </Navbar.Collapse>
            </Navbar>
          </div>
        ))}

      </form>
    )

  }
}

const ScreenSkills = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenSkills);

export default ScreenSkills;