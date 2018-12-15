import store from "../store/index";
import resolveLevels from "../actions/resolveLevels";
import calculateSheet from "../actionPackages/calculateSheet";

const resetLevels = () => {

	// Always dispatch calculateSheet after resolveLevels
	store.dispatch( resolveLevels({}) )
	calculateSheet()

};

export default resetLevels;
