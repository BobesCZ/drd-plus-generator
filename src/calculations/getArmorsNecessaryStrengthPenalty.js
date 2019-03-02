import tables from "../data/tables";

const getArmorsNecessaryStrengthPenalty = (bodyArmorsNecessaryStrength, helmetsNecessaryStrength, charStrength, charRace) => {

 if (
      typeof bodyArmorsNecessaryStrength === "number" &&
      typeof helmetsNecessaryStrength === "number" &&
      typeof charStrength === "number"
    )
  {
    let penaltyCount = 0
    let missingStrengthOnArmorCorrection = tables.missingStrengthOnArmorCorrection[charRace];

    // Errata (not optional): strength is applied for armors and helmets separately
    let missingStrengthArmors = bodyArmorsNecessaryStrength + missingStrengthOnArmorCorrection - charStrength
    if (missingStrengthArmors < 0) {
      missingStrengthArmors = 0
    }

    let missingStrengthHelmets = helmetsNecessaryStrength + missingStrengthOnArmorCorrection - charStrength
    if (missingStrengthHelmets < 0) {
      missingStrengthHelmets = 0
    }

    // Count missing strength for armor and helmet
    let missingStrength = missingStrengthArmors + missingStrengthHelmets;

    // Maximum necessary strength key for missingStrengthOnArmor table is 11
    if (missingStrength > 11 ) {
      missingStrength = 11
    }

    // Get penalty from table
    penaltyCount = tables.missingStrengthOnArmor[missingStrength]

    return penaltyCount;
  }
  else {
    return false;
  }

};

export default getArmorsNecessaryStrengthPenalty;
