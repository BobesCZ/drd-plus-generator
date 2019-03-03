import { Map } from 'immutable';
import tables from "../data/tables";

const getShieldLimitationPenalty = (weaponStateObject, usingShieldLevel) => {

 if (
      Map.isMap(weaponStateObject) &&
      typeof usingShieldLevel === "number"
    )
  {
    let shieldLimitation = 0

    // Get shield from weaponStateObject
    weaponStateObject.keySeq().forEach(weaponName => {
      let weaponType = weaponStateObject.getIn([weaponName, "onehanded", "weaponType"])
      if (weaponType === "shields") {
        // Get limitation from table of weapons
        shieldLimitation = tables.weapons.shields[weaponName]["length"]
      }
    })

    // Count shield limitation and add (positive) correction
    let limitationCount = shieldLimitation + usingShieldLevel;

    // Limitation is always negative number, maximum is 0
    if (limitationCount > 0 ) {
      limitationCount = 0
    }

    return limitationCount;
  }
  else {
    return false;
  }

};

export default getShieldLimitationPenalty;
