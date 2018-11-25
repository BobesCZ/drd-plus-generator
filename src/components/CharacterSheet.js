// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import React from "react";
import { Provider, connect } from "react-redux";
import translations from "../translations";
import tables from "../data/tables";

const mapStateToProps = (state) => {
  // console.log(JSON.stringify(state.getIn(['character', 'info']), null, 2))
  return {
    info: state.getIn(['character', 'info']),
    abilities: state.getIn(['character', 'abilities']),
    derivedAbilities: state.getIn(['character', 'derivedAbilities']),
    combatParameters: state.getIn(['character', 'combatParameters']),
  };
};

class ConnectedSheets extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render(props) {
    let healthArray = [];
    let charHealth = this.props.combatParameters.get('health');
    let charRace = this.props.info.get('race');
    let charNote = tables.derivedAbilities[charRace]["note"].length ? tables.derivedAbilities[charRace]["note"] : false;


    for (var i=1; i <= 50; i++) {
      let active = i <= charHealth ? true : false;
      let content = "";

      // Print content to table cell for number 1, number corresponding to character health value and each 5 cells
      if (
        i === 1 ||
        i % 5 === 0 ||
        i === charHealth
      )
      {
        content = i;
      }
      healthArray[i] = {"active": active, "content": content};
    }

    let healthRowArray = [];

    for (var i=0; i < 3; i++) {
      healthRowArray.push("healthRow" + i);
    }

    return (
      <div className="character-sheet panel panel-default">
        <div className="panel-body">
          <h2>
            {this.props.info.get('name')}
          </h2>
          <h3>
            {translations[this.props.info.get('race')]}
            &nbsp;-&nbsp;
            {translations[this.props.info.get('class')]}&nbsp;
            ({this.props.info.get('level')}.&nbsp;{translations.levelLow})
            {charNote &&
              <small>
                &nbsp;+{charNote}
              </small>
            }
          </h3>
          <p>
            {this.props.info.get('note')}
          </p>

          <div className="row">

            <div className="col-xs-4">
              <table className="table ability-table">
                <tbody>
                  <tr>
                    <td>{translations.strength}</td>
                    <td>{this.props.abilities.get('strength')}</td>
                  </tr>
                  <tr>
                    <td>{translations.dexterity}</td>
                    <td>{this.props.abilities.get('dexterity')}</td>
                  </tr>
                  <tr>
                    <td>{translations.manualdexterity}</td>
                    <td>{this.props.abilities.get('manualdexterity')}</td>
                  </tr>
                  <tr>
                    <td>{translations.will}</td>
                    <td>{this.props.abilities.get('will')}</td>
                  </tr>
                  <tr>
                    <td>{translations.intelligence}</td>
                    <td>{this.props.abilities.get('intelligence')}</td>
                  </tr>
                  <tr>
                    <td>{translations.charisma}</td>
                    <td>{this.props.abilities.get('charisma')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-xs-4">
              <table className="table ability-table">
                <tbody>
                  <tr>
                    <td>{translations.resistance}</td>
                    <td>{this.props.derivedAbilities.get('resistance')}</td>
                  </tr>
                  <tr>
                    <td>{translations.fortitude}</td>
                    <td>{this.props.derivedAbilities.get('fortitude')}</td>
                  </tr>
                  <tr>
                    <td>{translations.speed}</td>
                    <td>{this.props.derivedAbilities.get('speed')}</td>
                  </tr>
                  <tr>
                    <td>{translations.senses}</td>
                    <td>{this.props.derivedAbilities.get('senses')}</td>
                  </tr>
                  <tr>
                    <td>{translations.beauty}</td>
                    <td>{this.props.derivedAbilities.get('beauty')}</td>
                  </tr>
                  <tr>
                    <td>{translations.danger}</td>
                    <td>{this.props.derivedAbilities.get('danger')}</td>
                  </tr>
                  <tr>
                    <td>{translations.dignity}</td>
                    <td>{this.props.derivedAbilities.get('dignity')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-xs-4">
              <table className="table ability-table">
                <tbody>
                  <tr>
                    <td>{translations.combatSpeed}</td>
                    <td>{this.props.combatParameters.get('combatSpeed')}</td>
                  </tr>
                  <tr>
                    <td>{translations.attack}</td>
                    <td>{this.props.combatParameters.get('attack')}</td>
                  </tr>
                  <tr>
                    <td>{translations.shoot}</td>
                    <td>{this.props.combatParameters.get('shoot')}</td>
                  </tr>
                  <tr>
                    <td>{translations.defense}</td>
                    <td>{this.props.combatParameters.get('defense')}</td>
                  </tr>
                </tbody>
              </table>
                <table className="table ability-table">
                <tbody>
                  <tr>
                    <td>{translations.health}</td>
                    <td>{this.props.combatParameters.get('health')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <div className="row">

            <div className="col-xs-12">
              <table className="table health-table">
                <tbody>
                  <tr>
                    {Object.keys(healthArray).map(item =>
                      <th key={item}>
                        {healthArray[item]['content']}
                      </th>
                    )}
                  </tr>

                  {Object.keys(healthRowArray).map(item =>
                    <tr key={item}>
                      {Object.keys(healthArray).map(item =>
                        <td key={item} className={healthArray[item]['active'] ? '' : 'inactive'}></td>
                      )}
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

const CharacterSheet = connect(mapStateToProps)(ConnectedSheets);

export default CharacterSheet;
