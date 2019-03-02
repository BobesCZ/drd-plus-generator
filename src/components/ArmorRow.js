import React from "react";
import { connect } from "react-redux";
import changeArmor from "../actionPackages/changeArmor";
import getArmorMissingStrength from "../calculations/getArmorMissingStrength";
import translations from "../translations";
import tables from "../data/tables";

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    abilities: state.getIn(['character', 'abilities']),
    armors: state.getIn(['character', 'armors']),
  };
};

class ConnectedArmorRow extends React.Component {
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

    let value = target.value;
    let armorName = target.name;
    let armorType = target.getAttribute('data-type');

    if (value === "REMOVE") {
      armorName = ""
    }

    changeArmor(armorName, armorType)
  }

  render(props) {
    let armorName = this.props.armorName
    let armorType = this.props.armorType
    let armors = tables.armors
    let charStrength = this.props.abilities.get('strength')
    let charRace = this.props.info.get('race')
    let armorsStateObject = this.props.armors

    let armorMissingStrength = getArmorMissingStrength(armors[armorType][armorName]["necessaryStrength"], charStrength, charRace);
    let armorExists = armorName === armorsStateObject.getIn([armorType, "armorName"]);

    return (
      <tr className={armorMissingStrength > 0 ? 'text-black-50' : ''}>
        <td>{translations[armorName]}</td>
        <td>{armors[armorType][armorName]["necessaryStrength"]}</td>
        <td>{armors[armorType][armorName]["limitation"]}</td>
        <td>{armors[armorType][armorName]["protection"]}</td>
        <td>
          <button
              type="button"
              className={armorExists ? 'btn btn-danger' : 'btn btn-success'}
              name={armorName}
              data-type={armorType}
              onClick={this.handleButtonClick}
              value={armorExists ? "REMOVE" : "ADD"}
              >
              <i className={armorExists ? 'fas fa-minus m-0' : 'fas fa-plus m-0'}></i>
            </button>
        </td>
      </tr>
    )

  }
}

const ArmorRow = connect(mapStateToProps)(ConnectedArmorRow);

export default ArmorRow;
