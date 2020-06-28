import { Map } from 'immutable';
import sumAbilityValuesOnAllLevels from '../helpers/sumAbilityValuesOnAllLevels';

const getLevelingSkillsPoints = (levels) => {
  const finalSkillsPoints = {
    physical: '',
    psychical: '',
    combined: '',
  };

  if (Map.isMap(levels)) {
    let physicalPoints = 0;
    let psychicalPoints = 0;
    let combinedPoints = 0;

    // Remove level number 1 from level object
    levels = levels.delete(1);

    physicalPoints = sumAbilityValuesOnAllLevels('strength', levels) + sumAbilityValuesOnAllLevels('dexterity', levels);
    psychicalPoints = sumAbilityValuesOnAllLevels('will', levels) + sumAbilityValuesOnAllLevels('intelligence', levels);
    combinedPoints = sumAbilityValuesOnAllLevels('manualdexterity', levels) + sumAbilityValuesOnAllLevels('charisma', levels);

    finalSkillsPoints.physical = parseInt(physicalPoints);
    finalSkillsPoints.psychical = parseInt(psychicalPoints);
    finalSkillsPoints.combined = parseInt(combinedPoints);

    return finalSkillsPoints;
  }
};

export default getLevelingSkillsPoints;
