import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import changeScreen from "../actions/changeScreen";

const mapDispatchToProps = dispatch => {
  return {
    changeScreen: item => dispatch(changeScreen(item))
  };
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

  render() {
    return (
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#" data-screen="1" onClick={this.handleClick}>{translations.screenCharacter}</a></li>
        <li role="presentation" className=""><a href="#" data-screen="2" onClick={this.handleClick}>{translations.screenBackground}</a></li>
        <li role="presentation" className="disabled"><a href="#" data-screen="3" onClick={this.handleClick}>{translations.screenAbilities}</a></li>
        <li role="presentation" className="disabled"><a href="#" data-screen="4" onClick={this.handleClick}>{translations.screenSkills}</a></li>
        <li role="presentation" className="disabled"><a href="#" data-screen="5" onClick={this.handleClick}>{translations.screenWeapons}</a></li>
        <li role="presentation" className="disabled"><a href="#" data-screen="6" onClick={this.handleClick}>{translations.screenArmors}</a></li>
        <li role="presentation" className="disabled"><a href="#" data-screen="7" onClick={this.handleClick}>{translations.screenExport}</a></li>
      </ul>
    );
  }
}

const Navigation = connect(null, mapDispatchToProps)(ConnectedNavigation);

export default Navigation;
