import React from "react";
import ArmorRow from "./ArmorRow";
import { connect } from "react-redux";
import PanelErrata from "./PanelErrata";
import translations from "../translations";
import Navbar  from 'react-bootstrap/lib/Navbar';
import tables from "../data/tables";

const mapDispatchToProps = dispatch => {
  return {
    // setSwitcher: item => dispatch(setSwitcher(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    skills: state.getIn(['character', 'skills']),
  };
};

class ConnectedScreenArmors extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    // this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  render(props) {
    let skills = this.props.skills.getIn(['distributed', 'combat'])
    let armors = tables.armors

    return (
      <form>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.armorPanelHeader}
          </div>
          <div className="card-body">
            <ul>
              <li>{translations.armorPanelLi1}</li>
              <li>{translations.armorPanelLi2}</li>
            </ul>
          </div>
        </div>

        {Object.keys(armors).map(key => (
          <div key={key} className="card card--collapse bg-light mb-2">
            <Navbar expand="true">
              <div className="card-header">
                <span>
                  {translations[key]}&nbsp;
                </span>
              </div>

              <Navbar.Toggle
                aria-controls={'armors' + key}
                children={
                  <i className="fas fa-chevron-circle-down"></i>
                }
              />

              <Navbar.Collapse id={'armors' + key}>

                <div className="card-body">
                  <table className="table weapon-table">
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

      </form>
    )

  }
}

const ScreenArmors = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenArmors);

export default ScreenArmors;
