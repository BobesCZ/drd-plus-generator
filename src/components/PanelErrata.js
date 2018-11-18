import React from "react";
import { connect } from "react-redux";
import setErrata from "../actions/setErrata";
import resolveBackground from "../actions/resolveBackground";
import resolveScreen from "../actions/resolveScreen";
import translations from "../translations";

const mapDispatchToProps = dispatch => {
  return {
    setErrata: item => dispatch(setErrata(item)),
    resolveBackground: item => dispatch(resolveBackground(item)),
    resolveScreen: item => dispatch(resolveScreen(item)),
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
      this.props.resolveBackground({});
      this.props.resolveScreen({ active: "screenBackground"});
    }
  }

  render(props) {
    var checked = this.props.errata.get(this.props.name);
    
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          {translations.PanelErrataHeader}
        </div>

        <div className="panel-body bg-warning">
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
