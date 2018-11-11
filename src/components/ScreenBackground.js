import React from "react";
import { connect } from "react-redux";
import store from "../store/index";
import changeInfo from "../actions/changeInfo";
import setBackground from "../actions/setBackground";
import distributeBackground from "../actions/distributeBackground";
import sumCollectionValues from "../helpers/sumCollectionValues";
import translations from "../translations";
import tables from "../data/tables";

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
    // this.props.resolveScreen({ active: "screenCharacter"});
  }

  render(props) {
    let name = this.props.background.get('name');
    let backgroundFilled = name.length ? true : false;
    let totalPoints = this.props.background.get('total');
    let distributed = this.props.background.get('distributed');
    let leftPoints = parseInt( totalPoints - sumCollectionValues(distributed) );

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
              {leftPoints}&nbsp;
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
                        checked={this.props.background.getIn(['distributed', "origin"]) === originArray.indexOf(item) ? true : false}
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
                        checked={this.props.background.getIn(['distributed', "property"]) === propertyArray.indexOf(item) ? true : false}
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
                        checked={this.props.background.getIn(['distributed', "skills"]) === propertyArray.indexOf(item) ? true : false}
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

          </div>

        }
      </form>
    )

  }
}

const ScreenBackground = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenBackground);

export default ScreenBackground;
