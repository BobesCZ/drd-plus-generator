import store from "../store/index";
import { Map, OrderedMap } from 'immutable';
import calculateAbilities from "../actions/calculateAbilities";
import calculateDerivedAbilities from "../actions/calculateDerivedAbilities";
import calculateCombatParameters from "../actions/calculateCombatParameters";
import addDebugBox from "../actions/addDebugBox";
import calculateWeapons from "../actions/calculateWeapons";
import getAbilities from "../calculations/getAbilities";
import getDerivedAbilities from "../calculations/getDerivedAbilities";
import getCombatParameters from "../calculations/getCombatParameters";
import getWeaponNumbers from "../calculations/getWeaponNumbers";

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
	let bodyArmorsNecessaryStrength = state.getIn(["character", "armors", "bodyArmors", "necessaryStrength"]);
    let helmetsNecessaryStrength = state.getIn(["character", "armors", "helmets", "necessaryStrength"]);
	let finalAbilities =  getAbilities(charRace, charSex, charClass, levels, bodyArmorsNecessaryStrength, helmetsNecessaryStrength, true);

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
    // var bodyArmorsNecessaryStrength = state.getIn(["character", "armors", "bodyArmors", "necessaryStrength"])
    var bodyArmorsLimitation = state.getIn(["character", "armors", "bodyArmors", "limitation"])
    // var helmetsNecessaryStrength = state.getIn(["character", "armors", "helmets", "necessaryStrength"])
    var helmetsLimitation = state.getIn(["character", "armors", "helmets", "limitation"])
    var wearingArmorLevel = state.getIn(["character", "skills", "distributed", "combat", "wearingArmor"])

	var weaponStateObject = state.getIn(["character", "weapons"]);
    var usingShieldLevel = state.getIn(["character", "skills", "distributed", "combat", "usingShield"])
	var finalCombatParameters = getCombatParameters(charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance, bodyArmorsLimitation, helmetsLimitation, wearingArmorLevel, weaponStateObject, usingShieldLevel, true)

	Object.keys(finalCombatParameters).forEach((key) => {
		store.dispatch( addDebugBox({id: key, content: finalCombatParameters[key]}) )
	})

	// Set debugBoxes - weapon numbers
	var weaponStateObject = state.getIn(["character", "weapons"])
    var combatSpeed = state.getIn(["character", "combatParameters", "combatSpeed"])
    var attack = state.getIn(["character", "combatParameters", "attack"])
    var defense = state.getIn(["character", "combatParameters", "defense"])
    var charStrength = state.getIn(["character", "abilities", "strength"])

    // Iterate through weapon names
    weaponStateObject.mapKeys((weaponName) => {
		// Twohanded weapon may be added automatically
		let oneHold = weaponStateObject.getIn([weaponName, "onehanded"])
		let twoHold = weaponStateObject.getIn([weaponName, "twohanded"])
		let twohandedHoldIsAutomatic = Map.isMap(oneHold) && Map.isMap(twoHold)

		// Iterate through weapon holds
		weaponStateObject.get(weaponName).mapKeys((weaponHold) => {
		var weaponType = weaponStateObject.getIn([weaponName, weaponHold, "weaponType"])
		var skillDegree = state.getIn(["character", "skills", "distributed", "combat", weaponType])

		if (weaponType === "shields") {
			skillDegree = state.getIn(["character", "skills", "distributed", "combat", "usingShield"])
		}

		// Returns Map with weapon numbers
		var weaponHoldBool = weaponHold === "twohanded" && twohandedHoldIsAutomatic
		var weaponObject = getWeaponNumbers(weaponName, weaponType, weaponHoldBool, skillDegree, combatSpeed, attack, defense, charStrength, true)

		Object.keys(weaponObject).forEach((number) => {
			let key = `${weaponName}_${weaponHold}_${number}`
			if ( OrderedMap.isOrderedMap(weaponObject[number]) ) {
				store.dispatch( addDebugBox({id: key, content: weaponObject[number]}) )
			}
		})
      })
    })
};

export default calculateSheet;
