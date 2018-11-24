import React from "react";

import ScreenCharacter from "./ScreenCharacter";
import CharacterSheet from "./CharacterSheet";
import Navigation from "./Navigation";
import StepNavigation from "./StepNavigation";
import ScreenSection from "./ScreenSection";

class Layout extends React.Component {
	constructor(props) {
	    super();
	    this.state = {};
	}

    render() {
        return (

        	<div className="container">

        		<h1>DrD Plus Generátor postav </h1>

	        	{/* Navigation part (forms etc) */}
	    		<Navigation />

        		<div className="row layout-content">
        			<div className="col-sm-6">
		        		{/* Interaction part (forms etc) */}
		        		<ScreenSection />
		        		<StepNavigation />
		    		</div>

	    			<div className="col-sm-6">
		        		{/* Printing part (character sheet) */}
	    	    		<CharacterSheet />
	    			</div>
    			</div>
    		</div>

    	);
    }
}

export default Layout;
