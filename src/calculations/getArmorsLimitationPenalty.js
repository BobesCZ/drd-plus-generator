
const getArmorsLimitationPenalty = (bodyArmorsNecessaryStrength, bodyArmorsLimitation, helmetsNecessaryStrength, helmetsLimitation, wearingArmorLevel, errataLimitationsAreSeparated) => {

 if (
      typeof bodyArmorsNecessaryStrength === "number" &&
      typeof bodyArmorsLimitation === "number" &&
      typeof helmetsNecessaryStrength === "number" &&
      typeof helmetsLimitation === "number" &&
      typeof wearingArmorLevel === "number" &&
      typeof errataLimitationsAreSeparated === "boolean"

    )
  {
    let limitationCount = 0;

    // Correct limitation for wearingArmor skill
    if (errataLimitationsAreSeparated) {
      // Errata: wearing armor is applied for armors and helmets separately
      let armorsLimitationCount = bodyArmorsLimitation + wearingArmorLevel;
      if (armorsLimitationCount > 0) {
        armorsLimitationCount = 0
      }

      let helmetsLimitationCount = helmetsLimitation + wearingArmorLevel;
      if (helmetsLimitationCount > 0) {
        helmetsLimitationCount = 0
      }

      limitationCount = armorsLimitationCount + helmetsLimitationCount;
    }
    else {
      // Count bodyArmor and helmet limitations and add (positive) correction
      limitationCount = bodyArmorsLimitation + helmetsLimitation + wearingArmorLevel;
    }

    // Limitation is always negative number, maximum is 0
    if (limitationCount > 0 ) {
      limitationCount = 0
    }

    return limitationCount;
  }
  else {
    return false;
  }

};

export default getArmorsLimitationPenalty;
