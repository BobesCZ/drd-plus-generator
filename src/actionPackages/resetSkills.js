import store from "../store/index";
import setSkillsPoints from "../actions/setSkillsPoints";
import changeSkill from "../actionPackages/changeSkill";

const resetSkills = () => {

	// Reset available points
	store.dispatch( setSkillsPoints({}) )

	// Reset all points distributed by user
	let state = store.getState();
    let skills = state.getIn(["character", "skills", "distributed"])

	skills.keySeq().forEach((skillType) => {
    	skills.get(skillType).keySeq().forEach((skillName) => {
			changeSkill(skillName, skillType, 0)
		})
    })
};

export default resetSkills;
