import store from "../store/index";
import resolveLevels from "../actions/resolveLevels";
import calculateSheet from "../actionPackages/calculateSheet";
import resolveScreen from "../actions/resolveScreen";
import setSkillsPoints from "../actions/setSkillsPoints";

const resetLevels = () => {

	// Always dispatch calculateSheet after resolveLevels
	store.dispatch( resolveLevels({}) )
	store.dispatch( setSkillsPoints({}) )
	calculateSheet()

	store.dispatch( resolveScreen({ active: "screenAbilities"}) )

};

export default resetLevels;
