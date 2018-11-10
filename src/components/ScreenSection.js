// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import React from "react";
import { Provider, connect } from "react-redux";
import translations from "../translations";
import ScreenCharacter from "./ScreenCharacter";
import ScreenBackground from "./ScreenBackground";

const mapStateToProps = (state) => {
  return { active: state.get('activeScreen')};
};

class ConnectedScreenSection extends React.Component {
  render(active) {
    let activeScreen = this.props.active;
    // console.log(activeScreen);

    if (activeScreen == "screenCharacter") {
      return (
        <ScreenCharacter />
      )
    }
    else if (activeScreen == "screenBackground")  {
      return (
        <ScreenBackground />
      )
    }
    else {
      return (
        <p> neznámá sekce :-| </p>
      )
    }
  }
}

const ScreenSection = connect(mapStateToProps)(ConnectedScreenSection);

export default ScreenSection;