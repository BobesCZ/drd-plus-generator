import store from "../store/index";
import resolveLevels from "../actions/resolveLevels";
import calculateSheet from "../actionPackages/calculateSheet";
import checkScreen from "../actionPackages/checkScreen";
import resetSkills from "../actionPackages/resetSkills";

const resetLevels = () => {

	// Always dispatch calculateSheet after resolveLevels
	store.dispatch( resolveLevels({}) )
	resetSkills()
	calculateSheet()

	checkScreen("screenAbilities")
	checkScreen("screenBackground")
	checkScreen("screenCharacter")

};

export default resetLevels;
