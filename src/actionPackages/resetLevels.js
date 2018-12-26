import store from "../store/index";
import resolveLevels from "../actions/resolveLevels";
import calculateSheet from "../actionPackages/calculateSheet";
import resolveScreen from "../actions/resolveScreen";
import resetSkills from "../actionPackages/resetSkills";

const resetLevels = () => {

	// Always dispatch calculateSheet after resolveLevels
	store.dispatch( resolveLevels({}) )
	resetSkills()
	calculateSheet()

	store.dispatch( resolveScreen({ active: "screenAbilities"}) )

};

export default resetLevels;
