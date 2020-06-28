import React from 'react';
import { connect } from 'react-redux';
import changeArmor from '../actionPackages/changeArmor';
import getArmorMissingStrength from '../calculations/getArmorMissingStrength';
import tables from '../data/tables';
import translations from '../translations';

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    abilities: state.getIn(['character', 'abilities']),
    armors: state.getIn(['character', 'armors']),
  };
};

class ConnectedArmorRow extends React.Component {
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
    let armorName = target.name;
    const armorType = target.getAttribute('data-type');

    if (value === 'REMOVE') {
      armorName = '';
    }

    changeArmor(armorName, armorType);
  }

  render () {
    const armorName = this.props.armorName;
    const armorType = this.props.armorType;
    const armors = tables.armors;
    const charStrength = this.props.abilities.get('strength');
    const charRace = this.props.info.get('race');
    const armorsStateObject = this.props.armors;

    const armorMissingStrength = getArmorMissingStrength(armors[armorType][armorName].necessaryStrength, charStrength, charRace);
    const armorExists = armorName === armorsStateObject.getIn([armorType, 'armorName']);

    return (
      <tr className={armorMissingStrength > 0 ? 'text-black-50' : ''}>
        <td>{translations[armorName]}</td>
        <td>{armors[armorType][armorName].necessaryStrength}</td>
        <td>{armors[armorType][armorName].limitation}</td>
        <td>{armors[armorType][armorName].protection}</td>
        <td>
          <button
            type="button"
            className={armorExists ? 'btn btn-danger' : 'btn btn-success'}
            name={armorName}
            data-type={armorType}
            onClick={this.handleButtonClick}
            value={armorExists ? 'REMOVE' : 'ADD'}
          >
            <i className={armorExists ? 'fas fa-minus m-0' : 'fas fa-plus m-0'}></i>
          </button>
        </td>
      </tr>
    );
  }
}

const ArmorRow = connect(mapStateToProps)(ConnectedArmorRow);

export default ArmorRow;
