import React from 'react';
import { connect } from 'react-redux';
import resetSkills from '../actionPackages/resetSkills';
import resolveBackgroundAndChangeScreen from '../actionPackages/resolveBackgroundAndChangeScreen';
import setErrata from '../actions/setErrata';
import tables from '../data/tables';
import getRomanizedNumber from '../helpers/getRomanizedNumber';
import getStringifiedNumber from '../helpers/getStringifiedNumber';
import translations from '../translations';

const mapDispatchToProps = dispatch => {
  return {
    setErrata: item => dispatch(setErrata(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    errata: state.get('errata'),
  };
};

class ConnectedPanelErrata extends React.Component {
  constructor (props) {
    super(props);
    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.setErrata({ key: name, value: value });

    // Do custom actions when change errata
    if (name === 'backgroundPointsHasNoRangeLimit') {
      resolveBackgroundAndChangeScreen();
    }
    else if (name === 'warriorHasAdditionalWeaponSkillsDegrees') {
      resetSkills();
    }
  }

  render (props) {
    const name = this.props.name;
    const checked = this.props.errata.get(name);
    let content;

    if (name === 'backgroundPointsHasNoRangeLimit') {
      content = <p>
        {translations.PanelErrataTextBackground}
      </p>;
    }
    else if (name === 'warriorHasAdditionalWeaponSkillsDegrees') {
      const degreesArray = [];

      [4, 5, 6].forEach((degree) => {
        degreesArray[degree] = [];

        ['attackNumber', 'cover', 'damageNumber'].forEach((key) => {
          const value = getStringifiedNumber(tables.weaponSkillDegrees[degree][key]);
          degreesArray[degree][key] = value;
        });
      });

      content = <div>
        <p>
          {translations.PanelErrataTextWeaponSkillsDegree}
        </p>
        <table className="table">
          <tbody>
            <tr>
              <th>{translations.degree}</th>
              <th>{translations.attackNumber}</th>
              <th>{translations.cover}</th>
              <th>{translations.damageNumber}</th>
            </tr>
            {Object.keys(degreesArray).map(degree => (
              <tr key={degree}>
                <td>{getRomanizedNumber(degree)}.</td>
                <td>{degreesArray[degree].attackNumber}</td>
                <td>{degreesArray[degree].cover}</td>
                <td>{degreesArray[degree].damageNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>;
    }

    return (
      <div className="card alert-warning mb-4">
        <div className="card-header">
          <i className="fas fa-user-edit"></i>
          {translations.PanelErrataHeader}
        </div>

        <div className="card-body">

          {content}

          <label className="switch-light mb-0">
            <input
              type="checkbox"
              name={this.props.name}
              checked={checked}
              onChange={this.handleChangeFormInput}
            />

            <span className="switch-light__inner">
              <span className="switch-light__false">
                {translations.PanelErrataFalse}
              </span>

              <span className="switch-light__true">
                {translations.PanelErrataTrue}
              </span>

              <a className="btn btn-warning"></a>
            </span>

          </label>

        </div>
      </div>
    );
  }
}

const PanelErrata = connect(mapStateToProps, mapDispatchToProps)(ConnectedPanelErrata);

export default PanelErrata;
