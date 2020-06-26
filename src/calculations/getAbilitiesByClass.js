import tables from '../data/tables';

const getAbilitiesByClass = (charClass) => {
  const finalAbilities = {
    strength: '',
    dexterity: '',
    manualdexterity: '',
    will: '',
    intelligence: '',
    charisma: '',
  };

  if (charClass.length) {
    Object.keys(finalAbilities).forEach(key => {
      // @SOURCE: Tabulka hlavních vlastností podle povolání
      const classValue = tables.abilities.class[charClass][key];

      finalAbilities[key] = parseInt(classValue);
    });

    return finalAbilities;
  }
};

export default getAbilitiesByClass;
