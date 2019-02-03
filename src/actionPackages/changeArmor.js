import store from "../store/index";
import setArmor from "../actions/setArmor";
// import resolveScreen from "../actions/resolveScreen";
// import calculateSheet from "../actionPackages/calculateSheet";

const changeArmor = (armorName, armorType) => {

	// Do action with weapon
	store.dispatch( setArmor({ armorName, armorType}) )

	// calculate all weapons
	// calculateSheet({})

	// store.dispatch( resolveScreen({ active: "screenWeapons"}) )
};

export default changeArmor;
