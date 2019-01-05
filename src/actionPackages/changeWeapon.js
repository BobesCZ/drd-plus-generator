import store from "../store/index";
import addWeapon from "../actions/addWeapon";
import calculateWeapons from "../actions/calculateWeapons";

const changeWeapon = (weaponName, weaponType, action) => {

	// Change value in store
	if (action === "ADD") {
		store.dispatch( addWeapon({ weaponName, weaponType}) )
	}
	else if (action === "REMOVE") {
		// store.dispatch( removeWeapon({ weaponName, weaponType}) )
	}

	// Resolve screen
	store.dispatch( calculateWeapons({}) )
};

export default changeWeapon;
