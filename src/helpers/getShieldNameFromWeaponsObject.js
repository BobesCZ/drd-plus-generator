import { Map } from 'immutable';

const getShieldNameFromWeaponsObject = (weaponStateObject) => {

  if (Map.isMap(weaponStateObject)) {
  	let result = false;

  	weaponStateObject.keySeq().forEach(weaponName => {
      let weaponType = weaponStateObject.getIn([weaponName, "onehanded", "weaponType"])
      if (weaponType === "shields") {
        result = weaponName
      }
    })

    return result
  }
  else {
    return false;
  }

};

export default getShieldNameFromWeaponsObject;
