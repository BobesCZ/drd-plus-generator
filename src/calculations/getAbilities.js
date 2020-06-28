import { Map, OrderedMap } from 'immutable';
import getArmorsNecessaryStrengthPenalty from '../calculations/getArmorsNecessaryStrengthPenalty';
import tables from '../data/tables';
import sumAbilityValuesOnAllLevels from '../helpers/sumAbilityValuesOnAllLevels';

const getAbilities = (charRace, charSex, charClass, levels, bodyArmorsNecessaryStrength, helmetsNecessaryStrength, returnDebugBox = false) => {
  const finalAbilities = {
    strength: '',
    dexterity: '',
    manualdexterity: '',
    will: '',
    intelligence: '',
    charisma: '',
  };

  const debugBox = {};

  if (charRace.length && charSex.length && charClass.length && Map.isMap(levels)) {
    Object.keys(finalAbilities).forEach(key => {
      let debugBoxObject = OrderedMap();
      let correctionValue = 0;

      // @SOURCE: Tabulka ras
      const raceValue = tables.abilities.race[charRace][key];
      debugBoxObject = debugBoxObject.set('levelAbilitiesRace', parseInt(raceValue));

      // @SOURCE: Tabulka oprav pro pohlaví
      let sexValue = 0;
      if (charSex === 'female') {
        sexValue = tables.abilities.sex[charRace][key];
      }
      debugBoxObject = debugBoxObject.set('sexCorrection', parseInt(sexValue));

      // @SOURCE: Tabulka hlavních vlastností podle povolání
      const classValue = tables.abilities.class[charClass][key];
      debugBoxObject = debugBoxObject.set('levelAbilitiesClass', parseInt(classValue));

      // Values from leveling
      const levelsValue = sumAbilityValuesOnAllLevels(key, levels);
      debugBoxObject = debugBoxObject.set('levelingAndBackground', parseInt(levelsValue));

      if (key === 'dexterity') {
        // Armor necessary strength penalty
        const charStrength = finalAbilities.strength || 0;
        correctionValue = getArmorsNecessaryStrengthPenalty(bodyArmorsNecessaryStrength, helmetsNecessaryStrength, charStrength, charRace);
        debugBoxObject = debugBoxObject.set('armorNecessaryStrengthPenalty', parseInt(correctionValue));
      }

      // Sum all values
      if (typeof (raceValue) === 'number') {
        finalAbilities[key] = parseInt(raceValue) + parseInt(sexValue) + parseInt(classValue) + parseInt(levelsValue) + parseInt(correctionValue);
      }
      debugBoxObject = debugBoxObject.set('total', parseInt(finalAbilities[key]));

      debugBox[key] = debugBoxObject;
    });

    if (returnDebugBox) {
      return debugBox;
    }
    else {
      return finalAbilities;
    }
  }
};

export default getAbilities;
