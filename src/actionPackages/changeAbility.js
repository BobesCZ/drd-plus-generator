import store from "../store/index";
import changeAbilityValue from "../actions/changeAbilityValue";

// changeValue => number that will be added to current value (+1, -1)
const changeAbility = (ability, level, changeValue) => {

	// Change value in store
	store.dispatch( changeAbilityValue({ability, level, changeValue}) )

	// Resolve button state

	// Recalculate character sheet

};

export default changeAbility;
