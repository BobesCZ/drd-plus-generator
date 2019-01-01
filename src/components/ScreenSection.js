// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import React from "react";
import { Provider, connect } from "react-redux";
import translations from "../translations";
import ScreenCharacter from "./ScreenCharacter";
import ScreenBackground from "./ScreenBackground";
import ScreenAbilities from "./ScreenAbilities";
import ScreenSkills from "./ScreenSkills";
import ScreenWeapons from "./ScreenWeapons";

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
    else if (activeScreen == "screenAbilities")  {
      return (
        <ScreenAbilities />
      )
    }
    else if (activeScreen == "screenSkills")  {
      return (
        <ScreenSkills />
      )
    }
    else if (activeScreen == "screenWeapons")  {
      return (
        <ScreenWeapons />
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
