import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { connect } from 'react-redux';
import resetLevels from '../actionPackages/resetLevels';
import resolveBackgroundAndChangeScreen from '../actionPackages/resolveBackgroundAndChangeScreen';
import distributeBackground from '../actions/distributeBackground';
import setBackground from '../actions/setBackground';
import tables from '../data/tables';
import sumCollectionValues from '../helpers/sumCollectionValues';
import translations from '../translations';
import PanelAutofill from './PanelAutofill';
import PanelErrata from './PanelErrata';

const mapDispatchToProps = dispatch => {
  return {
    setBackground: item => dispatch(setBackground(item)),
    distributeBackground: item => dispatch(distributeBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
  };
};

class ConnectedScreenBackground extends React.Component {
  constructor (props) {
    super(props);
    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
    this.handleChangeFormCheckbox = this.handleChangeFormCheckbox.bind(this);
  }

  handleChangeFormInput (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.setBackground({ name: value });
    resetLevels();
    resolveBackgroundAndChangeScreen();
  }

  handleChangeFormCheckbox (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.distributeBackground({ key: name, value: value });
    resolveBackgroundAndChangeScreen();
  }

  render () {
    const name = this.props.background.get('name');
    const backgroundFilled = !!name.length;
    const totalPoints = parseInt(this.props.background.get('total'));
    const distributedArray = this.props.background.get('distributed');
    const distributedOrigin = distributedArray.get('origin');
    const distributedProperty = distributedArray.get('property');
    const distributedSkills = distributedArray.get('skills');
    const availablePoints = parseInt(totalPoints - sumCollectionValues(distributedArray));
    let rangeLimit = this.props.background.get('rangeLimit');
    // If there are no distributed points, act like rangeLimit is OK
    rangeLimit = (availablePoints === totalPoints) ? true : rangeLimit;

    let maxAvailableOrigin = 0;
    if (distributedOrigin) {
      maxAvailableOrigin = parseInt(distributedOrigin + availablePoints);
    }
    else {
      maxAvailableOrigin = availablePoints;
    }

    let maxAvailableProperty = 0;
    if (distributedProperty) {
      maxAvailableProperty = parseInt(distributedProperty + availablePoints);
    }
    else {
      maxAvailableProperty = availablePoints;
    }

    let maxAvailableSkills = 0;
    if (distributedSkills) {
      maxAvailableSkills = parseInt(distributedSkills + availablePoints);
    }
    else {
      maxAvailableSkills = availablePoints;
    }

    const originArray = [];
    const propertyArray = [];

    for (let i = 0; i < 9; i++) {
      originArray.push('origin' + i);
      propertyArray.push('property' + i);
    }

    const charClass = this.props.info.get('class');
    const skillsDistributionTable = tables.skillsDistribution[charClass];

    return (
      <form>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.backgroundPanelHeader}
          </div>
          <div className="card-body">
            {translations.backgroundPanelBody}

            <ul>
              <li>{translations.backgroundPanelLi1}</li>
              <li>{translations.backgroundPanelLi2}</li>
              <li>{translations.backgroundPanelLi3}</li>
            </ul>

            <table className="table mb-0">
              <tbody>
                <tr>
                  <th>{translations.backgroundPanelTableTh1}</th>
                  <th className="text-center">{translations.backgroundPanelTableTh2}</th>
                  <th className="text-center">{translations.backgroundPanelTableTh3}</th>
                  <th className="text-center">{translations.backgroundPanelTableTh4}</th>
                </tr>
                <tr>
                  <td>{translations.goodAbility}</td>
                  <td className="text-center">{tables.background.goodAbility.mainAbilityPoints}</td>
                  <td className="text-center">{tables.background.goodAbility.secondaryAbilityPoints}</td>
                  <td className="text-center">{tables.background.goodAbility.totalPoints}</td>
                </tr>
                <tr>
                  <td>{translations.combinationBackground}</td>
                  <td className="text-center">{tables.background.combinationBackground.mainAbilityPoints}</td>
                  <td className="text-center">{tables.background.combinationBackground.secondaryAbilityPoints}</td>
                  <td className="text-center">{tables.background.combinationBackground.totalPoints}</td>
                </tr>
                <tr>
                  <td>{translations.goodBackground}</td>
                  <td className="text-center">{tables.background.goodBackground.mainAbilityPoints}</td>
                  <td className="text-center">{tables.background.goodBackground.secondaryAbilityPoints}</td>
                  <td className="text-center">{tables.background.goodBackground.totalPoints}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputBackground">
            {translations.backgroundHeader}&nbsp;
          </label>
          <select
            className="form-control"
            id="inputBackground"
            name="background"
            value={name}
            onChange={this.handleChangeFormInput}
          >
            <option value=""></option>
            <option value="goodAbility">{translations.goodAbility}</option>
            <option value="combinationBackground">{translations.combinationBackground}</option>
            <option value="goodBackground">{translations.goodBackground}</option>
          </select>
        </div>

        {/* Show after name select is filled */}
        {backgroundFilled &&
          <div>
            <p>
              {translations.distributeLeft}:&nbsp;
              {availablePoints}&nbsp;
              {translations.from}&nbsp;
              {totalPoints}&nbsp;
              {translations.points}&nbsp;

              <OverlayTrigger
                placement="right"
                overlay={
                  <Popover id="distributeBackgroundPopover">
                    <Popover.Content>
                      {translations.distributeBackgroundPopover}
                    </Popover.Content>
                  </Popover>
                }
              >
                <i className="fas fa-question-circle"></i>
              </OverlayTrigger>
            </p>

            <div className="row">
              <div className="col-md-4">
                <label>
                  {translations.origin}
                </label>

                {originArray.map(item => (
                  <div key={item} className="form-check">
                    <input
                      type="radio"
                      id={'inputOrigin' + originArray.indexOf(item)}
                      name="origin"
                      className="form-check-input"
                      value={originArray.indexOf(item)}
                      onChange={this.handleChangeFormCheckbox}
                      checked={distributedOrigin === originArray.indexOf(item)}
                      disabled={originArray.indexOf(item) > maxAvailableOrigin}
                    />
                    <label className="form-check-label" htmlFor={'inputOrigin' + originArray.indexOf(item)}>
                      {originArray.indexOf(item)}&nbsp;
                      ({translations[item]})
                    </label>
                  </div>
                ))}
              </div>

              <div className="col-md-4">
                <label>
                  {translations.property}
                </label>

                {propertyArray.map(item => (
                  <div key={item} className="form-check">
                    <input
                      type="radio"
                      id={'inputProperty' + propertyArray.indexOf(item)}
                      name="property"
                      className="form-check-input"
                      value={propertyArray.indexOf(item)}
                      onChange={this.handleChangeFormCheckbox}
                      checked={distributedProperty === propertyArray.indexOf(item)}
                      disabled={propertyArray.indexOf(item) > maxAvailableProperty}
                    />
                    <label className="form-check-label" htmlFor={'inputProperty' + propertyArray.indexOf(item)}>
                      {propertyArray.indexOf(item)}&nbsp;
                      ({translations[item]})
                    </label>
                  </div>
                ))}
              </div>

              <div className="col-md-4">
                <label>
                  {translations.skills}
                </label>

                {propertyArray.map(item => (
                  <div key={item} className="form-check">
                    <input
                      type="radio"
                      name="skills"
                      id={'inputSkills' + propertyArray.indexOf(item)}
                      className="form-check-input"
                      value={propertyArray.indexOf(item)}
                      onChange={this.handleChangeFormCheckbox}
                      checked={distributedSkills === propertyArray.indexOf(item)}
                      disabled={propertyArray.indexOf(item) > maxAvailableSkills}
                    />
                    <label className="form-check-label" htmlFor={'inputSkills' + propertyArray.indexOf(item)}>
                      {propertyArray.indexOf(item)}&nbsp;
                      (
                      {skillsDistributionTable[propertyArray.indexOf(item)].physical},
                      {skillsDistributionTable[propertyArray.indexOf(item)].psychical},
                      {skillsDistributionTable[propertyArray.indexOf(item)].combined}
                        )
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={rangeLimit ? 'alert alert-info mt-3' : 'alert alert-danger mt-3'} role="alert">
              {rangeLimit &&
                <i className="fas fa-check-circle"></i>
              }
              {!rangeLimit &&
                <i className="fas fa-exclamation-circle"></i>
              }
              {translations.backgroundPanelRangeLimit}
            </div>

          </div>

        }

        <PanelErrata name="backgroundPointsHasNoRangeLimit"/>

        <PanelAutofill screen="screenBackground"/>

      </form>
    );
  }
}

const ScreenBackground = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenBackground);

export default ScreenBackground;
