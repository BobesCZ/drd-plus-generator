import tables from "../data/tables";

const getAbilities = (charRace, charSex, charClass) => {

  var finalAbilities = {
    "strength": "",
    "dexterity": "",
    "manualdexterity": "",
    "will": "",
    "intelligence": "",
    "charisma": "",
  };

  if (charRace.length && charSex.length && charClass.length) {
    Object.keys(finalAbilities).forEach(key => {
      // @SOURCE: Tabulka ras
      var raceValue = tables.abilities.race[charRace][key];

      // @SOURCE: Tabulka oprav pro pohlaví
      var sexValue = 0;
      if (charSex == "female") {
        sexValue = tables.abilities.sex[charRace][key];
      }

      // @SOURCE: Tabulka hlavních vlastností podle povolání
      var classValue = tables.abilities.class[charClass][key];

      // Sum all values
      if (typeof(raceValue) === "number") {
        finalAbilities[key] = parseInt(raceValue) + parseInt(sexValue) + parseInt(classValue);
      }
    });

    return finalAbilities;
  }
};

export default getAbilities;
