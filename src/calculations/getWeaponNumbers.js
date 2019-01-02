import { Map } from 'immutable';
import getDamageNumberTableValue from "../helpers/getDamageNumberTableValue";
import tables from "../data/tables";

const getWeaponNumbers = (weaponName, weaponType, twohandedHold, skillDegree, combatSpeed, attack, defense, charStrength) => {

    if (
      weaponName.length &&
      weaponType.length &&
      typeof twohandedHold === "boolean" &&
      typeof skillDegree === "number" &&
      typeof combatSpeed === "number" &&
      typeof attack === "number" &&
      typeof defense === "number" &&
      typeof charStrength === "number"
    )
  {
    let results = Map({});
  	let weapon = tables.weapons[weaponType][weaponName];

    // Character hold onehaned weapon with two hands
    let twohandedCorrection = false

    if (weapon["hold"] === "onehanded" && twohandedHold === true) {
      twohandedCorrection = true
      results = results.set("hold", "twohanded")
    }
    else {
      results = results.set("hold", weapon["hold"])
    }

    // @SOURCE: Chybějící síla
    let missingStrength = parseInt(weapon["necessaryStrength"]) - charStrength
    if (missingStrength < 0 ) {
      missingStrength = 0
    }
    let missingStrengthCorrection = tables.missingStrengthOnWeapon[missingStrength]

    // @SOURCE: Chybějící dovednost (a erratované bonusové stupně pro Bojovníka)
    let missingSkillCorrection = tables.weaponSkillDegrees[skillDegree]

    // @SOURCE: Bojové číslo
    let combatSpeedNumber = combatSpeed + parseInt(weapon["length"]) + parseInt(missingStrengthCorrection["combatSpeedNumber"]);
    results = results.set("combatSpeedNumber", combatSpeedNumber)

    // @SOURCE: Útočné číslo
    let attackNumber = attack + parseInt(weapon["weaponAttack"]) + parseInt(missingStrengthCorrection["attackNumber"]) + parseInt(missingSkillCorrection["attackNumber"]);
    results = results.set("attackNumber", attackNumber)

    // @SOURCE: Základ zranění
    let damageTwohandedCorrection = twohandedCorrection ? 2 : 0
    let damageNumber = parseInt(getDamageNumberTableValue(charStrength, weapon["weaponDamage"])) + parseInt(missingStrengthCorrection["damageNumber"]) + parseInt(missingSkillCorrection["damageNumber"]) + damageTwohandedCorrection;
    results = results.set("damageNumber", damageNumber)

    // @SOURCE: Obranné číslo
    let defenseNumber = defense + parseInt(missingStrengthCorrection["defenseNumber"]);
    results = results.set("defenseNumber", defenseNumber)

    // @SOURCE: Kryt
    let cover = weapon["weaponCover"] + parseInt(missingSkillCorrection["cover"]);
    results = results.set("cover", cover)

    return results;
  }
  else {
    return false;
  }

};

export default getWeaponNumbers;
