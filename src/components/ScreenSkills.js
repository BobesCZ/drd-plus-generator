import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import getBackgroundSkillsPoints from '../calculations/getBackgroundSkillsPoints';
import getDistributedSkillsPoints from '../calculations/getDistributedSkillsPoints';
import getLevelingSkillsPoints from '../calculations/getLevelingSkillsPoints';
import translations from '../translations';
import PanelAutofill from './PanelAutofill';
import PanelErrata from './PanelErrata';
import SkillsRow from './SkillsRow';

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
    levels: state.getIn(['character', 'levels']),
    skills: state.getIn(['character', 'skills']),
  };
};

class ConnectedScreenSkills extends React.Component {
  render () {
    const charClass = this.props.info.get('class');
    const levels = this.props.levels;
    const skills = this.props.skills.get('distributed');
    const availablePoints = this.props.skills.get('availablePoints');
    const backgroundPoints = this.props.background.getIn(['distributed', 'skills']);
    const availablePointsBackground = getBackgroundSkillsPoints(charClass, backgroundPoints);
    const availablePointsLeveling = getLevelingSkillsPoints(levels);

    const availablePointsArray = [];
    const currentAvailablePointsArray = [];

    skills.keySeq().forEach((key) => {
      let distributedSkillsPoints = getDistributedSkillsPoints(this.props.skills, key);
      let availableSkillsPoints = availablePoints.get(key);

      // Combat points are equal to physical (except for warriors, that have positive value in combat points)
      if (key === 'combat' && availableSkillsPoints === 0) {
        availableSkillsPoints = availablePoints.get('physical');
      }

      // Handle extra points for Warrior
      if (charClass === 'warrior') {
        if (key === 'physical') {
          // Distributed Combat points - check if points are "above combat", and if so, add to Physical distributed points
          let distributedSkillsPointsCombat = getDistributedSkillsPoints(this.props.skills, 'combat') - availablePoints.get('combat');

          if (distributedSkillsPointsCombat < 0) {
            distributedSkillsPointsCombat = 0;
          }
          distributedSkillsPoints = distributedSkillsPointsCombat + getDistributedSkillsPoints(this.props.skills, 'physical');
        }

        else if (key === 'combat') {
          // Distributed Physical points are shared with Combat points
          distributedSkillsPoints = getDistributedSkillsPoints(this.props.skills, 'combat') + getDistributedSkillsPoints(this.props.skills, 'physical');

          // Combat points = (available Combat points) + (available Physical points)
          availableSkillsPoints += availablePoints.get('physical');
        }
      }
      availablePointsArray[key] = availableSkillsPoints;

      let currentAvailablePoints = parseInt(availableSkillsPoints) - parseInt(distributedSkillsPoints);
      // Warriors may have negative currentAvailablePoints for Physical => consider it as 0
      if (currentAvailablePoints < 0) {
        currentAvailablePoints = 0;
      }
      currentAvailablePointsArray[key] = currentAvailablePoints;
    });

    return (
      <form>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.skillsPanelHeader}
          </div>
          <div className="card-body">
            <div className="mb-3">
              {translations.skillsPanelBody}
            </div>

            <table className="table mb-0">
              <tbody>
                <tr>
                  <th>{translations.skillsPanelTableTh1}</th>
                  <th className="text-center">{translations.physical}</th>
                  <th className="text-center">{translations.psychical}</th>
                  <th className="text-center">{translations.combined}</th>
                </tr>
                <tr>
                  <td>{translations.charOrigin}</td>
                  <td className="text-center">{availablePointsBackground.physical}</td>
                  <td className="text-center">{availablePointsBackground.psychical}</td>
                  <td className="text-center">{availablePointsBackground.combined}</td>
                </tr>
                <tr>
                  <td>{translations.leveling}</td>
                  <td className="text-center">{availablePointsLeveling.physical}</td>
                  <td className="text-center">{availablePointsLeveling.psychical}</td>
                  <td className="text-center">{availablePointsLeveling.combined}</td>
                </tr>
                <tr>
                  <td>{translations.totalPoints}</td>
                  <td className="text-center">{availablePoints.get('physical')}</td>
                  <td className="text-center">{availablePoints.get('psychical')}</td>
                  <td className="text-center">{availablePoints.get('combined')}</td>
                </tr>
              </tbody>
            </table>

            {charClass === 'warrior' &&
              <p className="mb-0 mt-3">
                {translations.skillsPanelBodyWarrior}:&nbsp;{availablePoints.get('combat')}
              </p>
            }

          </div>
        </div>

        {charClass === 'warrior' &&
          <PanelErrata name="warriorHasAdditionalWeaponSkillsDegrees"/>
        }

        {skills.keySeq().map(key => (
          <div key={key} className="card card--collapse bg-light mb-2">
            <Navbar expand="true">
              <div className={currentAvailablePointsArray[key] === 0 ? 'card-header bg-success text-white' : 'card-header'}>
                {translations[key]}&nbsp;
                ({translations.distributeLeft} {currentAvailablePointsArray[key]} {translations.from} {availablePointsArray[key]} {translations.points})
                {currentAvailablePointsArray[key] === 0 &&
                  <span> <i className="fas fa-check-circle"></i> </span>
                }
              </div>

              <Navbar.Toggle aria-controls={'skills' + key}>
                <i className="fas fa-chevron-circle-down"></i>
              </Navbar.Toggle>

              <Navbar.Collapse id={'skills' + key}>
                <div className="card-body">
                  <table className="table mb-0">
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
    );
  }
}

const ScreenSkills = connect(mapStateToProps)(ConnectedScreenSkills);

export default ScreenSkills;
