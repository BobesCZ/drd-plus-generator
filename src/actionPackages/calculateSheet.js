import { Map, OrderedMap } from 'immutable';
import addDebugBox from '../actions/addDebugBox';
import calculateAbilities from '../actions/calculateAbilities';
import calculateCombatParameters from '../actions/calculateCombatParameters';
import calculateDerivedAbilities from '../actions/calculateDerivedAbilities';
import calculateWeapons from '../actions/calculateWeapons';
import getAbilities from '../calculations/getAbilities';
import getCombatParameters from '../calculations/getCombatParameters';
import getDerivedAbilities from '../calculations/getDerivedAbilities';
import getWeaponNumbers from '../calculations/getWeaponNumbers';
import store from '../store/index';

const calculateSheet = () => {
  // Calculate dependent parts of character sheet in logical order
  store.dispatch(calculateAbilities({}));
  store.dispatch(calculateDerivedAbilities({}));
  store.dispatch(calculateCombatParameters({}));
  store.dispatch(calculateWeapons({}));

  // Set debugBoxes - main abilities
  const state = store.getState();
  const charRace = state.getIn(['character', 'info', 'race']);
  const charSex = state.getIn(['character', 'info', 'sex']);
  const charClass = state.getIn(['character', 'info', 'class']);
  const levels = state.getIn(['character', 'levels']);
  const bodyArmorsNecessaryStrength = state.getIn(['character', 'armors', 'bodyArmors', 'necessaryStrength']);
  const helmetsNecessaryStrength = state.getIn(['character', 'armors', 'helmets', 'necessaryStrength']);
  const finalAbilities = getAbilities(charRace, charSex, charClass, levels, bodyArmorsNecessaryStrength, helmetsNecessaryStrength, true);

  Object.keys(finalAbilities).forEach((key) => {
    store.dispatch(addDebugBox({ id: key, content: finalAbilities[key] }));
  });

  // Set debugBoxes - derived abilities
  const strength = state.getIn(['character', 'abilities', 'strength']);
  const dexterity = state.getIn(['character', 'abilities', 'dexterity']);
  const manualdexterity = state.getIn(['character', 'abilities', 'manualdexterity']);
  const will = state.getIn(['character', 'abilities', 'will']);
  const intelligence = state.getIn(['character', 'abilities', 'intelligence']);
  const charisma = state.getIn(['character', 'abilities', 'charisma']);

  const finalDerivedAbilities = getDerivedAbilities(charRace, strength, dexterity, manualdexterity, will, intelligence, charisma, true);

  Object.keys(finalDerivedAbilities).forEach((key) => {
    store.dispatch(addDebugBox({ id: key, content: finalDerivedAbilities[key] }));
  });

  // Set debugBoxes - combat parameters
  const resistance = state.getIn(['character', 'derivedAbilities', 'resistance']);
  // let bodyArmorsNecessaryStrength = state.getIn(["character", "armors", "bodyArmors", "necessaryStrength"])
  const bodyArmorsLimitation = state.getIn(['character', 'armors', 'bodyArmors', 'limitation']);
  // let helmetsNecessaryStrength = state.getIn(["character", "armors", "helmets", "necessaryStrength"])
  const helmetsLimitation = state.getIn(['character', 'armors', 'helmets', 'limitation']);
  const wearingArmorLevel = state.getIn(['character', 'skills', 'distributed', 'combat', 'wearingArmor']);

  let weaponStateObject = state.getIn(['character', 'weapons']);
  const usingShieldLevel = state.getIn(['character', 'skills', 'distributed', 'combat', 'usingShield']);
  const finalCombatParameters = getCombatParameters(charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance, bodyArmorsLimitation, helmetsLimitation, wearingArmorLevel, weaponStateObject, usingShieldLevel, true);

  Object.keys(finalCombatParameters).forEach((key) => {
    store.dispatch(addDebugBox({ id: key, content: finalCombatParameters[key] }));
  });

  // Set debugBoxes - weapon numbers
  weaponStateObject = state.getIn(['character', 'weapons']);
  const combatSpeed = state.getIn(['character', 'combatParameters', 'combatSpeed']);
  const attack = state.getIn(['character', 'combatParameters', 'attack']);
  const defense = state.getIn(['character', 'combatParameters', 'defense']);
  const charStrength = state.getIn(['character', 'abilities', 'strength']);

  // Iterate through weapon names
  weaponStateObject.mapKeys((weaponName) => {
    // Twohanded weapon may be added automatically
    const oneHold = weaponStateObject.getIn([weaponName, 'onehanded']);
    const twoHold = weaponStateObject.getIn([weaponName, 'twohanded']);
    const twohandedHoldIsAutomatic = Map.isMap(oneHold) && Map.isMap(twoHold);

    // Iterate through weapon holds
    weaponStateObject.get(weaponName).mapKeys((weaponHold) => {
      const weaponType = weaponStateObject.getIn([weaponName, weaponHold, 'weaponType']);
      let skillDegree = state.getIn(['character', 'skills', 'distributed', 'combat', weaponType]);

      if (weaponType === 'shields') {
        skillDegree = state.getIn(['character', 'skills', 'distributed', 'combat', 'usingShield']);
      }

      // Returns Map with weapon numbers
      const weaponHoldBool = weaponHold === 'twohanded' && twohandedHoldIsAutomatic;
      const weaponObject = getWeaponNumbers(weaponName, weaponType, weaponHoldBool, skillDegree, combatSpeed, attack, defense, charStrength, true);

      Object.keys(weaponObject).forEach((number) => {
        const key = `${weaponName}_${weaponHold}_${number}`;
        if (OrderedMap.isOrderedMap(weaponObject[number])) {
          store.dispatch(addDebugBox({ id: key, content: weaponObject[number] }));
        }
      });
    });
  });
};

export default calculateSheet;
