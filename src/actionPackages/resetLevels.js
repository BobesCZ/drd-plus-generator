import calculateSheet from '../actionPackages/calculateSheet';
import checkScreen from '../actionPackages/checkScreen';
import resetSkills from '../actionPackages/resetSkills';
import resolveLevels from '../actions/resolveLevels';
import store from '../store/index';

const resetLevels = () => {
  // Always dispatch calculateSheet after resolveLevels
  store.dispatch(resolveLevels({}));
  resetSkills();
  calculateSheet();

  checkScreen('screenAbilities');
  checkScreen('screenBackground');
  checkScreen('screenCharacter');
};

export default resetLevels;
