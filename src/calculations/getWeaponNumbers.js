import { Map, OrderedMap } from 'immutable';
import tables from '../data/tables';
import getDamageNumberTableValue from '../helpers/getDamageNumberTableValue';

const getWeaponNumbers = (weaponName, weaponType, twohandedHold, skillDegree, combatSpeed, attack, defense, charStrength, returnDebugBox = false) => {
  if (
    weaponName.length &&
      weaponType.length &&
      typeof twohandedHold === 'boolean' &&
      typeof skillDegree === 'number' &&
      typeof combatSpeed === 'number' &&
      typeof attack === 'number' &&
      typeof defense === 'number' &&
      typeof charStrength === 'number'
  ) {
    let results = Map({});
    const debugBox = {};
    const weapon = tables.weapons[weaponType][weaponName];

    // Add info about weaponType
    results = results.set('weaponName', weaponName);
    results = results.set('weaponType', weaponType);

    // Character hold onehaned weapon with two hands
    let twohandedCorrection = false;

    if (weapon.hold === 'onehanded' && twohandedHold === true) {
      twohandedCorrection = true;
      results = results.set('hold', 'twohanded');
      debugBox.hold = 'twohanded';
    }
    else {
      results = results.set('hold', weapon.hold);
      debugBox.hold = weapon.hold;
    }

    // @SOURCE: Chybějící síla
    const missingStrengthTwohandedCorrection = twohandedCorrection ? 2 : 0;
    let missingStrength = parseInt(weapon.necessaryStrength) - charStrength - missingStrengthTwohandedCorrection;
    if (missingStrength < 0) {
      missingStrength = 0;
    }
    if (missingStrength > 11) {
      missingStrength = 11;
    }
    const missingStrengthCorrection = tables.missingStrengthOnWeapon[missingStrength];

    // @SOURCE: Chybějící dovednost (a erratované bonusové stupně pro Bojovníka)
    const missingSkillCorrection = tables.weaponSkillDegrees[skillDegree];

    // @SOURCE: Bojové číslo
    // For shields, length means Limitation, so for combar parameters treat it as 0
    if (weaponType === 'shields') {
      weapon.length = 0;
    }
    const combatSpeedNumber = combatSpeed + parseInt(weapon.length) + parseInt(missingStrengthCorrection.combatSpeedNumber);
    results = results.set('combatSpeedNumber', combatSpeedNumber);
    let debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('combatSpeed', combatSpeed);
    debugBoxObject = debugBoxObject.set('weaponLength', parseInt(weapon.length));
    debugBoxObject = debugBoxObject.set('missingStrengthCorrection', parseInt(missingStrengthCorrection.combatSpeedNumber));
    debugBoxObject = debugBoxObject.set('total', combatSpeedNumber);
    debugBox.combatSpeedNumber = debugBoxObject;

    // @SOURCE: Útočné číslo
    const attackNumber = attack + parseInt(weapon.weaponAttack) + parseInt(missingStrengthCorrection.attackNumber) + parseInt(missingSkillCorrection.attackNumber);
    results = results.set('attackNumber', attackNumber);
    debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('attack', attack);
    debugBoxObject = debugBoxObject.set('weaponAttack', parseInt(weapon.weaponAttack));
    debugBoxObject = debugBoxObject.set('missingStrengthCorrection', parseInt(missingStrengthCorrection.attackNumber));
    debugBoxObject = debugBoxObject.set('missingSkillCorrection', parseInt(missingSkillCorrection.attackNumber));
    debugBoxObject = debugBoxObject.set('total', attackNumber);
    debugBox.attackNumber = debugBoxObject;

    // @SOURCE: Základ zranění
    const damageTwohandedCorrection = twohandedCorrection ? 2 : 0;
    const damageNumber = parseInt(getDamageNumberTableValue(charStrength, weapon.weaponDamage)) + parseInt(missingStrengthCorrection.damageNumber) + parseInt(missingSkillCorrection.damageNumber) + damageTwohandedCorrection;
    results = results.set('damageNumber', damageNumber);
    debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('damageNumberFromTable', parseInt(getDamageNumberTableValue(charStrength, weapon.weaponDamage)));
    debugBoxObject = debugBoxObject.set('missingStrengthCorrection', parseInt(missingStrengthCorrection.damageNumber));
    debugBoxObject = debugBoxObject.set('missingSkillCorrection', parseInt(missingSkillCorrection.damageNumber));
    debugBoxObject = debugBoxObject.set('twohandedCorrection', damageTwohandedCorrection);
    debugBoxObject = debugBoxObject.set('total', damageNumber);
    debugBox.damageNumber = debugBoxObject;

    // @SOURCE: Obranné číslo
    const defenseNumber = defense + parseInt(missingStrengthCorrection.defenseNumber);
    results = results.set('defenseNumber', defenseNumber);
    debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('defense', defense);
    debugBoxObject = debugBoxObject.set('missingStrengthCorrection', parseInt(missingStrengthCorrection.defenseNumber));
    debugBoxObject = debugBoxObject.set('total', defenseNumber);
    debugBox.defenseNumber = debugBoxObject;

    // @SOURCE: Kryt
    const cover = parseInt(weapon.weaponCover) + parseInt(missingSkillCorrection.cover);
    results = results.set('cover', cover);
    debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('weaponCover', parseInt(weapon.weaponCover));
    debugBoxObject = debugBoxObject.set('missingSkillCorrection', parseInt(missingSkillCorrection.cover));
    debugBoxObject = debugBoxObject.set('total', cover);
    debugBox.cover = debugBoxObject;

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

export default getWeaponNumbers;
