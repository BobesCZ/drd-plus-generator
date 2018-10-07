import React from "react";
import { connect } from "react-redux";
import store from "../store/index";

const changeInfo = item => ({ type: "CHANGE_INFO", payload: item });

const mapDispatchToProps = dispatch => {
  return {
    changeInfoP: item => dispatch(changeInfo(item))
  };
};

class ConnectedInteractionSection extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleChangeForm = this.handleChangeForm.bind(this);
	}

	handleChangeForm(event) {
    // https://reactjs.org/docs/forms.html
	  const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log({ key: name, value: value});
    this.props.changeInfoP({ key: name, value: value});
	}

	render() {
  		
  	return (
  		<form>
  			<div className="form-group">
            		<label htmlFor="choose_jmeno">Jméno postavy</label>
                	<input type="text" className="form-control" name="name" onInput={this.handleChangeForm} placeholder="Vyplň tu něco! Přece nechceš, aby to byl náhodný bezejmenný vidlák..." />
              </div>

              <div className="form-group">
            		<label htmlFor="choose_jmeno">Rasa</label>
                	{/*<input type="text" className="form-control" name="race" onClick={(e) => this.props.handleChangeForm(e)} placeholder="Vyplň tu něco! Přece nechceš, aby to byl náhodný bezejmenný vidlák..." />*/}
              </div>
		  </form>
  	)

	}
}

const InteractionSection = connect(null, mapDispatchToProps)(ConnectedInteractionSection);

export default InteractionSection;
