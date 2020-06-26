import React from 'react';
import { connect } from 'react-redux';
import changeWeapon from '../actionPackages/changeWeapon';
import getWeaponNumbers from '../calculations/getWeaponNumbers';
import tables from '../data/tables';
import getShieldNameFromWeaponsObject from '../helpers/getShieldNameFromWeaponsObject';
import getStringifiedNumber from '../helpers/getStringifiedNumber';
import translations from '../translations';

const mapStateToProps = (state) => {
  return {
    combatParameters: state.getIn(['character', 'combatParameters']),
    abilities: state.getIn(['character', 'abilities']),
    skills: state.getIn(['character', 'skills']),
    weapons: state.getIn(['character', 'weapons']),
    switchers: state.get('switchers'),
  };
};

class ConnectedWeaponRow extends React.Component {
  constructor (props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick (event) {
    let target = event.target;

    // Target can be span with icon inside button
    if (target.nodeName !== 'BUTTON') {
      target = target.closest('button');
    }

    const value = target.value;
    const weaponName = target.name;
    const weaponType = target.getAttribute('data-type');

    if (weaponType === 'shields' && value === 'ADD') {
      // Only 1 shield is allowed - if new shield is added, remove old shield
      const oldShieldName = getShieldNameFromWeaponsObject(this.props.weapons);
      if (oldShieldName) {
        changeWeapon(oldShieldName, weaponType, 'REMOVE');
      }
    }

    changeWeapon(weaponName, weaponType, value);
  }

  render () {
    const weaponName = this.props.weaponName;
    const weaponType = this.props.weaponType;
    const weapons = tables.weapons;
    const charStrength = this.props.abilities.get('strength');
    const skills = this.props.skills.getIn(['distributed', 'combat']);
    const combatParameters = this.props.combatParameters;
    const weaponStateObject = this.props.weapons;
    const weaponExists = weaponStateObject.has(weaponName);
    const showCharNumbersInWeaponTable = this.props.switchers.get('showCharNumbersInWeaponTable');

    const columns = [];

    if (showCharNumbersInWeaponTable) {
      let skillDegree = skills.get(weaponType);

      if (weaponType === 'shields') {
        skillDegree = skills.get('usingShield');
      }

      const combatSpeed = combatParameters.get('combatSpeed');
      const attack = combatParameters.get('attack');
      const defense = combatParameters.get('defense');

      const weaponObject = getWeaponNumbers(weaponName, weaponType, false, skillDegree, combatSpeed, attack, defense, charStrength);

      columns.push(weaponObject.get('combatSpeedNumber'));
      columns.push(weaponObject.get('attackNumber'));
      columns.push(getStringifiedNumber(weaponObject.get('damageNumber')));
      columns.push(weaponObject.get('defenseNumber'));
      columns.push(weaponObject.get('cover'));
    }
    else {
      columns.push(getStringifiedNumber(weapons[weaponType][weaponName].necessaryStrength));
      columns.push(weapons[weaponType][weaponName].length);
      columns.push(weapons[weaponType][weaponName].weaponAttack);
      columns.push(getStringifiedNumber(weapons[weaponType][weaponName].weaponDamage));
      columns.push(weapons[weaponType][weaponName].weaponCover);
    }

    return (
      <tr className={weapons[weaponType][weaponName].necessaryStrength > charStrength ? 'text-black-50' : ''}>
        <td>{translations[weaponName]}</td>
        <td>{columns[0]}</td>
        <td>{columns[1]}</td>
        <td>{columns[2]}</td>
        <td>{columns[3]}</td>
        <td>{columns[4]}</td>
        <td>
          <button
            type="button"
            className={weaponExists ? 'btn btn-danger' : 'btn btn-success'}
            name={weaponName}
            data-type={weaponType}
            onClick={this.handleButtonClick}
            value={weaponExists ? 'REMOVE' : 'ADD'}
          >
            <i className={weaponExists ? 'fas fa-minus m-0' : 'fas fa-plus m-0'}></i>
          </button>
        </td>
      </tr>
    );
  }
}

const WeaponRow = connect(mapStateToProps)(ConnectedWeaponRow);

export default WeaponRow;
