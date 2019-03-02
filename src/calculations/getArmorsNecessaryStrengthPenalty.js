import tables from "../data/tables";
import getArmorMissingStrength from "./getArmorMissingStrength";

const getArmorsNecessaryStrengthPenalty = (bodyArmorsNecessaryStrength, helmetsNecessaryStrength, charStrength, charRace) => {

 if (
      typeof bodyArmorsNecessaryStrength === "number" &&
      typeof helmetsNecessaryStrength === "number" &&
      typeof charStrength === "number" &&
      charRace.length
    )
  {
    let penaltyCount = 0

    // Errata (not optional): strength is applied for armors and helmets separately
    let missingStrengthArmors = getArmorMissingStrength(bodyArmorsNecessaryStrength, charStrength, charRace)

    let missingStrengthHelmets = getArmorMissingStrength(helmetsNecessaryStrength, charStrength, charRace)

    // Count missing strength for armor and helmet
    let missingStrength = parseInt(missingStrengthArmors) + parseInt(missingStrengthHelmets);

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
