import { Map, OrderedMap } from 'immutable';
import getAbilities from '../calculations/getAbilities';
import getBackgroundSkillsPoints from '../calculations/getBackgroundSkillsPoints';
import getCombatParameters from '../calculations/getCombatParameters';
import getDerivedAbilities from '../calculations/getDerivedAbilities';
import getLevelingSkillsPoints from '../calculations/getLevelingSkillsPoints';
import getOrderedSkills from '../calculations/getOrderedSkills';
import getWeaponNumbers from '../calculations/getWeaponNumbers';
import isAbilityOnRaceLimit from '../calculations/isAbilityOnRaceLimit';
import tables from '../data/tables';
import createLevelsState from '../helpers/createLevelsState';
import isAbilityLeveled from '../helpers/isAbilityLeveled';
import isAbilityMain from '../helpers/isAbilityMain';
import isTextInputFilled from '../helpers/isTextInputFilled';
import translations from '../translations';
import initialState from './initialState';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_INFO': {
      const key = action.payload.key;
      return state.setIn(['character', 'info', key], action.payload.value);
    }

    case 'CHANGE_SCREEN': {
      const active = action.payload.active;
      return state.set('activeScreen', active);
    }

    case 'SET_SCREEN': {
      const screen = action.payload.screen;
      const value = action.payload.value;

      if (screen.length && typeof value === 'number') {
        return state.setIn(['screens', screen], value);
      }
      else {
        return state;
      }
    }

    case 'AUTOFILL_SCREEN': {
      const screen = action.payload.screen;

      if (screen === 'screenCharacter') {
        // Autofill screen no. 1
        const nameField = state.getIn(['character', 'info', 'name']);

        if (!isTextInputFilled(nameField)) {
          // Set initial name to Random peasant
          const nameValue = translations['default-name'] + Math.floor(Math.random() * 100);
          return state.setIn(['character', 'info', 'name'], nameValue);
        }
      }
      else if (screen === 'screenBackground') {
        // Autofill screen no. 2
        // Set background to choice no. 1
        const totalPoints = tables.background.goodAbility.totalPoints;

        const distributeArray = {};
        if (state.getIn(['errata', 'backgroundPointsHasNoRangeLimit'])) {
          // Apply errata => all points to skills
          distributeArray.origin = 0;
          distributeArray.property = 0;
          distributeArray.skills = 5;
        }
        else {
          distributeArray.origin = 1;
          distributeArray.property = 0;
          distributeArray.skills = 4;
        }

        return state.setIn(['character', 'background', 'name'], 'goodAbility')
          .setIn(['character', 'background', 'total'], totalPoints)
          .setIn(['character', 'background', 'distributed', 'origin'], parseInt(distributeArray.origin))
          .setIn(['character', 'background', 'distributed', 'property'], parseInt(distributeArray.property))
          .setIn(['character', 'background', 'distributed', 'skills'], parseInt(distributeArray.skills));
      }

      return state;
    }

    case 'SET_BACKGROUND': {
      const name = action.payload.name;

      if (name.length) {
        const totalPoints = tables.background[name].totalPoints;

        // Set background name and total points (from tables)
        return state.setIn(['character', 'background', 'total'], totalPoints)
          .setIn(['character', 'background', 'name'], name)
          .setIn(['character', 'background', 'distributed', 'origin'], '')
          .setIn(['character', 'background', 'distributed', 'property'], '')
          .setIn(['character', 'background', 'distributed', 'skills'], '');
      }
      else {
        // Reset background name and total points
        return state.setIn(['character', 'background', 'total'], '')
          .setIn(['character', 'background', 'name'], '')
          .setIn(['character', 'background', 'distributed', 'origin'], '')
          .setIn(['character', 'background', 'distributed', 'property'], '')
          .setIn(['character', 'background', 'distributed', 'skills'], '');
      }
    }

    case 'DISTRIBUTE_BACKGROUND': {
      const key = action.payload.key;
      const value = action.payload.value;

      if (key.length && value.length) {
        // Set background points
        return state.setIn(['character', 'background', 'distributed', key], parseInt(value));
      }
      else {
        return state;
      }
    }

    case 'RESOLVE_BACKGROUND': {
      let rangeLimit = false;

      if (state.getIn(['errata', 'backgroundPointsHasNoRangeLimit'])) {
        // Apply errata => rangeLimit always true (no limitation)
        rangeLimit = true;
      }
      else {
        // Set value for background to current value from argument OR value from state OR 0
        let distributedOrigin = 0;
        if (state.getIn(['character', 'background', 'distributed', 'origin']) > 0) {
          distributedOrigin = state.getIn(['character', 'background', 'distributed', 'origin']);
        }

        let distributedProperty = 0;
        if (state.getIn(['character', 'background', 'distributed', 'property']) > 0) {
          distributedProperty = state.getIn(['character', 'background', 'distributed', 'property']);
        }

        let distributedSkills = 0;
        if (state.getIn(['character', 'background', 'distributed', 'skills']) > 0) {
          distributedSkills = state.getIn(['character', 'background', 'distributed', 'skills']);
        }

        if ((distributedProperty - distributedOrigin) <= 3 && (distributedSkills - distributedOrigin) <= 3) {
          rangeLimit = true;
        }
      }

      // Set background points
      return state.setIn(['character', 'background', 'rangeLimit'], rangeLimit);
    }

    case 'CALCULATE_ABILITIES': {
      const charRace = state.getIn(['character', 'info', 'race']);
      const charSex = state.getIn(['character', 'info', 'sex']);
      const charClass = state.getIn(['character', 'info', 'class']);
      const levels = state.getIn(['character', 'levels']);
      const bodyArmorsNecessaryStrength = state.getIn(['character', 'armors', 'bodyArmors', 'necessaryStrength']);
      const helmetsNecessaryStrength = state.getIn(['character', 'armors', 'helmets', 'necessaryStrength']);
      const finalAbilities = getAbilities(charRace, charSex, charClass, levels, bodyArmorsNecessaryStrength, helmetsNecessaryStrength);

      // Set all main abilities
      return state.setIn(['character', 'abilities', 'strength'], parseInt(finalAbilities.strength))
        .setIn(['character', 'abilities', 'dexterity'], parseInt(finalAbilities.dexterity))
        .setIn(['character', 'abilities', 'manualdexterity'], parseInt(finalAbilities.manualdexterity))
        .setIn(['character', 'abilities', 'will'], parseInt(finalAbilities.will))
        .setIn(['character', 'abilities', 'intelligence'], parseInt(finalAbilities.intelligence))
        .setIn(['character', 'abilities', 'charisma'], parseInt(finalAbilities.charisma));
    }

    case 'CALCULATE_DERIVED_ABILITIES': {
      const charRace = state.getIn(['character', 'info', 'race']);
      const strength = state.getIn(['character', 'abilities', 'strength']);
      const dexterity = state.getIn(['character', 'abilities', 'dexterity']);
      const manualdexterity = state.getIn(['character', 'abilities', 'manualdexterity']);
      const will = state.getIn(['character', 'abilities', 'will']);
      const intelligence = state.getIn(['character', 'abilities', 'intelligence']);
      const charisma = state.getIn(['character', 'abilities', 'charisma']);
      const finalDerivedAbilities = getDerivedAbilities(charRace, strength, dexterity, manualdexterity, will, intelligence, charisma);

      // Set all main abilities
      return state.setIn(['character', 'derivedAbilities', 'resistance'], parseInt(finalDerivedAbilities.resistance))
        .setIn(['character', 'derivedAbilities', 'fortitude'], parseInt(finalDerivedAbilities.fortitude))
        .setIn(['character', 'derivedAbilities', 'speed'], parseInt(finalDerivedAbilities.speed))
        .setIn(['character', 'derivedAbilities', 'senses'], parseInt(finalDerivedAbilities.senses))
        .setIn(['character', 'derivedAbilities', 'beauty'], parseInt(finalDerivedAbilities.beauty))
        .setIn(['character', 'derivedAbilities', 'danger'], parseInt(finalDerivedAbilities.danger))
        .setIn(['character', 'derivedAbilities', 'dignity'], parseInt(finalDerivedAbilities.dignity));
    }

    case 'CALCULATE_COMBAT_PARAMETERS': {
      const charRace = state.getIn(['character', 'info', 'race']);
      const charClass = state.getIn(['character', 'info', 'class']);
      const dexterity = state.getIn(['character', 'abilities', 'dexterity']);
      const manualdexterity = state.getIn(['character', 'abilities', 'manualdexterity']);
      const intelligence = state.getIn(['character', 'abilities', 'intelligence']);
      const charisma = state.getIn(['character', 'abilities', 'charisma']);
      const resistance = state.getIn(['character', 'derivedAbilities', 'resistance']);

      const bodyArmorsLimitation = state.getIn(['character', 'armors', 'bodyArmors', 'limitation']);
      const helmetsLimitation = state.getIn(['character', 'armors', 'helmets', 'limitation']);
      const wearingArmorLevel = state.getIn(['character', 'skills', 'distributed', 'combat', 'wearingArmor']);

      const weaponStateObject = state.getIn(['character', 'weapons']);
      const usingShieldLevel = state.getIn(['character', 'skills', 'distributed', 'combat', 'usingShield']);
      const finalCombatParameters = getCombatParameters(charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance, bodyArmorsLimitation, helmetsLimitation, wearingArmorLevel, weaponStateObject, usingShieldLevel);

      return state.setIn(['character', 'combatParameters', 'combatSpeed'], parseInt(finalCombatParameters.combatSpeed))
        .setIn(['character', 'combatParameters', 'attack'], parseInt(finalCombatParameters.attack))
        .setIn(['character', 'combatParameters', 'shoot'], parseInt(finalCombatParameters.shoot))
        .setIn(['character', 'combatParameters', 'defense'], parseInt(finalCombatParameters.defense))
        .setIn(['character', 'combatParameters', 'health'], parseInt(finalCombatParameters.health));
    }

    case 'SET_ERRATA': {
      const key = action.payload.key;
      const value = action.payload.value;

      return state.setIn(['errata', key], value);
    }

    case 'SET_SWITCHER': {
      const key = action.payload.key;
      const value = action.payload.value;

      return state.setIn(['switchers', key], value);
    }

    case 'RESOLVE_LEVELS': {
      const level = parseInt(state.getIn(['character', 'info', 'level']));
      let charBackground = state.getIn(['character', 'background', 'name']);

      // TEMP
      // We need background (that user choose at screen 2) at screen 1
      // For now, let assume that user chose something
      if (!isTextInputFilled(charBackground)) {
        charBackground = 'goodAbility';
      }

      const levelsState = createLevelsState(level, charBackground);

      if (levelsState) {
        return state.setIn(['character', 'levels'], levelsState);
      }
      else {
        return state;
      }
    }

    case 'CHANGE_ABILITY_VALUE': {
      const ability = action.payload.ability;
      const level = action.payload.level;
      const changeValue = action.payload.changeValue;
      const currentValue = state.getIn(['character', 'levels', parseInt(level), 'abilities', ability, 'value']);
      const newValue = currentValue + parseInt(changeValue);

      return state.setIn(['character', 'levels', parseInt(level), 'abilities', ability, 'value'], newValue);
    }

    case 'RESOLVE_ABILITY_VALUES': {
      const level = action.payload.level;
      const charClass = state.getIn(['character', 'info', 'class']);
      const charLevel = state.getIn(['character', 'info', 'level']);

      // In changeAbility() we try to resolve next level
      // In case of last level, there is no next level => return without changes
      if (level > parseInt(charLevel)) {
        return state;
      }

      const levels = state.getIn(['character', 'levels']);
      let abilities = state.getIn(['character', 'levels', parseInt(level), 'abilities']);
      const maximumAbilityPoint = state.getIn(['character', 'levels', parseInt(level), 'maximumAbilityPoint']);

      const mainAbilityPoints = state.getIn(['character', 'levels', parseInt(level), 'mainAbilityPoints']);
      let mainDistributedPoints = 0;
      const mainAbilitiesArray = [];

      const secondaryAbilityPoints = state.getIn(['character', 'levels', parseInt(level), 'secondaryAbilityPoints']);
      let derivedDistributedPoints = 0;
      const secondaryAbilitiesArray = [];

      abilities.keySeq().forEach((key) => {
        if (isAbilityMain(charClass, key)) {
          mainAbilitiesArray.push(key);
        }
        else {
          secondaryAbilitiesArray.push(key);
        }
      });

      // Sum all main and derived points distributed so far
      mainAbilitiesArray.forEach((key) => {
        const value = abilities.getIn([key, 'value']);
        mainDistributedPoints += parseInt(value);
      });

      secondaryAbilitiesArray.forEach((key) => {
        const value = abilities.getIn([key, 'value']);
        derivedDistributedPoints += parseInt(value);
      });

      // Ability is disabled when one of these conditions is true:
      // 1. User hit the limit of maximum points for one ability
      // 2. User hit the ability race limit (only at first level)
      // 3. User increased the ability in previous steps (allowed 2x for main and 1x for derived ability)
      // 4. Sum of all main/derived abilities is equal to distributed points (user has no points left)

      abilities.keySeq().forEach((key) => {
        const value = abilities.getIn([key, 'value']);

        if (
          parseInt(value) === parseInt(maximumAbilityPoint) ||
              isAbilityOnRaceLimit(parseInt(level), key, charClass, value) ||
              (
                isAbilityMain(charClass, key) &&
                isAbilityLeveled(key, levels, parseInt(level), 2)
              ) ||
              (
                !isAbilityMain(charClass, key) &&
                isAbilityLeveled(key, levels, parseInt(level), 1)
              ) ||
              (
                isAbilityMain(charClass, key) &&
                mainDistributedPoints === mainAbilityPoints
              ) ||
              (
                !isAbilityMain(charClass, key) &&
                derivedDistributedPoints === secondaryAbilityPoints
              )
        ) {
          abilities = abilities.setIn([key, 'disabled'], true);
        }
        else {
          abilities = abilities.setIn([key, 'disabled'], false);
        }
      });

      return state.setIn(['character', 'levels', parseInt(level), 'abilities'], abilities);
    }

    case 'SET_SKILLS_POINTS': {
      const charClass = state.getIn(['character', 'info', 'class']);
      const charLevel = state.getIn(['character', 'info', 'level']);
      let backgroundPoints = state.getIn(['character', 'background', 'distributed', 'skills']);
      const levels = state.getIn(['character', 'levels']);

      // TEMP
      // We need background (that user choose at screen 2) at screen 1
      // For now, let assume that user chose something
      if (!isTextInputFilled(backgroundPoints)) {
        backgroundPoints = 0;
      }

      let physicalPoints = 0;
      let psychicalPoints = 0;
      let combinedPoints = 0;

      // CombatPoints are equal to physical (for all classes except Warrior)
      let combatPoints = 0;

      if (charClass === 'warrior') {
        // Warrior get 3 points on 1. level and 1 point for each next level
        combatPoints = 3 + parseInt(charLevel) - 1;
      }

      const availablePointsBackground = getBackgroundSkillsPoints(charClass, backgroundPoints);
      const availablePointsLeveling = getLevelingSkillsPoints(levels);

      physicalPoints = parseInt(availablePointsBackground.physical) + parseInt(availablePointsLeveling.physical);
      psychicalPoints = parseInt(availablePointsBackground.psychical) + parseInt(availablePointsLeveling.psychical);
      combinedPoints = parseInt(availablePointsBackground.combined) + parseInt(availablePointsLeveling.combined);

      return state.setIn(['character', 'skills', 'availablePoints', 'physical'], physicalPoints)
        .setIn(['character', 'skills', 'availablePoints', 'psychical'], psychicalPoints)
        .setIn(['character', 'skills', 'availablePoints', 'combined'], combinedPoints)
        .setIn(['character', 'skills', 'availablePoints', 'combat'], combatPoints);
    }

    case 'RESOLVE_SKILLS': {
      const orderedSkills = getOrderedSkills();

      return state.setIn(['character', 'skills', 'distributed', 'physical'], orderedSkills.physical)
        .setIn(['character', 'skills', 'distributed', 'psychical'], orderedSkills.psychical)
        .setIn(['character', 'skills', 'distributed', 'combined'], orderedSkills.combined)
        .setIn(['character', 'skills', 'distributed', 'combat'], orderedSkills.combat);
    }

    case 'SET_SKILL': {
      const skillName = action.payload.skillName;
      const skillType = action.payload.skillType;
      const value = action.payload.value;

      return state.setIn(['character', 'skills', 'distributed', skillType, skillName], parseInt(value));
    }

    case 'ADD_WEAPON': {
      const weaponName = action.payload.weaponName;
      const weaponType = action.payload.weaponType;

      // get Map with all weapons and add new weapon under weaponName key
      let weaponStateObject = state.getIn(['character', 'weapons']);
      const weaponExists = weaponStateObject.has(weaponName);

      if (!weaponExists) {
        // Create temp object for calculateWeapons (that function replace it with object with calculated numbers)
        const weaponObject = Map({ hold: Map({ weaponType: weaponType }) });
        weaponStateObject = weaponStateObject.set(weaponName, weaponObject);
      }

      return state.setIn(['character', 'weapons'], weaponStateObject);
    }

    case 'REMOVE_WEAPON': {
      const weaponName = action.payload.weaponName;

      // get Map with all weapons and remove weapon
      let weaponStateObject = state.getIn(['character', 'weapons']);
      const weaponExists = weaponStateObject.has(weaponName);

      if (weaponExists) {
        // Delete key from Map
        weaponStateObject = weaponStateObject.delete(weaponName);
      }

      return state.setIn(['character', 'weapons'], weaponStateObject);
    }

    case 'CALCULATE_WEAPONS': {
      // get Map with all weapons
      const weaponStateObject = state.getIn(['character', 'weapons']);
      const combatSpeed = state.getIn(['character', 'combatParameters', 'combatSpeed']);
      const attack = state.getIn(['character', 'combatParameters', 'attack']);
      const defense = state.getIn(['character', 'combatParameters', 'defense']);
      const charStrength = state.getIn(['character', 'abilities', 'strength']);
      let newWeaponStateObject = OrderedMap();

      // Iterate through weapon names
      weaponStateObject.mapKeys((weaponName) => {
        // Iterate through weapon holds
        weaponStateObject.get(weaponName).mapKeys((weaponHold) => {
          const weaponType = weaponStateObject.getIn([weaponName, weaponHold, 'weaponType']);
          let skillDegree = state.getIn(['character', 'skills', 'distributed', 'combat', weaponType]);

          if (weaponType === 'shields') {
            skillDegree = state.getIn(['character', 'skills', 'distributed', 'combat', 'usingShield']);
          }

          // Returns Map with weapon numbers
          let weaponObject = getWeaponNumbers(weaponName, weaponType, false, skillDegree, combatSpeed, attack, defense, charStrength);
          newWeaponStateObject = newWeaponStateObject.setIn([weaponName, weaponHold], weaponObject);

          // For onehanded weapons add numbers with twohands hold
          if (weaponHold === 'onehanded' && weaponType !== 'noWeapon' && weaponType !== 'shields') {
            weaponObject = getWeaponNumbers(weaponName, weaponType, true, skillDegree, combatSpeed, attack, defense, charStrength);
            weaponHold = weaponObject.get('hold');

            newWeaponStateObject = newWeaponStateObject.setIn([weaponName, weaponHold], weaponObject);
          }
        });
      });

      return state.setIn(['character', 'weapons'], newWeaponStateObject);
    }

    case 'ADD_DEBUG_BOX': {
      const id = action.payload.id;
      const content = action.payload.content;

      // get Map with all debugBoxes and add new box under id key
      let debugBoxStateObject = state.get('debugBoxes');
      debugBoxStateObject = debugBoxStateObject.set(id, content);

      return state.set('debugBoxes', debugBoxStateObject);
    }

    case 'SET_ARMOR': {
      let armorName = action.payload.armorName;
      const armorType = action.payload.armorType;

      if (!isTextInputFilled(armorName)) {
        // empty armorName => action Remove weapon, set default armorName to first row in a table
        if (armorType === 'bodyArmors') {
          armorName = 'noArmor';
        }
        else {
          armorName = 'noHelmet';
        }
      }

      const armorObject = tables.armors[armorType][armorName];

      return state.setIn(['character', 'armors', armorType, 'armorName'], armorName)
        .setIn(['character', 'armors', armorType, 'necessaryStrength'], parseInt(armorObject.necessaryStrength))
        .setIn(['character', 'armors', armorType, 'limitation'], parseInt(armorObject.limitation))
        .setIn(['character', 'armors', armorType, 'protection'], parseInt(armorObject.protection));
    }

    case 'SET_SAVE_OPTION': {
      const key = action.payload.key;
      const value = action.payload.value;

      if (isTextInputFilled(key) && isTextInputFilled(value)) {
        return state.setIn(['saveOptions', key], value);
      }
      else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
