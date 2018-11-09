import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import changeScreen from "../actions/changeScreen";

const mapDispatchToProps = dispatch => {
  return {
    changeScreen: item => dispatch(changeScreen(item))
  };
};

const mapStateToProps = (state) => {
  return { screens: state.get('screens')};
};

class ConnectedNavigation extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    const target = event.target;
    let parentLi = target.closest('li');
    let isDisabled = parentLi.classList.contains('disabled');

    if (!isDisabled) {
      let screen = target.getAttribute('data-screen');
      console.log(screen);
      this.props.changeScreen({ active: screen});
    }
  }

  render(props) {
    let screensArray = [
      "screenCharacter",
      "screenBackground",
      "screenAbilities",
      "screenSkills",
      "screenWeapons",
      "screenArmors",
      "screenExport",
    ];

    return (
      <ul className="nav nav-tabs">
        {screensArray.map(key => (
          <li key={key} role="presentation" className={this.props.screens.get(key) < 0 ? 'disabled' : this.props.screens.get('active') == key ? 'active' : ''}>
            <a href="#" data-screen={key} onClick={this.handleClick}>
              {translations[key]}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

const Navigation = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavigation);

export default Navigation;
