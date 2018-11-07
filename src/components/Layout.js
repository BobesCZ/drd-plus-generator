import React from "react";

import ScreenCharacter from "./ScreenCharacter";
import CharacterSheet from "./CharacterSheet";
import Navigation from "./Navigation";
import ScreenSection from "./ScreenSection";

class Layout extends React.Component {
	constructor(props) {
	    super();
	    this.state = {};

		this.handleChangeInfo = this.handleChangeInfo.bind(this);
	}

    render() {
        return (

        	<div className="container">
        		
        		<h1>DrD Plus Generátor postav </h1>

	        	{/* Navigation part (forms etc) */}
	    		<Navigation />
	        		
        		<div className="row">
        			<div className="col-sm-6">
		        		{/* Interaction part (forms etc) */}
		        		<ScreenSection />
		    		</div>

	    			<div className="col-sm-6">
		        		{/* Printing part (character sheet) */}
	    	    		<CharacterSheet />
	    			</div>
    			</div>
    		</div>

    	);
    }

	handleChangeInfo(event) {
		// https://reactjs.org/docs/forms.html
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

		let statusCopy = Object.assign({}, this.state);
		statusCopy.character.info[name] = value

	    this.setState({
      		statusCopy
	    });

		console.log(this.state);
  	}
}

export default Layout;
