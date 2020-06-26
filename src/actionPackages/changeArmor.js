import calculateSheet from '../actionPackages/calculateSheet';
import checkScreen from '../actionPackages/checkScreen';
import setArmor from '../actions/setArmor';
import store from '../store/index';

const changeArmor = (armorName, armorType) => {
  // Do action with weapon
  store.dispatch(setArmor({ armorName, armorType }));

  // calculate all weapons
  calculateSheet({});

  checkScreen('screenArmors');
};

export default changeArmor;
