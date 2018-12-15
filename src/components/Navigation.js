import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import changeScreen from "../actions/changeScreen";
import screensArray from "../helpers/screensArray";

const mapDispatchToProps = dispatch => {
  return {
    changeScreen: item => dispatch(changeScreen(item))
  };
};

const mapStateToProps = (state) => {
  return {
    screens: state.get('screens'),
    activeScreen: state.get('activeScreen'),
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
    let isDisabled = target.classList.contains('disabled');

    if (!isDisabled) {
      let screen = target.getAttribute('data-screen');
      this.props.changeScreen({ active: screen});
    }
  }

  render(props) {

    return (
      <ul className="nav nav-tabs mb-4">
        {screensArray.map(key => (
          <li key={key} role="presentation" className="nav-item">
            <a
              href="#"
              data-screen={key}
              className={this.props.screens.get(key) < 0 ? 'nav-link disabled' : this.props.activeScreen == key ? 'nav-link active' : 'nav-link'}
              onClick={this.handleClick}
            >
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
