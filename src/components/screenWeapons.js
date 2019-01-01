import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import WeaponRow from "./WeaponRow";
import getRomanizedNumber from "../helpers/getRomanizedNumber";
// import PanelAutofill from "./PanelAutofill";
import Navbar  from 'react-bootstrap/lib/Navbar';
import tables from "../data/tables";

const mapDispatchToProps = dispatch => {
  return {
    // setBackground: item => dispatch(setBackground(item)),
    // distributeBackground: item => dispatch(distributeBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    skills: state.getIn(['character', 'skills']),
  };
};

class ConnectedScreenWeapons extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    // this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  render(props) {
    let skills = this.props.skills.getIn(['distributed', 'combat'])
    let weapons = tables.weapons;

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
          </div>
        </div>

        {Object.keys(weapons).map(key => (
          <div key={key} className="card card--collapse bg-light mb-2">
            <Navbar expand="true">
              <div className="card-header">
                {translations[key]}&nbsp;
                {skills.get(key) > 0 &&
                  <span>
                    ({getRomanizedNumber(skills.get(key)) + "."})
                  </span>
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
                      <th>{translations.necessaryStrength}</th>
                      <th>{translations.length}</th>
                      <th>{translations.weaponAttack}</th>
                      <th>{translations.weaponDamage}</th>
                      <th>{translations.cover}</th>
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
