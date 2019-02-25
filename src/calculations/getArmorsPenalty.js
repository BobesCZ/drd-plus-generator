
const getArmorsPenalty = (bodyArmorsNecessaryStrength, bodyArmorsLimitation, helmetsNecessaryStrength, helmetsLimitation, wearingArmorLevel) => {

 if (
      typeof bodyArmorsNecessaryStrength === "number" &&
      typeof bodyArmorsLimitation === "number" &&
      typeof helmetsNecessaryStrength === "number" &&
      typeof helmetsLimitation === "number" &&
      typeof wearingArmorLevel === "number"
    )
  {
    let results = [];

    // Correct limitation for wearingArmor skill
    // TODO: Add errata
    let limitationWearingArmorCorrection = wearingArmorLevel;
    // Count bodyArmor and helmet limitations and add (positive) correction
    let limitationCount = bodyArmorsLimitation + helmetsLimitation + limitationWearingArmorCorrection;
    // Limitation is always negative number, maximum is 0
    if (limitationCount > 0 ) {
      limitationCount = 0
    }

    results["limitation"] = limitationCount;

    return results;
  }
  else {
    return false;
  }

};

export default getArmorsPenalty;
