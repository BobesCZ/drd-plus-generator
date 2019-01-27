import store from "../store/index";
import calculateAbilities from "../actions/calculateAbilities";
import calculateDerivedAbilities from "../actions/calculateDerivedAbilities";
import calculateCombatParameters from "../actions/calculateCombatParameters";
import addDebugBox from "../actions/addDebugBox";
import calculateWeapons from "../actions/calculateWeapons";
import getAbilities from "../calculations/getAbilities";
import getDerivedAbilities from "../calculations/getDerivedAbilities";
import getCombatParameters from "../calculations/getCombatParameters";

const calculateSheet = () => {

	// Calculate dependent parts of character sheet in logical order
	store.dispatch( calculateAbilities({}) )
	store.dispatch( calculateDerivedAbilities({}) )
	store.dispatch( calculateCombatParameters({}) )
	store.dispatch( calculateWeapons({}) )

	// Set debugBoxes - main abilities
	let state = store.getState();
	let charRace = state.getIn(["character", "info", "race"]);
	let charSex = state.getIn(["character", "info", "sex"]);
	let charClass = state.getIn(["character", "info", "class"]);
	let levels = state.getIn(["character", "levels"]);
	let finalAbilities =  getAbilities(charRace, charSex, charClass, levels, true);

	Object.keys(finalAbilities).forEach((key) => {
		store.dispatch( addDebugBox({id: key, content: finalAbilities[key]}) )
	})

	// Set debugBoxes - derived abilities
	var strength = state.getIn(["character", "abilities", "strength"]);
	var dexterity = state.getIn(["character", "abilities", "dexterity"]);
	var manualdexterity = state.getIn(["character", "abilities", "manualdexterity"]);
	var will = state.getIn(["character", "abilities", "will"]);
	var intelligence = state.getIn(["character", "abilities", "intelligence"]);
	var charisma = state.getIn(["character", "abilities", "charisma"]);

	var finalDerivedAbilities = getDerivedAbilities(charRace, strength, dexterity, manualdexterity, will, intelligence, charisma, true);

	Object.keys(finalDerivedAbilities).forEach((key) => {
		store.dispatch( addDebugBox({id: key, content: finalDerivedAbilities[key]}) )
	})

	// Set debugBoxes - combat parameters
	var resistance = state.getIn(["character", "derivedAbilities", "resistance"]);
	var finalCombatParameters = getCombatParameters(charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance, true)

	Object.keys(finalCombatParameters).forEach((key) => {
		store.dispatch( addDebugBox({id: key, content: finalCombatParameters[key]}) )
	})
};

export default calculateSheet;
