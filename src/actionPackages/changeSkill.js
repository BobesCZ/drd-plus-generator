import store from "../store/index";
import setSkill from "../actions/setSkill";
import resolveScreen from "../actions/resolveScreen";

const changeSkill = (skillName, skillType, value) => {

	// Change value in store
	store.dispatch( setSkill({ skillName, skillType, value}) )

	// Resolve screen
	store.dispatch( resolveScreen({ active: "screenSkills"}) )
};

export default changeSkill;
