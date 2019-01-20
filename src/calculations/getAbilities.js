import { Map, OrderedMap } from 'immutable';
import tables from "../data/tables";
import sumAbilityValuesOnAllLevels from "../helpers/sumAbilityValuesOnAllLevels";


const getAbilities = (charRace, charSex, charClass, levels, returnDebugBox = false) => {
  var finalAbilities = {
    "strength": "",
    "dexterity": "",
    "manualdexterity": "",
    "will": "",
    "intelligence": "",
    "charisma": "",
  };

  let debugBox = {}

  if (charRace.length && charSex.length && charClass.length && Map.isMap(levels)) {
    Object.keys(finalAbilities).forEach(key => {
      var debugBoxObject = OrderedMap()

      // @SOURCE: Tabulka ras
      var raceValue = tables.abilities.race[charRace][key];
      debugBoxObject = debugBoxObject.set("levelAbilitiesRace", parseInt(raceValue))

      // @SOURCE: Tabulka oprav pro pohlaví
      var sexValue = 0;
      if (charSex == "female") {
        sexValue = tables.abilities.sex[charRace][key];
      }
      debugBoxObject = debugBoxObject.set("sexCorrection", parseInt(sexValue))

      // @SOURCE: Tabulka hlavních vlastností podle povolání
      var classValue = tables.abilities.class[charClass][key];
      debugBoxObject = debugBoxObject.set("levelAbilitiesClass", parseInt(classValue))

      // Values from leveling
      var levelsValue = sumAbilityValuesOnAllLevels(key, levels)
      debugBoxObject = debugBoxObject.set("levelingAndBackground", parseInt(levelsValue))

      // Sum all values
      if (typeof(raceValue) === "number") {
        finalAbilities[key] = parseInt(raceValue) + parseInt(sexValue) + parseInt(classValue) + parseInt(levelsValue);
      }
      debugBoxObject = debugBoxObject.set("total", parseInt(finalAbilities[key]))


      debugBox[key] = debugBoxObject
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
