import store from "./store/index";
import translations from "./translations";
import changeInfo from "./actions/changeInfo";
import resetLevels from "./actionPackages/resetLevels";
import autofillScreen from "./actions/autofillScreen";
import checkScreen from "./actionPackages/checkScreen";
import resolveBackgroundAndChangeScreen from "./actionPackages/resolveBackgroundAndChangeScreen";
import changeScreen from "./actions/changeScreen";
import calculateSheet from "./actionPackages/calculateSheet";
import autofillScreenAbilities from "./actionPackages/autofillScreenAbilities";
import autofillScreenSkills from "./actionPackages/autofillScreenSkills";
import autofillScreenWeapons from "./actionPackages/autofillScreenWeapons";
import autofillScreenArmors from "./actionPackages/autofillScreenArmors";
import changeWeapon from "./actionPackages/changeWeapon";
import changeArmor from "./actionPackages/changeArmor";
import setSwitcher from "./actions/setSwitcher";

export default function startActions() {

	// Set initial values at screenCharacter
	store.dispatch( changeInfo({ key: "race", value: "human"}) )
	store.dispatch( changeInfo({ key: "class", value: "warrior"}) )
	store.dispatch( changeInfo({ key: "level", value: "10"}) )
	store.dispatch( changeInfo({ key: "sex", value: "male"}) )
	resetLevels()

	// Go to screen 2
	store.dispatch( autofillScreen({ screen: "screenCharacter"}) )
	calculateSheet()
	checkScreen("screenCharacter")
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

	// Go to screen 6
	autofillScreenWeapons()
	store.dispatch( changeScreen({active: "screenArmors"}) )

	// Go to screen 7
	autofillScreenArmors()
	store.dispatch( changeScreen({active: "screenExport"}) )

};
