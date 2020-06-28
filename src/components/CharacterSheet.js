import React from 'react';
import { connect } from 'react-redux';
import getArmorMissingStrength from '../calculations/getArmorMissingStrength';
import tables from '../data/tables';
import getRomanizedNumber from '../helpers/getRomanizedNumber';
import getStringifiedNumber from '../helpers/getStringifiedNumber';
import isTextInputFilled from '../helpers/isTextInputFilled';
import translations from '../translations';
import DebugBox from './DebugBox';

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    abilities: state.getIn(['character', 'abilities']),
    derivedAbilities: state.getIn(['character', 'derivedAbilities']),
    combatParameters: state.getIn(['character', 'combatParameters']),
    skills: state.getIn(['character', 'skills', 'distributed']),
    weapons: state.getIn(['character', 'weapons']),
    armors: state.getIn(['character', 'armors']),
  };
};

class ConnectedSheets extends React.Component {
  render () {
    const healthArray = [];
    const charHealth = this.props.combatParameters.get('health');
    const charRace = this.props.info.get('race');
    const charStrength = this.props.abilities.get('strength');
    const charNote = tables.derivedAbilities[charRace].note.length ? tables.derivedAbilities[charRace].note : false;
    const skills = this.props.skills;
    const weapons = this.props.weapons;
    const armors = this.props.armors;

    for (let i = 1; i <= 50; i++) {
      const active = i <= charHealth;
      let content = '';

      // Print content to table cell for number 1, number corresponding to character health value and each 5 cells
      if (
        i === 1 ||
        i % 5 === 0 ||
        i === charHealth
      ) {
        content = i;
      }
      healthArray[i] = { active: active, content: content };
    }

    const healthRowArray = [];

    for (let i = 0; i < 3; i++) {
      healthRowArray.push('healthRow' + i);
    }

    const skillsArray = [];

    skills.keySeq().forEach((key) => {
      skills.get(key).keySeq().forEach((skillName) => {
        const value = skills.getIn([key, skillName]);

        if (value > 0) {
          skillsArray[skillName] = {};
          skillsArray[skillName].value = value;
          skillsArray[skillName].skillType = key;
        }
      });
    });

    // Split skillsArray in half and create 2 arrays
    const skillsArrayColumns = [];
    skillsArrayColumns[0] = [];

    if (Object.keys(skillsArray).length > 5) {
      skillsArrayColumns[1] = [];

      Object.keys(skillsArray).forEach((skillName, i) => {
        if (i <= Math.ceil((Object.keys(skillsArray).length / 2) - 1)) {
          skillsArrayColumns[0][skillName] = skillsArray[skillName];
        }
        else {
          skillsArrayColumns[1][skillName] = skillsArray[skillName];
        }
      });
    }
    else {
      skillsArrayColumns[0] = skillsArray;
    }

    const weaponsArray = [];
    weapons.keySeq().forEach((weaponName) => {
      weapons.get(weaponName).forEach((weaponObject) => {
        weaponsArray.push(weaponObject);
      });
    });

    const armorsArray = [];

    armors.keySeq().forEach((armorType) => {
      let armorObject = armors.get(armorType);

      if (isTextInputFilled(armorObject.get('armorName'))) {
        const armorMissingStrength = getArmorMissingStrength(armorObject.get('necessaryStrength'), charStrength, charRace);
        armorObject = armorObject.set('missingStrength', armorMissingStrength);
        armorsArray.push(armorObject);
      }
    });

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

            <div className="col-sm-4">
              <table className="table ability-table">
                <tbody>
                  <tr>
                    <td>{translations.strength}</td>
                    <td>
                      <DebugBox id="strength"/>
                      {this.props.abilities.get('strength')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.dexterity}</td>
                    <td>
                      <DebugBox id="dexterity" />
                      {this.props.abilities.get('dexterity')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.manualdexterity}</td>
                    <td>
                      <DebugBox id="manualdexterity" />
                      {this.props.abilities.get('manualdexterity')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.will}</td>
                    <td>
                      <DebugBox id="will" />
                      {this.props.abilities.get('will')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.intelligence}</td>
                    <td>
                      <DebugBox id="intelligence" />
                      {this.props.abilities.get('intelligence')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.charisma}</td>
                    <td>
                      <DebugBox id="charisma" />
                      {this.props.abilities.get('charisma')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-sm-4">
              <table className="table ability-table">
                <tbody>
                  <tr>
                    <td>{translations.resistance}</td>
                    <td>
                      <DebugBox id="resistance" />
                      {this.props.derivedAbilities.get('resistance')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.fortitude}</td>
                    <td>
                      <DebugBox id="fortitude" />
                      {this.props.derivedAbilities.get('fortitude')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.speed}</td>
                    <td>
                      <DebugBox id="speed" />
                      {this.props.derivedAbilities.get('speed')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.senses}</td>
                    <td>
                      <DebugBox id="senses" />
                      {this.props.derivedAbilities.get('senses')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.beauty}</td>
                    <td>
                      <DebugBox id="beauty" />
                      {this.props.derivedAbilities.get('beauty')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.danger}</td>
                    <td>
                      <DebugBox id="danger" />
                      {this.props.derivedAbilities.get('danger')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.dignity}</td>
                    <td>
                      <DebugBox id="dignity" />
                      {this.props.derivedAbilities.get('dignity')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-sm-4">
              <table className="table ability-table">
                <tbody>
                  <tr>
                    <td>{translations.combatSpeed}</td>
                    <td>
                      <DebugBox id="combatSpeed" />
                      {this.props.combatParameters.get('combatSpeed')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.attack}</td>
                    <td>
                      <DebugBox id="attack" />
                      {this.props.combatParameters.get('attack')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.shoot}</td>
                    <td>
                      <DebugBox id="shoot" />
                      {this.props.combatParameters.get('shoot')}
                    </td>
                  </tr>
                  <tr>
                    <td>{translations.defense}</td>
                    <td>
                      <DebugBox id="defense" />
                      {this.props.combatParameters.get('defense')}
                    </td>
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

            <div className="col-12">
              <table className="table health-table">
                <tbody>
                  <tr>
                    {Object.keys(healthArray).map(item =>
                      <th key={item}>
                        {healthArray[item].content}
                      </th>,
                    )}
                  </tr>

                  {Object.keys(healthRowArray).map(item =>
                    <tr key={item}>
                      {Object.keys(healthArray).map(item =>
                        <td key={item} className={healthArray[item].active ? '' : 'inactive'}></td>,
                      )}
                    </tr>,
                  )}

                </tbody>
              </table>
            </div>

          </div>

          {Object.keys(skillsArrayColumns).length > 0 &&
            <div className="row">

              {Object.keys(skillsArrayColumns).map(column =>
                <div key={column} className="col-sm-6">
                  <table className="table skill-table">
                    <tbody>
                      {Object.keys(skillsArrayColumns[column]).map(item =>
                        <tr key={item}>
                          <td>
                            {translations[item]}
                            &nbsp;({skillsArrayColumns[column][item].skillType === 'psychical' ? 'P' : skillsArrayColumns[column][item].skillType === 'combined' ? 'K' : 'F'})
                          </td>
                          <td>
                            {getRomanizedNumber(skillsArrayColumns[column][item].value) + '.'}
                          </td>
                        </tr>,
                      )}

                    </tbody>
                  </table>
                </div>,
              )}

            </div>
          }

          {weaponsArray.length > 0 &&
            <div className="row">
              <div className="col-12">
                <table className="table weapon-table weapon-table-sheet">
                  <tbody>
                    <tr>
                      <th>{translations.weapon}</th>
                      <th>{translations.hold}</th>
                      <th>{translations.combatSpeedNumber}</th>
                      <th>{translations.attackNumber}</th>
                      <th>{translations.damageNumber}</th>
                      <th>{translations.defenseNumber}</th>
                      <th>{translations.cover}</th>
                    </tr>

                    {Object.keys(weaponsArray).map(key =>
                      <tr key={key}>
                        <td>
                          {translations[weaponsArray[key].get('weaponName')]}
                        </td>
                        <td>
                          {translations[weaponsArray[key].get('hold') + 'Abbr']}
                        </td>
                        <td>
                          <DebugBox id={weaponsArray[key].get('weaponName') + '_' + weaponsArray[key].get('hold') + '_combatSpeedNumber'} />
                          {weaponsArray[key].get('combatSpeedNumber')}
                        </td>
                        <td>
                          <DebugBox id={weaponsArray[key].get('weaponName') + '_' + weaponsArray[key].get('hold') + '_attackNumber'} />
                          {weaponsArray[key].get('attackNumber')}
                        </td>
                        <td>
                          <DebugBox id={weaponsArray[key].get('weaponName') + '_' + weaponsArray[key].get('hold') + '_damageNumber'} />
                          {getStringifiedNumber(weaponsArray[key].get('damageNumber'))}
                        </td>
                        <td>
                          <DebugBox id={weaponsArray[key].get('weaponName') + '_' + weaponsArray[key].get('hold') + '_defenseNumber'} />
                          {weaponsArray[key].get('defenseNumber')}
                        </td>
                        <td>
                          <DebugBox id={weaponsArray[key].get('weaponName') + '_' + weaponsArray[key].get('hold') + '_cover'} />
                          {weaponsArray[key].get('cover')}
                        </td>
                      </tr>,
                    )}

                  </tbody>
                </table>
              </div>
            </div>
          }

          {armorsArray.length > 0 &&
            <div className="row">

              <div className="col-12">
                <table className="table armor-table">
                  <tbody>
                    <tr>
                      <th>{translations.armor}</th>
                      <th>{translations.armorHeightType}</th>
                      <th>{translations.limitation}</th>
                      <th>{translations.protection}</th>
                    </tr>

                    {Object.keys(armorsArray).map(key =>
                      <tr key={key}>
                        <td>
                          {translations[armorsArray[key].get('armorName')]}
                        </td>
                        <td>
                          {armorsArray[key].get('missingStrength')}
                        </td>
                        <td>
                          {armorsArray[key].get('limitation')}
                        </td>
                        <td>
                          {armorsArray[key].get('protection')}
                        </td>
                      </tr>,
                    )}

                  </tbody>
                </table>
              </div>

            </div>
          }

        </div>
      </div>
    );
  }
}

const CharacterSheet = connect(mapStateToProps)(ConnectedSheets);

export default CharacterSheet;
