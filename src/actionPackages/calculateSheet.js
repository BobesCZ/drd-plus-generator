import store from "../store/index";
import calculateAbilities from "../actions/calculateAbilities";
import calculateDerivedAbilities from "../actions/calculateDerivedAbilities";
import calculateCombatParameters from "../actions/calculateCombatParameters";

const calculateSheet = () => {

	// Calculate dependent parts of character sheet in logical order
	store.dispatch( calculateAbilities({}) )
	store.dispatch( calculateDerivedAbilities({}) )
	store.dispatch( calculateCombatParameters({}) )

};

export default calculateSheet;
