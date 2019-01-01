import React from "react";
import { connect } from "react-redux";
// import changeSkill from "../actionPackages/changeSkill";
import getStringifiedNumber from "../helpers/getStringifiedNumber";
import translations from "../translations";
import tables from "../data/tables";

const mapStateToProps = (state) => {
  return {
    abilities: state.getIn(['character', 'abilities']),
  };
};

class ConnectedWeaponRow extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    const target = event.target;
    const value = target.value;
    const weaponName = target.name;
    // changeSkill(weaponName, skillType, value)
  }

  render(props) {
    let weaponName = this.props.weaponName
    let weaponType = this.props.weaponType
    let weapons = tables.weapons;
    let charStrength = this.props.abilities.get('strength')

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
              className={true ? 'btn btn-success' : 'btn btn-success'}
              name={weaponName}
              data-type={weaponType}
              onClick={this.handleButtonClick}
              value={true ? 0 : 1}
              >
              <i className="fas fa-plus m-0"></i>
            </button>
        </td>
      </tr>
    )

  }
}

const WeaponRow = connect(mapStateToProps)(ConnectedWeaponRow);

export default WeaponRow;
