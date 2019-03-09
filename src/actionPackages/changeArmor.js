import store from "../store/index";
import setArmor from "../actions/setArmor";
import checkScreen from "../actionPackages/checkScreen";
import calculateSheet from "../actionPackages/calculateSheet";

const changeArmor = (armorName, armorType) => {

	// Do action with weapon
	store.dispatch( setArmor({ armorName, armorType}) )

	// calculate all weapons
	calculateSheet({})

	checkScreen("screenArmors")
};

export default changeArmor;
