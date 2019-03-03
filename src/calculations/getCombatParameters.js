import tables from "../data/tables";
import getArmorsLimitationPenalty from "../calculations/getArmorsLimitationPenalty";
import getShieldLimitationPenalty from "../calculations/getShieldLimitationPenalty";
import getDamageTableValue from "../helpers/getDamageTableValue";
import { Map, OrderedMap } from 'immutable';

const getCombatParameters = (charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance, bodyArmorsLimitation, helmetsLimitation, wearingArmorLevel, weaponStateObject, usingShieldLevel, returnDebugBox = false) => {

 if (
      charRace.length &&
      charClass.length &&
      typeof dexterity === "number" &&
      typeof manualdexterity === "number" &&
      typeof intelligence === "number" &&
      typeof charisma === "number" &&
      typeof resistance === "number" &&
      typeof bodyArmorsLimitation === "number" &&
      typeof helmetsLimitation === "number" &&
      typeof wearingArmorLevel === "number" &&
      Map.isMap(weaponStateObject) &&
      typeof usingShieldLevel === "number"
    )
  {
    let results = [];
    let debugBox = {};

    // @SOURCE: Tabulka boje
    let combatSpeed = 0;

    switch (charClass) {
      case "warrior":
        combatSpeed = parseInt(dexterity);
        break;

      case "sorcerer":
        combatSpeed = Math.round((intelligence + dexterity) / 2);
        break;

      case "rogue":
        combatSpeed = Math.round((manualdexterity + dexterity) / 2);
        break;

      case "ranger":
        combatSpeed = Math.round((manualdexterity + dexterity) / 2);
        break;

      case "theurge":
        combatSpeed = Math.round((intelligence + dexterity) / 2);
        break;

      case "cleric":
        combatSpeed = Math.round((charisma + dexterity) / 2);
        break;
    }

    let combatSpeedRaceCorrection = tables.derivedAbilities[charRace]["combatSpeed"]
    // Calculate Armor penalty for combatSpeed
    let armorLimitation = getArmorsLimitationPenalty(bodyArmorsLimitation, helmetsLimitation, wearingArmorLevel)
    let shieldLimitation = getShieldLimitationPenalty(weaponStateObject, usingShieldLevel)
    results["combatSpeed"] = combatSpeed + parseInt(combatSpeedRaceCorrection) + parseInt(armorLimitation) + parseInt(shieldLimitation);
    var debugBoxObject = OrderedMap()
    debugBoxObject = debugBoxObject.set("derivedAbilitiesBase", combatSpeed)
    debugBoxObject = debugBoxObject.set("raceCorrection", parseInt(combatSpeedRaceCorrection))
    debugBoxObject = debugBoxObject.set("armorLimitation", parseInt(armorLimitation))
    debugBoxObject = debugBoxObject.set("shieldLimitation", parseInt(shieldLimitation))
    debugBoxObject = debugBoxObject.set("total", parseInt(results["combatSpeed"]))
    debugBox["combatSpeed"] = debugBoxObject

    // @SOURCE: Tabulka bojových charakteristik
    results["attack"] = Math.floor(dexterity / 2);
    var debugBoxObject = OrderedMap()
    debugBoxObject = debugBoxObject.set("derivedAbilitiesBase", results["attack"])
    debugBoxObject = debugBoxObject.set("total", parseInt(results["attack"]))
    debugBox["attack"] = debugBoxObject

    results["shoot"] = Math.round(dexterity / 2);
    var debugBoxObject = OrderedMap()
    debugBoxObject = debugBoxObject.set("derivedAbilitiesBase", results["shoot"])
    debugBoxObject = debugBoxObject.set("total", parseInt(results["shoot"]))
    debugBox["shoot"] = debugBoxObject

    results["defense"] = Math.floor(manualdexterity / 2);
    var debugBoxObject = OrderedMap()
    debugBoxObject = debugBoxObject.set("derivedAbilitiesBase", results["defense"])
    debugBoxObject = debugBoxObject.set("total", parseInt(results["defense"]))
    debugBox["defense"] = debugBoxObject

    // @SOURCE: Tabulka Meze zranění a únavy
    let healthNumber = resistance + 10;
    results["health"] = getDamageTableValue(healthNumber);

    if (returnDebugBox) {
      return debugBox;
    }
    else {
      return results;
    }
  }
  else {
    return false;
  }

};

export default getCombatParameters;
