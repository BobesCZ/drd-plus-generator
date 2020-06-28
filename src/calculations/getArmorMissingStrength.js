import tables from '../data/tables';

const getArmorMissingStrength = (armorsNecessaryStrength, charStrength, charRace) => {
  if (
    typeof armorsNecessaryStrength === 'number' &&
      typeof charStrength === 'number' &&
      charRace.length
  ) {
    const missingStrengthOnArmorCorrection = tables.missingStrengthOnArmorCorrection[charRace];

    // Errata (not optional): strength is applied for armors and helmets separately
    let missingStrengthArmor = armorsNecessaryStrength + missingStrengthOnArmorCorrection - charStrength;
    if (missingStrengthArmor < 0) {
      missingStrengthArmor = 0;
    }

    return missingStrengthArmor;
  }
  else {
    return false;
  }
};

export default getArmorMissingStrength;
