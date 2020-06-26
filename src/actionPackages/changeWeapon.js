import calculateSheet from '../actionPackages/calculateSheet';
import checkScreen from '../actionPackages/checkScreen';
import addWeapon from '../actions/addWeapon';
import removeWeapon from '../actions/removeWeapon';
import store from '../store/index';

const changeWeapon = (weaponName, weaponType, action) => {
  // Do action with weapon
  if (action === 'ADD') {
    store.dispatch(addWeapon({ weaponName, weaponType }));
  }
  else if (action === 'REMOVE') {
    store.dispatch(removeWeapon({ weaponName }));
  }

  // calculate all weapons
  calculateSheet({});

  checkScreen('screenWeapons');
};

export default changeWeapon;
