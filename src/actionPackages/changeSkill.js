import store from "../store/index";
import setSkill from "../actions/setSkill";
import resolveScreen from "../actions/resolveScreen";
import calculateSheet from "../actionPackages/calculateSheet";

const changeSkill = (skillName, skillType, value) => {

	// Change value in store
	store.dispatch( setSkill({ skillName, skillType, value}) )

	if (skillType === "combat") {
		// calculate all weapons
		calculateSheet({})
	}

	// Resolve screen
	store.dispatch( resolveScreen({ active: "screenSkills"}) )
};

export default changeSkill;
