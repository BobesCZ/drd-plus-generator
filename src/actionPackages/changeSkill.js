import calculateSheet from '../actionPackages/calculateSheet';
import checkScreen from '../actionPackages/checkScreen';
import setSkill from '../actions/setSkill';
import store from '../store/index';

const changeSkill = (skillName, skillType, value) => {
  // Change value in store
  store.dispatch(setSkill({ skillName, skillType, value }));

  if (skillType === 'combat') {
    // calculate all weapons
    calculateSheet({});
  }

  // Resolve screen
  checkScreen('screenSkills');
};

export default changeSkill;
