import store from "../store/index";
import setSkillsPoints from "../actions/setSkillsPoints";
import resolveSkills from "../actions/resolveSkills";
import resolveScreen from "../actions/resolveScreen";

const resetSkills = () => {

	// Reset available points
	store.dispatch( setSkillsPoints({}) )

	// Reset all points distributed by user
	store.dispatch( resolveSkills({}) )

	store.dispatch( resolveScreen({ active: "screenSkills"}) )

};

export default resetSkills;
