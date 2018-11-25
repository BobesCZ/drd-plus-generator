import tables from "../data/tables";

// ONLY for informative table on screen Abilities.
// Missing values for charClass

const getAbilitiesByRace = (charRace, charSex) => {

  var finalAbilities = {
    "strength": "",
    "dexterity": "",
    "manualdexterity": "",
    "will": "",
    "intelligence": "",
    "charisma": "",
  };

  if (charRace.length && charSex.length) {
    Object.keys(finalAbilities).forEach(key => {
      // @SOURCE: Tabulka ras
      var raceValue = tables.abilities.race[charRace][key];

      // @SOURCE: Tabulka oprav pro pohlaví
      var sexValue = 0;
      if (charSex == "female") {
        sexValue = tables.abilities.sex[charRace][key];
      }

      // Sum all values
      if (typeof(raceValue) === "number") {
        finalAbilities[key] = parseInt(raceValue) + parseInt(sexValue);
      }
    });

    return finalAbilities;
  }
};

export default getAbilitiesByRace;
