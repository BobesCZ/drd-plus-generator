import checkScreen from '../actionPackages/checkScreen';
import resolveSkills from '../actions/resolveSkills';
import setSkillsPoints from '../actions/setSkillsPoints';
import store from '../store/index';

const resetSkills = () => {
  // Reset available points
  store.dispatch(setSkillsPoints({}));

  // Reset all points distributed by user
  store.dispatch(resolveSkills({}));

  checkScreen('screenSkills');
};

export default resetSkills;
