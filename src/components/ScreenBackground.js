import React from "react";
import { connect } from "react-redux";
import store from "../store/index";
import changeInfo from "../actions/changeInfo";
import setBackground from "../actions/setBackground";
import distributeBackground from "../actions/distributeBackground";
import resolveBackground from "../actions/resolveBackground";
import resolveScreen from "../actions/resolveScreen";
import PanelErrata from "./PanelErrata";
import sumCollectionValues from "../helpers/sumCollectionValues";
import translations from "../translations";
import tables from "../data/tables";

const mapDispatchToProps = dispatch => {
  return {
    setBackground: item => dispatch(setBackground(item)),
    distributeBackground: item => dispatch(distributeBackground(item)),
    resolveBackground: item => dispatch(resolveBackground(item)),
    resolveScreen: item => dispatch(resolveScreen(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    background: state.getIn(['character', 'background']),
  };
};

class ConnectedScreenBackground extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
    this.handleChangeFormCheckbox = this.handleChangeFormCheckbox.bind(this);
  }

  handleChangeFormInput(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log({ key: name, value: value});
    this.props.setBackground({ "name": value});
  }

  handleChangeFormCheckbox(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log({ key: name, value: value});
    this.props.distributeBackground({ key: name, value: value});
    this.props.resolveBackground({});
    this.props.resolveScreen({ active: "screenBackground"});
  }

  render(props) {
    let name = this.props.background.get('name');
    let backgroundFilled = name.length ? true : false;
    let totalPoints = this.props.background.get('total');
    let distributedArray = this.props.background.get('distributed');
    let distributedOrigin = distributedArray.get('origin');
    let distributedProperty = distributedArray.get('property');
    let distributedSkills = distributedArray.get('skills');
    let availablePoints = parseInt( totalPoints - sumCollectionValues(distributedArray) );

    let rangeLimit = this.props.background.get('rangeLimit');
    // If there are no distributed points, act like rangeLimit is OK
    rangeLimit = (availablePoints == totalPoints) ? true : rangeLimit;

    let maxAvailableOrigin = 0;
    if (distributedOrigin) {
      maxAvailableOrigin = parseInt( distributedOrigin + availablePoints );
    }
    else {
      maxAvailableOrigin = availablePoints
    }

    let maxAvailableProperty = 0;
    if (distributedProperty) {
      maxAvailableProperty = parseInt( distributedProperty + availablePoints );
    }
    else {
      maxAvailableProperty = availablePoints
    }

    let maxAvailableSkills = 0;
    if (distributedSkills) {
      maxAvailableSkills = parseInt( distributedSkills + availablePoints );
    }
    else {
      maxAvailableSkills = availablePoints
    }

    let originArray = [];
    let propertyArray = [];

    for (var i=0; i < 9; i++) {
      originArray.push("origin" + i);
      propertyArray.push("property" + i);
    }

    let charClass = this.props.info.get("class");
    let abilityDistributionTable = tables.abilityDistribution[charClass];

    return (
      <form>

        <div className="panel panel-info">
          <div className="panel-heading">
            {translations.backgroundPanelHeader}
          </div>
          <div className="panel-body bg-info">
            {translations.backgroundPanelBody}

            <ul>
              <li>{translations.backgroundPanelLi1}</li>
              <li>{translations.backgroundPanelLi2}</li>
              <li>{translations.backgroundPanelLi3}</li>
            </ul>

            <table className="table">
              <tbody>
                <tr>
                  <th>{translations.backgroundPanelTableTh1}</th>
                  <th className="text-center">{translations.backgroundPanelTableTh2}</th>
                  <th className="text-center">{translations.backgroundPanelTableTh3}</th>
                  <th className="text-center">{translations.backgroundPanelTableTh4}</th>
                </tr>
                <tr>
                  <td>{translations.goodAbility}</td>
                  <td className="text-center">3</td>
                  <td className="text-center">6</td>
                  <td className="text-center">5</td>
                </tr>
                <tr>
                  <td>{translations.combinationBackground}</td>
                  <td className="text-center">2</td>
                  <td className="text-center">4</td>
                  <td className="text-center">10</td>
                </tr>
                <tr>
                  <td>{translations.goodBackground}</td>
                  <td className="text-center">1</td>
                  <td className="text-center">2</td>
                  <td className="text-center">15</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        <div className="form-group">
          <label htmlFor="">
            {translations.backgroundHeader}&nbsp;
            <span className="glyphicon glyphicon-question-sign" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-content={translations.backgroundHeaderPopover}></span>
          </label>
          <select className="form-control" name="background" value={name} onChange={this.handleChangeFormInput}>
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
              <span className="glyphicon glyphicon-question-sign" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-content={translations.distributeBackgroundPopover}></span>
            </p>

            <div className="row">
              <div className="col-md-4">
                <label>
                  {translations.origin}
                </label>

                {originArray.map(item => (
                  <div key={item} className="radio">
                    <label>
                      <input
                        type="radio"
                        name="origin"
                        value={originArray.indexOf(item)}
                        onChange={this.handleChangeFormCheckbox}
                        checked={distributedOrigin === originArray.indexOf(item) ? true : false}
                        disabled={originArray.indexOf(item) > maxAvailableOrigin ? true : false}
                      />
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
                  <div key={item} className="radio">
                    <label>
                      <input
                        type="radio"
                        name="property"
                        value={propertyArray.indexOf(item)}
                        onChange={this.handleChangeFormCheckbox}
                        checked={distributedProperty === propertyArray.indexOf(item) ? true : false}
                        disabled={propertyArray.indexOf(item) > maxAvailableProperty ? true : false}
                      />
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
                  <div key={item} className="radio">
                    <label>
                      <input
                        type="radio"
                        name="skills"
                        value={propertyArray.indexOf(item)}
                        onChange={this.handleChangeFormCheckbox}
                        checked={distributedSkills === propertyArray.indexOf(item) ? true : false}
                        disabled={propertyArray.indexOf(item) > maxAvailableSkills ? true : false}
                      />
                      {propertyArray.indexOf(item)}&nbsp;
                      (
                        {abilityDistributionTable[propertyArray.indexOf(item)]["FYZ"]},
                        {abilityDistributionTable[propertyArray.indexOf(item)]["PSY"]},
                        {abilityDistributionTable[propertyArray.indexOf(item)]["KOM"]}
                        )
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={rangeLimit ? 'alert alert-info' : 'alert alert-danger'} role="alert">
              {rangeLimit &&
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              }
              {!rangeLimit &&
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              }
              {translations.backgroundPanelRangeLimit}
            </div>

          </div>

        }

        <PanelErrata name="backgroundPointsHasNoRangeLimit"/>

        <div className="panel panel-success">
          <div className="panel-heading">
            {translations.autoFillHeader}
          </div>
          <div className="panel-body bg-success">
            {translations.autoFillBackground}
          </div>
        </div>

      </form>
    )

  }
}

const ScreenBackground = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenBackground);

export default ScreenBackground;
