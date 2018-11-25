import tables from "../data/tables";

const getAbilitiesByClass = (charClass) => {

  var finalAbilities = {
    "strength": "",
    "dexterity": "",
    "manualdexterity": "",
    "will": "",
    "intelligence": "",
    "charisma": "",
  };

  if (charClass.length) {
    Object.keys(finalAbilities).forEach(key => {

      // @SOURCE: Tabulka hlavních vlastností podle povolání
      var classValue = tables.abilities.class[charClass][key];

      finalAbilities[key] = parseInt(classValue);
    });

    return finalAbilities;
  }
};

export default getAbilitiesByClass;
