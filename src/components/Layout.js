import React from "react";

import ScreenCharacter from "./ScreenCharacter";
import CharacterSheet from "./CharacterSheet";
import Navigation from "./Navigation";
import StepNavigation from "./StepNavigation";
import ScreenSection from "./ScreenSection";
import SaveModal from "./SaveModal";

class Layout extends React.Component {
	constructor(props) {
	    super();
	    this.state = {};
	}

    render() {
        return (

        	<div className="container">

        		<h1>DrDGen+</h1>

        		<SaveModal />

	        	{/* Navigation part (forms etc) */}
	    		<Navigation />

        		<div className="row mb-5">
        			<div className="col-lg-6">
		        		{/* Interaction part (forms etc) */}
		        		<ScreenSection />
		        		<StepNavigation />
		    		</div>

	    			<div className="col-lg-6">
		        		{/* Printing part (character sheet) */}
	    	    		<CharacterSheet />
	    			</div>
    			</div>
    		</div>

    	);
    }
}

export default Layout;
