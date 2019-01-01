import React from "react";
import { connect } from "react-redux";
import store from "../store/index";
import translations from "../translations";
import SkillsRow from "./SkillsRow";
import PanelErrata from "./PanelErrata";
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

class ConnectedScreenWeapons extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    // this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  render(props) {
    let skills = this.props.skills.get('distributed')

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
          </div>
        </div>

        {skills.keySeq().map(key => (
          <div key={key} className="card card--collapse bg-light mb-2">
            <Navbar expand="true">
              <div className="card-header">
                {translations[key]}&nbsp;
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

                      <SkillsRow key={skillName} skillName={skillName} skillType={key} currentAvailablePoints="0" />

                    ))}

                  </tbody>
                </table>
              </div>

              </Navbar.Collapse>
            </Navbar>
          </div>
        ))}

      </form>
    )

  }
}

const ScreenWeapons = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenWeapons);

export default ScreenWeapons;
