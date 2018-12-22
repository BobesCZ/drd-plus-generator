import store from "./store/index";
import translations from "./translations";
import changeInfo from "./actions/changeInfo";
import resetLevels from "./actionPackages/resetLevels";
import autofillScreen from "./actions/autofillScreen";
import resolveScreen from "./actions/resolveScreen";
import resolveBackgroundAndChangeScreen from "./actionPackages/resolveBackgroundAndChangeScreen";
import changeScreen from "./actions/changeScreen";
import calculateSheet from "./actionPackages/calculateSheet";
import setSkillsPoints from "./actions/setSkillsPoints";
import autofillScreenAbilities from "./actionPackages/autofillScreenAbilities";

export default function startActions() {

	// Set initial values at screenCharacter
	store.dispatch( changeInfo({ key: "race", value: "human"}) )
	store.dispatch( changeInfo({ key: "class", value: "warrior"}) )
	store.dispatch( changeInfo({ key: "level", value: "6"}) )
	store.dispatch( changeInfo({ key: "sex", value: "male"}) )
	resetLevels()

	// Go to screen 2
	store.dispatch( autofillScreen({ screen: "screenCharacter"}) )
	calculateSheet()
	store.dispatch( resolveScreen({ active: "screenCharacter"}) )
	store.dispatch( changeScreen({active: "screenBackground"}) )

	// Go to screen 3
	store.dispatch( autofillScreen({screen: "screenBackground"}) )
	resolveBackgroundAndChangeScreen()
	store.dispatch( changeScreen({active: "screenAbilities"}) )

	// Go to screen 4
	autofillScreenAbilities()
	store.dispatch( changeScreen({active: "screenSkills"}) )
	store.dispatch( setSkillsPoints({}) )
};
