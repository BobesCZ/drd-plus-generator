import store from "../store/index";
import calculateAbilities from "../actions/calculateAbilities";
import calculateDerivedAbilities from "../actions/calculateDerivedAbilities";
import calculateCombatParameters from "../actions/calculateCombatParameters";
import addDebugBox from "../actions/addDebugBox";
import getAbilities from "../calculations/getAbilities";
import getDerivedAbilities from "../calculations/getDerivedAbilities";

const calculateSheet = () => {

	// Calculate dependent parts of character sheet in logical order
	store.dispatch( calculateAbilities({}) )
	store.dispatch( calculateDerivedAbilities({}) )
	store.dispatch( calculateCombatParameters({}) )

	// Set debugBoxes
	let state = store.getState();
	let charRace = state.getIn(["character", "info", "race"]);
	let charSex = state.getIn(["character", "info", "sex"]);
	let charClass = state.getIn(["character", "info", "class"]);
	let levels = state.getIn(["character", "levels"]);
 	let finalAbilities =  getAbilities(charRace, charSex, charClass, levels, true);

 	Object.keys(finalAbilities).forEach((key) => {
	    store.dispatch( addDebugBox({id: key, content: finalAbilities[key]}) )
 	})

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

};

export default calculateSheet;
