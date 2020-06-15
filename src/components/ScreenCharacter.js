import React from "react";
import { connect } from "react-redux";
import store from "../store/index";
import changeInfo from "../actions/changeInfo";
import setErrata from "../actions/setErrata";
import resetLevels from "../actionPackages/resetLevels";
import translations from "../translations";
import calculateSheet from "../actionPackages/calculateSheet";
import checkScreen from "../actionPackages/checkScreen";
import OverlayTrigger  from 'react-bootstrap/OverlayTrigger';
import Popover  from 'react-bootstrap/Popover';

const mapDispatchToProps = dispatch => {
  return {
    changeInfo: item => dispatch(changeInfo(item)),
    setErrata: item => dispatch(setErrata(item)),
  };
};

const mapStateToProps = (state) => {
  return { info: state.getIn(['character', 'info'])};
};

class ConnectedScreenCharacter extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleChangeFormInput = this.handleChangeFormInput.bind(this);
  }

  handleChangeFormInput(event) {
    // https://reactjs.org/docs/forms.html
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log({ key: name, value: value});
    this.props.changeInfo({ key: name, value: value});
    checkScreen("screenCharacter");

    // Ignore field Name and Note, otherwise call resetLevels
    if (name !== "name" && name !== "note"){
      resetLevels();
    }

    // If class is not Warrior, reset errata for Warrior
    if (name === "class" && value !== "warrior") {
      this.props.setErrata({ key: "warriorHasAdditionalWeaponSkillsDegrees", value: false});
    }
  }

  render(props) {

    return (
      <form>

        <div className="form-group">
          <label htmlFor="inputName">{translations.charname}</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            value={this.props.info.get("name")}
            onInput={this.handleChangeFormInput}
            placeholder={translations.charnamePlaceholder}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputRace">{translations.race}</label>
          <select
            className="form-control"
            id="inputRace"
            name="race"
            value={this.props.info.get("race")}
            onChange={this.handleChangeFormInput}
          >
            <option value="human">{translations.human}</option>
            <option value="mountaineer">{translations.mountaineer}</option>
            <option value="elf">{translations.elf}</option>
            <option value="greenElf">{translations.greenElf}</option>
            <option value="darkElf">{translations.darkElf}</option>
            <option value="dwarf">{translations.dwarf}</option>
            <option value="mountainDwarf">{translations.mountainDwarf}</option>
            <option value="hobbit">{translations.hobbit}</option>
            <option value="kroll">{translations.kroll}</option>
            <option value="wildKroll">{translations.wildKroll}</option>
            <option value="orc">{translations.orc}</option>
            <option value="hobgoblin">{translations.hobgoblin}</option>
            <option value="goblin">{translations.goblin}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inputClass">{translations.class}</label>
          <select
            className="form-control"
            id="inputClass"
            name="class"
            value={this.props.info.get("class")}
            onChange={this.handleChangeFormInput}
          >
            <option value="warrior">{translations.warrior}</option>
            <option value="sorcerer">{translations.sorcerer}</option>
            <option value="rogue">{translations.rogue}</option>
            <option value="ranger">{translations.ranger}</option>
            <option value="theurge">{translations.theurge}</option>
            <option value="cleric">{translations.cleric}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inputLevel">{translations.level}</label>
          <select
            className="form-control"
            id="inputLevel"
            name="level"
            value={this.props.info.get("level")}
            onChange={this.handleChangeFormInput}
          >
            <option value="1">1.</option>
            <option value="2">2.</option>
            <option value="3">3.</option>
            <option value="4">4.</option>
            <option value="5">5.</option>
            <option value="6">6.</option>
            <option value="7">7.</option>
            <option value="8">8.</option>
            <option value="9">9.</option>
            <option value="10">10.</option>
            <option value="11">11.</option>
            <option value="12">12.</option>
            <option value="13">13.</option>
            <option value="14">14.</option>
            <option value="15">15.</option>
            <option value="16">16.</option>
            <option value="17">17.</option>
            <option value="18">18.</option>
            <option value="19">19.</option>
            <option value="20">20.</option>
            <option value="21">21.</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inputSex">
            {translations.sex} &nbsp;

            <OverlayTrigger
              trigger="hover"
              placement="right"
              overlay={
                <Popover id="sexPopover">
                  <Popover.Content>
                    {translations.sexPopover}
                   </Popover.Content>
                </Popover>
              }
            >
              <i className="fas fa-question-circle"></i>
            </OverlayTrigger>
          </label>
          <select
            className="form-control"
            id="inputSex"
            name="sex"
            value={this.props.info.get("sex")}
            onChange={this.handleChangeFormInput}
          >
            <option value="male">{translations.male}</option>
            <option value="female">{translations.female}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inputNote">{translations.note}</label>
          <textarea
            className="form-control"
            id="inputNote"
            name="note"
            value={this.props.info.get("note")}
            onChange={this.handleChangeFormInput}
            placeholder={translations.notePlaceholder}
            rows="3"
          />
        </div>

      </form>
    )

  }
}

const ScreenCharacter = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenCharacter);

export default ScreenCharacter;
