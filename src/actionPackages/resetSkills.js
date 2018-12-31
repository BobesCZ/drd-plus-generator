import store from "../store/index";
import setSkillsPoints from "../actions/setSkillsPoints";
import resolveSkills from "../actions/resolveSkills";

const resetSkills = () => {

	// Reset available points
	store.dispatch( setSkillsPoints({}) )

	// Reset all points distributed by user
	store.dispatch( resolveSkills({}) )

};

export default resetSkills;