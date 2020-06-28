import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import setSwitcher from '../actions/setSwitcher';
import tables from '../data/tables';
import getRomanizedNumber from '../helpers/getRomanizedNumber';
import translations from '../translations';
import PanelAutofill from './PanelAutofill';
import WeaponRow from './WeaponRow';

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
  constructor (props) {
    super(props);
    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.setSwitcher({ key: name, value: value });
  }

  render () {
    let skills = this.props.skills.getIn(['distributed', 'combat']);
    const weapons = tables.weapons;
    const weaponStateObject = this.props.weapons;
    const categoryHasWeaponInState = [];
    const showCharNumbersInWeaponTable = this.props.switchers.get('showCharNumbersInWeaponTable');

    // Change key "usingShield" to "shields"
    skills = skills.mapKeys(key => {
      if (key === 'usingShield') {
        return 'shields';
      }
      return key;
    });

    Object.keys(weapons).forEach((key) => {
      categoryHasWeaponInState[key] = false;

      for (const weaponName in weapons[key]) {
        if (weaponStateObject.has(weaponName)) {
          categoryHasWeaponInState[key] = true;
        }
      }
    });

    const columns = [];

    if (showCharNumbersInWeaponTable) {
      columns.push(translations.combatSpeedNumber);
      columns.push(translations.attackNumber);
      columns.push(translations.damageNumber);
      columns.push(translations.defenseNumber);
      columns.push(translations.cover);
    }
    else {
      columns.push(translations.necessaryStrength);
      columns.push(translations.length);
      columns.push(translations.weaponAttackAbbr);
      columns.push(translations.weaponDamage);
      columns.push(translations.cover);
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

            <label className="switch-light mb-0">
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
              <div className={categoryHasWeaponInState[key] ? 'card-header alert-info' : 'card-header'}>
                {skills.get(key) === 0 &&
                  <span>
                    {translations[key]}&nbsp;
                  </span>
                }
                {skills.get(key) > 0 &&
                  <strong>
                    {translations[key]}&nbsp;
                    ({getRomanizedNumber(skills.get(key)) + '.'})
                  </strong>
                }
              </div>

              <Navbar.Toggle aria-controls={'weapons' + key}>
                <i className="fas fa-chevron-circle-down"></i>
              </Navbar.Toggle>

              <Navbar.Collapse id={'weapons' + key}>
                <div className="card-body">
                  <table className="table weapon-table mb-0">
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

        <PanelAutofill screen="screenWeapons"/>

      </form>
    );
  }
}

const ScreenWeapons = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenWeapons);

export default ScreenWeapons;
