
const getArmorsLimitationPenalty = (bodyArmorsLimitation, helmetsLimitation, wearingArmorLevel) => {

 if (
      typeof bodyArmorsLimitation === "number" &&
      typeof helmetsLimitation === "number" &&
      typeof wearingArmorLevel === "number"
    )
  {

    // Count bodyArmor and helmet limitations and add (positive) correction
    let limitationCount = bodyArmorsLimitation + helmetsLimitation + wearingArmorLevel;

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
