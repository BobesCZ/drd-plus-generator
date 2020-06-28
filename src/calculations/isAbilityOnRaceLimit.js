import tables from '../data/tables';

const isAbilityOnRaceLimit = (level, ability, charClass, value) => {
  if (typeof level === 'number' && ability.length && charClass.length && typeof value === 'number') {
    // Calculations is only for first level
    if (level === 1) {
      const abilityClassValue = tables.abilities.class[charClass][ability];
      const sum = parseInt(abilityClassValue) + parseInt(value);

      // @SOURCE: Při počátečním vytváření postavy nelze zvýšit základní hodnotu z Tabulky ras opravené o pohlaví o více než 3
      if (sum === 3) {
        // User just hit the limit (3) for increasing ability on the first level => ability should be disabled
        return true;
      }
    }

    return false;
  }
  else {
    return false;
  }
};

export default isAbilityOnRaceLimit;
