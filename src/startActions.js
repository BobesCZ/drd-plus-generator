import store from "./store/index";
import translations from "./translations";
import changeInfo from "./actions/changeInfo";
import resolveLevels from "./actions/resolveLevels";
import autofillScreen from "./actions/autofillScreen";
import resolveScreen from "./actions/resolveScreen";
import resolveBackgroundAndChangeScreen from "./actionPackages/resolveBackgroundAndChangeScreen";
import changeScreen from "./actions/changeScreen";
import calculateSheet from "./actionPackages/calculateSheet";

export default function startActions() {

	// Set initial values at screenCharacter
	store.dispatch( changeInfo({ key: "race", value: "elf"}) )
	store.dispatch( changeInfo({ key: "class", value: "warrior"}) )
	store.dispatch( changeInfo({ key: "level", value: "6"}) )
	store.dispatch( changeInfo({ key: "sex", value: "male"}) )
	store.dispatch( resolveLevels({}) )

	// Go to screen 2
	store.dispatch( autofillScreen({ screen: "screenCharacter"}) )
	calculateSheet()
	store.dispatch( resolveScreen({ active: "screenCharacter"}) )
	store.dispatch( changeScreen({active: "screenBackground"}) )

	// Go to screen 3
	store.dispatch( autofillScreen({screen: "screenBackground"}) )
	resolveBackgroundAndChangeScreen()
	store.dispatch( changeScreen({active: "screenAbilities"}) )

};
