import store from "../store/index";
import setSkill from "../actions/setSkill";
import calculateWeapons from "../actions/calculateWeapons";
import resolveScreen from "../actions/resolveScreen";

const changeSkill = (skillName, skillType, value) => {

	// Change value in store
	store.dispatch( setSkill({ skillName, skillType, value}) )

	if (skillType === "combat") {
		// calculate all weapons
		store.dispatch( calculateWeapons({}) )
	}

	// Resolve screen
	store.dispatch( resolveScreen({ active: "screenSkills"}) )
};

export default changeSkill;
