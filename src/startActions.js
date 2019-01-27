import store from "./store/index";
import translations from "./translations";
import changeInfo from "./actions/changeInfo";
import resetLevels from "./actionPackages/resetLevels";
import autofillScreen from "./actions/autofillScreen";
import resolveScreen from "./actions/resolveScreen";
import resolveBackgroundAndChangeScreen from "./actionPackages/resolveBackgroundAndChangeScreen";
import changeScreen from "./actions/changeScreen";
import calculateSheet from "./actionPackages/calculateSheet";
import autofillScreenAbilities from "./actionPackages/autofillScreenAbilities";
import autofillScreenSkills from "./actionPackages/autofillScreenSkills";
import changeWeapon from "./actionPackages/changeWeapon";
import setSwitcher from "./actions/setSwitcher";

export default function startActions() {

	// Set initial values at screenCharacter
	store.dispatch( changeInfo({ key: "race", value: "elf"}) )
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
	store.dispatch( setSwitcher({key: "autoFillAbilities", value: true}) )
	autofillScreenAbilities()
	store.dispatch( changeScreen({active: "screenSkills"}) )

	// Go to screen 5
	autofillScreenSkills(true)
	store.dispatch( changeScreen({active: "screenWeapons"}) )
	changeWeapon("hand", "noWeapon", "ADD")
	changeWeapon("twohandedAxe", "axes", "ADD")
	changeWeapon("pike", "spears", "ADD")
};
