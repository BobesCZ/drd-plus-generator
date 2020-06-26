import { Map } from 'immutable';
import tables from '../data/tables';
import sumAbilityValuesOnAllLevels from '../helpers/sumAbilityValuesOnAllLevels';

const getSkillsPoints = (charRace, charSex, charClass, levels) => {
  const finalAbilities = {
    strength: '',
    dexterity: '',
    manualdexterity: '',
    will: '',
    intelligence: '',
    charisma: '',
  };

  if (charRace.length && charSex.length && charClass.length && Map.isMap(levels)) {
    Object.keys(finalAbilities).forEach(key => {
      // @SOURCE: Tabulka ras
      const raceValue = tables.abilities.race[charRace][key];

      // @SOURCE: Tabulka oprav pro pohlaví
      let sexValue = 0;
      if (charSex == 'female') {
        sexValue = tables.abilities.sex[charRace][key];
      }

      // @SOURCE: Tabulka hlavních vlastností podle povolání
      const classValue = tables.abilities.class[charClass][key];

      // Values from leveling
      const levelsValue = sumAbilityValuesOnAllLevels(key, levels);

      // Sum all values
      if (typeof (raceValue) === 'number') {
        finalAbilities[key] = parseInt(raceValue) + parseInt(sexValue) + parseInt(classValue) + parseInt(levelsValue);
      }
    });

    return finalAbilities;
  }
};

export default getSkillsPoints;
