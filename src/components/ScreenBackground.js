import React from "react";
import { connect } from "react-redux";
import store from "../store/index";
import changeInfo from "../actions/changeInfo";
import translations from "../translations";

const mapDispatchToProps = dispatch => {
  return {
    // changeInfoP: item => dispatch(changeInfo(item))
  };
};

class ConnectedScreenBackground extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    // this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput(event) {
   
  }

  render() {
      
    return (
      <p>
        Druhý screen - {translations.screenBackground}
      </p>
    )

  }
}

const ScreenBackground = connect(null, mapDispatchToProps)(ConnectedScreenBackground);

export default ScreenBackground;
