// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import React from 'react';
import { connect } from 'react-redux';
import ScreenAbilities from './ScreenAbilities';
import ScreenArmors from './ScreenArmors';
import ScreenBackground from './ScreenBackground';
import ScreenCharacter from './ScreenCharacter';
import ScreenExport from './ScreenExport';
import ScreenSkills from './ScreenSkills';
import ScreenWeapons from './ScreenWeapons';

const mapStateToProps = (state) => {
  return { active: state.get('activeScreen') };
};

class ConnectedScreenSection extends React.Component {
  render () {
    const activeScreen = this.props.active;

    if (activeScreen === 'screenCharacter') {
      return (
        <ScreenCharacter />
      );
    }
    else if (activeScreen === 'screenBackground') {
      return (
        <ScreenBackground />
      );
    }
    else if (activeScreen === 'screenAbilities') {
      return (
        <ScreenAbilities />
      );
    }
    else if (activeScreen === 'screenSkills') {
      return (
        <ScreenSkills />
      );
    }
    else if (activeScreen === 'screenWeapons') {
      return (
        <ScreenWeapons />
      );
    }
    else if (activeScreen === 'screenArmors') {
      return (
        <ScreenArmors />
      );
    }
    else if (activeScreen === 'screenExport') {
      return (
        <ScreenExport />
      );
    }
    else {
      return false;
    }
  }
}

const ScreenSection = connect(mapStateToProps)(ConnectedScreenSection);

export default ScreenSection;
