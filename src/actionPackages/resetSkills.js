import store from "../store/index";
import setSkillsPoints from "../actions/setSkillsPoints";
import resolveSkills from "../actions/resolveSkills";
import checkScreen from "../actionPackages/checkScreen";

const resetSkills = () => {

	// Reset available points
	store.dispatch( setSkillsPoints({}) )

	// Reset all points distributed by user
	store.dispatch( resolveSkills({}) )

	checkScreen("screenSkills")

};

export default resetSkills;
