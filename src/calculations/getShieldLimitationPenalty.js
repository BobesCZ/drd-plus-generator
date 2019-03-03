import { Map } from 'immutable';
import getShieldNameFromWeaponsObject from "../helpers/getShieldNameFromWeaponsObject";
import tables from "../data/tables";

const getShieldLimitationPenalty = (weaponStateObject, usingShieldLevel) => {

 if (
      Map.isMap(weaponStateObject) &&
      typeof usingShieldLevel === "number"
    )
  {
    let shieldLimitation = 0

    // Get shield from weaponStateObject
    let shieldName = getShieldNameFromWeaponsObject(weaponStateObject);
    // Get limitation from table of weapons
    if (shieldName) {
      shieldLimitation = tables.weapons.shields[shieldName]["length"]
    }

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
