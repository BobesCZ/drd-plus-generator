import store from "./store/index";
import translations from "./translations";
import changeInfo from "./actions/changeInfo";

export default function startActions() {

	// Set initial name to Random peasant
	
	// Set initial values at screenCharacter
	store.dispatch( changeInfo({ key: "race", value: "human"}) )
	store.dispatch( changeInfo({ key: "class", value: "warrior"}) )
	store.dispatch( changeInfo({ key: "level", value: "1"}) )
	store.dispatch( changeInfo({ key: "sex", value: "male"}) )
	

	// jQuery init plugins
	$(function () {
		$('[data-toggle="popover"]').popover();
	});
};
