import store from "./store/index";
import translations from "./translations";
import changeInfo from "./actions/changeInfo";
import autofillScreen from "./actions/autofillScreen";
import resolveScreen from "./actions/resolveScreen";
import changeScreen from "./actions/changeScreen";
import actionPackages from "./actionPackages/actionPackages";

export default function startActions() {

	// Set initial values at screenCharacter
	store.dispatch( changeInfo({ key: "race", value: "human"}) )
	store.dispatch( changeInfo({ key: "class", value: "warrior"}) )
	store.dispatch( changeInfo({ key: "level", value: "1"}) )
	store.dispatch( changeInfo({ key: "sex", value: "male"}) )

	// TEST abilities
	store.dispatch( autofillScreen({ screen: "screenCharacter"}) )
	actionPackages("calculateSheet")
	store.dispatch( resolveScreen({ active: "screenCharacter"}) )
	store.dispatch( changeScreen({active: "screenBackground"}) )

	// jQuery init plugins
	$(function () {
		$('[data-toggle="popover"]').popover();
	});
};
