import store from "../store/index";
import resolveLevels from "../actions/resolveLevels";
import calculateSheet from "../actionPackages/calculateSheet";
import resolveScreen from "../actions/resolveScreen";

const resetLevels = (callResolveScreen = false) => {

	// Always dispatch calculateSheet after resolveLevels
	store.dispatch( resolveLevels({}) )
	calculateSheet()

	if (callResolveScreen) {
		store.dispatch( resolveScreen({ active: "screenAbilities"}) )
	}

};

export default resetLevels;
