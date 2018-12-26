import { Map } from 'immutable';
import tables from "../data/tables";
import sumAbilityValuesOnAllLevels from "../helpers/sumAbilityValuesOnAllLevels";

const getLevelingSkillsPoints = (levels) => {
  var finalSkillsPoints = {
    "physical": "",
    "psychical": "",
    "combined": "",
  };

  if (Map.isMap(levels)) {
    var physicalPoints = 0
    var psychicalPoints = 0
    var combinedPoints = 0

    // Remove level number 1 from level object
    levels = levels.delete(1)

    physicalPoints = sumAbilityValuesOnAllLevels("strength", levels) + sumAbilityValuesOnAllLevels("dexterity", levels)
    psychicalPoints = sumAbilityValuesOnAllLevels("will", levels) + sumAbilityValuesOnAllLevels("intelligence", levels)
    combinedPoints = sumAbilityValuesOnAllLevels("manualdexterity", levels) + sumAbilityValuesOnAllLevels("charisma", levels)

    finalSkillsPoints["physical"] = parseInt(physicalPoints);
    finalSkillsPoints["psychical"] = parseInt(psychicalPoints);
    finalSkillsPoints["combined"] = parseInt(combinedPoints);

    return finalSkillsPoints;
  }
};

export default getLevelingSkillsPoints;
