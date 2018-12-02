import tables from "../data/tables";

// Uses values dependent on character class to decide if its main ability
const isAbilityMain = (charClass, ability) => {

	if (
		charClass.length &&
		ability.length
		)
	 {
	 	let abilityClassValue = tables.abilities.class[charClass][ability];

		// Suppose that main ability = 1 and derived ability = 0
	 	if (abilityClassValue) {
			return true;
	 	}
	}

	return false;
};

export default isAbilityMain;
