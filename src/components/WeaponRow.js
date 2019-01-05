import React from "react";
import { connect } from "react-redux";
import changeWeapon from "../actionPackages/changeWeapon";
import getStringifiedNumber from "../helpers/getStringifiedNumber";
import translations from "../translations";
import tables from "../data/tables";

const mapStateToProps = (state) => {
  return {
    abilities: state.getIn(['character', 'abilities']),
    weapons: state.getIn(['character', 'weapons']),
  };
};

class ConnectedWeaponRow extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    let target = event.target;

     // Target can be span with icon inside button
    if (target.nodeName !== "BUTTON") {
      target = target.closest('button')
    }

    const value = target.value;
    const weaponName = target.name;
    const weaponType = target.getAttribute('data-type');
    changeWeapon(weaponName, weaponType, value)
  }

  render(props) {
    let weaponName = this.props.weaponName
    let weaponType = this.props.weaponType
    let weapons = tables.weapons;
    let charStrength = this.props.abilities.get('strength')
    let weaponStateObject = this.props.weapons
    let weaponExists = weaponStateObject.has(weaponName)

    return (
      <tr className={weapons[weaponType][weaponName]["necessaryStrength"] > charStrength ? 'text-black-50' : ''}>
        <td>{translations[weaponName]}</td>
        <td>{getStringifiedNumber(weapons[weaponType][weaponName]["necessaryStrength"])}</td>
        <td>{weapons[weaponType][weaponName]["length"]}</td>
        <td>{weapons[weaponType][weaponName]["weaponAttack"]}</td>
        <td>{getStringifiedNumber(weapons[weaponType][weaponName]["weaponDamage"])}</td>
        <td>{weapons[weaponType][weaponName]["weaponCover"]}</td>
        <td>
          <button
              type="button"
              className={weaponExists ? 'btn btn-danger' : 'btn btn-success'}
              name={weaponName}
              data-type={weaponType}
              onClick={this.handleButtonClick}
              value={weaponExists ? "REMOVE" : "ADD"}
              >
              <i className={weaponExists ? 'fas fa-minus m-0' : 'fas fa-plus m-0'}></i>
            </button>
        </td>
      </tr>
    )

  }
}

const WeaponRow = connect(mapStateToProps)(ConnectedWeaponRow);

export default WeaponRow;
