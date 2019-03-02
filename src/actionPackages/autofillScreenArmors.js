import store from "../store/index";
import changeArmor from "./changeArmor";
import getArmorMissingStrength from "../calculations/getArmorMissingStrength";
import tables from "../data/tables";

// Global points for both bodyArmor and helmets
let availableLimitationPoints = 0

const getRecommendedArmor = (armorType, charStrength, charRace) => {
    let armors = tables.armors;

    if (typeof armors[armorType] !== "undefined") {
        let lastArmor= '';
        let lastLimitation= 0;

        Object.keys(armors[armorType]).forEach((armor) => {
            let armorsNecessaryStrength = armors[armorType][armor]["necessaryStrength"]
            let armorMissingStrength = getArmorMissingStrength(armorsNecessaryStrength, charStrength, charRace)
            let armorLimitation = armors[armorType][armor]["limitation"]

            if (armorMissingStrength <= 0 && (availableLimitationPoints + armorLimitation) >= 0 ) {
                // Save armor if character has enough strength
                lastArmor = armor;
                lastLimitation = armorLimitation;
            }
        })

        // Substract limitation of recommended weapon from global points
        availableLimitationPoints += lastLimitation

        return lastArmor;
    }

    return false;
}


const autofillScreenArmors = () => {
    let state = store.getState();
    let charStrength = state.getIn(["character", "abilities", "strength"]);
    let charRace = state.getIn(["character", "info", "race"]);
    let wearingArmorLevel = state.getIn(["character", "skills", "distributed", "combat", "wearingArmor"])
    // Set global points
    availableLimitationPoints = wearingArmorLevel;

    ["bodyArmors", "helmets"].forEach((armorType) => {
        let charArmorNecessaryStrength = state.getIn(["character", "armors", armorType, "necessaryStrength"])

        // Continue only if user has chose "no armor" option
        if (charArmorNecessaryStrength == -10) {

            let armorName = getRecommendedArmor(armorType, charStrength, charRace)

            if (armorName) {
                // Add weapon to state
                changeArmor(armorName, armorType)
            }
        }
        else {
            // Substract limitation of user chosen weapon from global points
            let charArmorLimitation = state.getIn(["character", "armors", armorType, "limitation"])
            availableLimitationPoints += charArmorLimitation
        }
    })

};

export default autofillScreenArmors;
