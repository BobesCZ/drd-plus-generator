import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import tables from '../data/tables';
import translations from '../translations';
import ArmorRow from './ArmorRow';
import PanelAutofill from './PanelAutofill';

const mapStateToProps = (state) => {
  return {
    skills: state.getIn(['character', 'skills']),
    armors: state.getIn(['character', 'armors']),
  };
};

class ConnectedScreenArmors extends React.Component {
  render () {
    const armors = tables.armors;
    const armorStateObject = this.props.armors;
    const categoryHasArmorInState = [];

    Object.keys(armors).forEach((key) => {
      categoryHasArmorInState[key] = false;

      for (const armorName in armors[key]) {
        if (armorStateObject.getIn([key, 'armorName']) === armorName) {
          categoryHasArmorInState[key] = true;
        }
      }
    });

    return (
      <form>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.armorPanelHeader}
          </div>
          <div className="card-body">
            <ul className="mb-0">
              <li>{translations.armorPanelLi1}</li>
              <li>{translations.armorPanelLi2}</li>
            </ul>
          </div>
        </div>

        {Object.keys(armors).map(key => (
          <div key={key} className="card card--collapse bg-light mb-2">
            <Navbar expand="true">
              <div className={categoryHasArmorInState[key] ? 'card-header alert-info' : 'card-header'}>
                <span>
                  {translations[key]}&nbsp;
                </span>
              </div>

              <Navbar.Toggle aria-controls={'armors' + key}>
                <i className="fas fa-chevron-circle-down"></i>
              </Navbar.Toggle>

              <Navbar.Collapse id={'armors' + key}>
                <div className="card-body">
                  <table className="table weapon-table mb-0">
                    <tbody>
                      <tr>
                        <th>{translations.armor}</th>
                        <th>{translations.necessaryStrength}</th>
                        <th>{translations.limitation}</th>
                        <th>{translations.protection}</th>
                        <th></th>
                      </tr>

                      {Object.keys(armors[key]).map(armorName => (
                        <ArmorRow key={armorName} armorName={armorName} armorType={key} />
                      ))}

                    </tbody>
                  </table>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>
        ))}

        <PanelAutofill screen="screenArmors"/>

      </form>
    );
  }
}

const ScreenArmors = connect(mapStateToProps)(ConnectedScreenArmors);

export default ScreenArmors;
