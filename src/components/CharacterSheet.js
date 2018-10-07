import React from "react";

class CharacterSheet extends React.Component {
  constructor(props) {
    super();
    this.state = {};
	}

	render() {
		
  	return (
  		<div className="alert alert-info">Jméno: {/*this.state.character.info["Jméno"]*/} </div>
  	)

	}
}

export default CharacterSheet;