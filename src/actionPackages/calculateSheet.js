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
  let strength = state.getIn(['character', 'abilities', 'strength']);
  let dexterity = state.getIn(['character', 'abilities', 'dexterity']);
  let manualdexterity = state.getIn(['character', 'abilities', 'manualdexterity']);
  let will = state.getIn(['character', 'abilities', 'will']);
  let intelligence = state.getIn(['character', 'abilities', 'intelligence']);
  let charisma = state.getIn(['character', 'abilities', 'charisma']);

  let finalDerivedAbilities = getDerivedAbilities(charRace, strength, dexterity, manualdexterity, will, intelligence, charisma, true);

  Object.keys(finalDerivedAbilities).forEach((key) => {
    store.dispatch(addDebugBox({ id: key, content: finalDerivedAbilities[key] }));
  });

  // Set debugBoxes - combat parameters
  let resistance = state.getIn(['character', 'derivedAbilities', 'resistance']);
  // let bodyArmorsNecessaryStrength = state.getIn(["character", "armors", "bodyArmors", "necessaryStrength"])
  let bodyArmorsLimitation = state.getIn(['character', 'armors', 'bodyArmors', 'limitation']);
  // let helmetsNecessaryStrength = state.getIn(["character", "armors", "helmets", "necessaryStrength"])
  let helmetsLimitation = state.getIn(['character', 'armors', 'helmets', 'limitation']);
  let wearingArmorLevel = state.getIn(['character', 'skills', 'distributed', 'combat', 'wearingArmor']);

  let weaponStateObject = state.getIn(['character', 'weapons']);
  let usingShieldLevel = state.getIn(['character', 'skills', 'distributed', 'combat', 'usingShield']);
  let finalCombatParameters = getCombatParameters(charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance, bodyArmorsLimitation, helmetsLimitation, wearingArmorLevel, weaponStateObject, usingShieldLevel, true);

  Object.keys(finalCombatParameters).forEach((key) => {
    store.dispatch(addDebugBox({ id: key, content: finalCombatParameters[key] }));
  });

  // Set debugBoxes - weapon numbers
  let weaponStateObject = state.getIn(['character', 'weapons']);
  let combatSpeed = state.getIn(['character', 'combatParameters', 'combatSpeed']);
  let attack = state.getIn(['character', 'combatParameters', 'attack']);
  let defense = state.getIn(['character', 'combatParameters', 'defense']);
  let charStrength = state.getIn(['character', 'abilities', 'strength']);

  // Iterate through weapon names
  weaponStateObject.mapKeys((weaponName) => {
    // Twohanded weapon may be added automatically
    const oneHold = weaponStateObject.getIn([weaponName, 'onehanded']);
    const twoHold = weaponStateObject.getIn([weaponName, 'twohanded']);
    const twohandedHoldIsAutomatic = Map.isMap(oneHold) && Map.isMap(twoHold);

    // Iterate through weapon holds
    weaponStateObject.get(weaponName).mapKeys((weaponHold) => {
      let weaponType = weaponStateObject.getIn([weaponName, weaponHold, 'weaponType']);
      let skillDegree = state.getIn(['character', 'skills', 'distributed', 'combat', weaponType]);

      if (weaponType === 'shields') {
        skillDegree = state.getIn(['character', 'skills', 'distributed', 'combat', 'usingShield']);
      }

      // Returns Map with weapon numbers
      let weaponHoldBool = weaponHold === 'twohanded' && twohandedHoldIsAutomatic;
      let weaponObject = getWeaponNumbers(weaponName, weaponType, weaponHoldBool, skillDegree, combatSpeed, attack, defense, charStrength, true);

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
