import calculateSheet from '../actionPackages/calculateSheet';
import checkScreen from '../actionPackages/checkScreen';
import resetSkills from '../actionPackages/resetSkills';
import changeAbilityValue from '../actions/changeAbilityValue';
import resolveAbilityValues from '../actions/resolveAbilityValues';
import store from '../store/index';

// changeValue => number that will be added to current value (+1, -1)
const changeAbility = (ability, level, changeValue) => {
  // Change value in store
  store.dispatch(changeAbilityValue({ ability, level, changeValue }));

  // Resolve button state for this level
  store.dispatch(resolveAbilityValues({ level }));

  // Resolve button state for next level
  store.dispatch(resolveAbilityValues({ level: parseInt(level) + 1 }));

  // Recalculate character sheet
  calculateSheet();

  // Resolve screen
  checkScreen('screenAbilities');

  // Resolve table on screenSkills
  resetSkills();
};

export default changeAbility;
