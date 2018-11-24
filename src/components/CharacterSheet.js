// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import React from "react";
import { Provider, connect } from "react-redux";
import translations from "../translations";

const mapStateToProps = (state) => {
  // console.log(JSON.stringify(state.getIn(['character', 'info']), null, 2))
  return {
    info: state.getIn(['character', 'info']),
    abilities: state.getIn(['character', 'abilities']),
    derivedAbilities: state.getIn(['character', 'derivedAbilities']),
    combatParameters: state.getIn(['character', 'combatParameters']),
  };
};

const ConnectedSheets = ({info, abilities, derivedAbilities, combatParameters}) => (
  <div className="character-sheet panel panel-default">
    <div className="panel-body">
      <h2>
        {info.get('name')}
      </h2>
      <h3>
        {translations[info.get('race')]}
        &nbsp;-&nbsp;
        {translations[info.get('class')]}&nbsp;
        ({info.get('level')}.&nbsp;{translations.levelLow})
      </h3>
      <p>
        {info.get('note')}
      </p>

      <div className="row">

        <div className="col-xs-4">
          <table className="table ability-table">
            <tbody>
              <tr>
                <td>{translations.strength}</td>
                <td>{abilities.get('strength')}</td>
              </tr>
              <tr>
                <td>{translations.dexterity}</td>
                <td>{abilities.get('dexterity')}</td>
              </tr>
              <tr>
                <td>{translations.manualdexterity}</td>
                <td>{abilities.get('manualdexterity')}</td>
              </tr>
              <tr>
                <td>{translations.will}</td>
                <td>{abilities.get('will')}</td>
              </tr>
              <tr>
                <td>{translations.intelligence}</td>
                <td>{abilities.get('intelligence')}</td>
              </tr>
              <tr>
                <td>{translations.charisma}</td>
                <td>{abilities.get('charisma')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-xs-4">
          <table className="table ability-table">
            <tbody>
              <tr>
                <td>{translations.resistance}</td>
                <td>{derivedAbilities.get('resistance')}</td>
              </tr>
              <tr>
                <td>{translations.fortitude}</td>
                <td>{derivedAbilities.get('fortitude')}</td>
              </tr>
              <tr>
                <td>{translations.speed}</td>
                <td>{derivedAbilities.get('speed')}</td>
              </tr>
              <tr>
                <td>{translations.senses}</td>
                <td>{derivedAbilities.get('senses')}</td>
              </tr>
              <tr>
                <td>{translations.beauty}</td>
                <td>{derivedAbilities.get('beauty')}</td>
              </tr>
              <tr>
                <td>{translations.danger}</td>
                <td>{derivedAbilities.get('danger')}</td>
              </tr>
              <tr>
                <td>{translations.dignity}</td>
                <td>{derivedAbilities.get('dignity')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-xs-4">
          <table className="table ability-table">
            <tbody>
              <tr>
                <td>{translations.combatSpeed}</td>
                <td>{combatParameters.get('combatSpeed')}</td>
              </tr>
              <tr>
                <td>{translations.attack}</td>
                <td>{combatParameters.get('attack')}</td>
              </tr>
              <tr>
                <td>{translations.shoot}</td>
                <td>{combatParameters.get('shoot')}</td>
              </tr>
              <tr>
                <td>{translations.defense}</td>
                <td>{combatParameters.get('defense')}</td>
              </tr>
            </tbody>
          </table>
            <table className="table ability-table">
            <tbody>
              <tr>
                <td>{translations.health}</td>
                <td>{combatParameters.get('health')}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  </div>
);

const CharacterSheet = connect(mapStateToProps)(ConnectedSheets);

export default CharacterSheet;
