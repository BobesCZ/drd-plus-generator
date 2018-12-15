import React from "react";
import { connect } from "react-redux";
import setErrata from "../actions/setErrata";
import resolveBackgroundAndChangeScreen from "../actionPackages/resolveBackgroundAndChangeScreen";
import translations from "../translations";

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
  constructor(props) {
    super();
    this.state = {};

    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log({ key: name, value: value});
    this.props.setErrata({ key: name, value: value});

    // Do custom actions when change errata
    if (name === "backgroundPointsHasNoRangeLimit") {
      resolveBackgroundAndChangeScreen();
    }
  }

  render(props) {
    var checked = this.props.errata.get(this.props.name);

    return (
      <div className="card alert-warning mb-4">
        <div className="card-header">
          <i class="fas fa-user-edit"></i>
          {translations.PanelErrataHeader}
        </div>

        <div className="card-body">
          <p>
            {translations.PanelErrataText}
          </p>

          <label className="switch-light" onClick={this.handleChangeFormInput}>
            <input type="checkbox" name={this.props.name} checked={checked}/>

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
