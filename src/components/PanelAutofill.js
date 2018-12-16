import React from "react";
import { connect } from "react-redux";
import getPreferredAbility from "../helpers/getPreferredAbility";
import translations from "../translations";

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
  };
};

class ConnectedPanelAutofill extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render(props) {
    let screen = this.props.screen;
    let charClass = this.props.info.get("class");
    let content;

    if (screen === "screenBackground") {
      content = translations.autoFillBackground;
    }
    else if (screen === "screenAbilities") {
      let abilities = [];
      let abilitiesString;

      ["primaryPreferred", "primaryOther", "secondaryPreferred", "secondaryOther"].forEach((item) => {
        abilities.push(translations[getPreferredAbility(charClass, item)])
      })
      abilitiesString = abilities.join(", ")

      content = <div>
                  <p>
                    {translations.autoFillAbilities}
                  </p>
                  <p>
                    {translations.autoFillAbilitiesClass1}&nbsp;
                    {translations[charClass]}&nbsp;
                    {translations.autoFillAbilitiesClass2}&nbsp;
                    {abilitiesString}
                  </p>
                </div>
    }

    return (
      <div className="card alert-success mb-4">
        <div className="card-header">
          <i className="fas fa-angle-double-right"></i>
          {translations.autoFillHeader}
        </div>
        <div className="card-body">
          {content}
        </div>
      </div>
    );
  }
}

const PanelAutofill = connect(mapStateToProps, null)(ConnectedPanelAutofill);

export default PanelAutofill;
