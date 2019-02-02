import store from "../store/index";
import addWeapon from "../actions/addWeapon";
import removeWeapon from "../actions/removeWeapon";
import resolveScreen from "../actions/resolveScreen";
import calculateSheet from "../actionPackages/calculateSheet";

const changeWeapon = (weaponName, weaponType, action) => {

	// Do action with weapon
	if (action === "ADD") {
		store.dispatch( addWeapon({ weaponName, weaponType}) )
	}
	else if (action === "REMOVE") {
		store.dispatch( removeWeapon({weaponName}) )
	}

	// calculate all weapons
	calculateSheet({})

	store.dispatch( resolveScreen({ active: "screenWeapons"}) )
};

export default changeWeapon;
