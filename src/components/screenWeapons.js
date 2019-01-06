import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import WeaponRow from "./WeaponRow";
import getRomanizedNumber from "../helpers/getRomanizedNumber";
import setSwitcher from "../actions/setSwitcher";
import Navbar  from 'react-bootstrap/lib/Navbar';
import tables from "../data/tables";

const mapDispatchToProps = dispatch => {
  return {
    setSwitcher: item => dispatch(setSwitcher(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    skills: state.getIn(['character', 'skills']),
    weapons: state.getIn(['character', 'weapons']),
    switchers: state.get('switchers'),
  };
};

class ConnectedScreenWeapons extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.setSwitcher({ key: name, value: value});
  }

  render(props) {
    let skills = this.props.skills.getIn(['distributed', 'combat'])
    let weapons = tables.weapons;
    let weaponStateObject = this.props.weapons;
    let categoryHasWeaponInState = []
    let showCharNumbersInWeaponTable = this.props.switchers.get('showCharNumbersInWeaponTable');

    Object.keys(weapons).forEach((key) => {
      categoryHasWeaponInState[key] = false

      for (var weaponName in weapons[key]) {
        if (weaponStateObject.has(weaponName)) {
          categoryHasWeaponInState[key] = true
        }
      }
    })

    let columns = []

    if (showCharNumbersInWeaponTable) {
      columns.push( translations.combatSpeedNumber )
      columns.push( translations.attackNumber )
      columns.push( translations.damageNumber )
      columns.push( translations.defenseNumber )
      columns.push( translations.cover )
    }
    else {
      columns.push( translations.necessaryStrength )
      columns.push( translations.length )
      columns.push( translations.weaponAttack )
      columns.push( translations.weaponDamage )
      columns.push( translations.cover )
    }

    return (
      <form>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.weaponPanelHeader}
          </div>
          <div className="card-body">
            <ul>
              <li>{translations.weaponPanelLi1}</li>
              <li>{translations.weaponPanelLi2}</li>
            </ul>

            <label className="switch-light">
              <input
                type="checkbox"
                name="showCharNumbersInWeaponTable"
                checked={showCharNumbersInWeaponTable}
                onChange={this.handleChangeFormInput}
              />

              <span className="switch-light__inner">
                <span className="switch-light__false">
                  {translations.showCharNumbersInWeaponTableFalse}
                </span>

                <span className="switch-light__true">
                  {translations.showCharNumbersInWeaponTableTrue}
                </span>

                <a className="btn btn-info"></a>
              </span>

            </label>

          </div>
        </div>

        {Object.keys(weapons).map(key => (
          <div key={key} className="card card--collapse bg-light mb-2">
            <Navbar expand="true">
              <div className={categoryHasWeaponInState[key] ? "card-header alert-info" : "card-header"}>
                {skills.get(key) == 0 &&
                  <span>
                    {translations[key]}&nbsp;
                  </span>
                }
                {skills.get(key) > 0 &&
                  <strong>
                    {translations[key]}&nbsp;
                    ({getRomanizedNumber(skills.get(key)) + "."})
                  </strong>
                }
              </div>

              <Navbar.Toggle
                aria-controls={'weapons' + key}
                children={
                  <i className="fas fa-chevron-circle-down"></i>
                }
              />

              <Navbar.Collapse id={'weapons' + key}>

              <div className="card-body">
                <table className="table weapon-table">
                  <tbody>
                    <tr>
                      <th>{translations.weapon}</th>
                      <th>{columns[0]}</th>
                      <th>{columns[1]}</th>
                      <th>{columns[2]}</th>
                      <th>{columns[3]}</th>
                      <th>{columns[4]}</th>
                      <th></th>
                    </tr>

                    {Object.keys(weapons[key]).map(weaponName => (

                      <WeaponRow key={weaponName} weaponName={weaponName} weaponType={key} />

                    ))}

                  </tbody>
                </table>
              </div>

              </Navbar.Collapse>
            </Navbar>
          </div>
        ))}

      </form>
    )

  }
}

const ScreenWeapons = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenWeapons);

export default ScreenWeapons;
