import store from "../store/index";
import changeArmor from "./changeArmor";
import getArmorMissingStrength from "../calculations/getArmorMissingStrength";
import tables from "../data/tables";

const getRecommendedArmor = (armorType, charStrength, charRace) => {
    let armors = tables.armors;

    if (typeof armors[armorType] !== "undefined") {
        let lastArmor= '';

        Object.keys(armors[armorType]).forEach((armor) => {
            let armorsNecessaryStrength = armors[armorType][armor]["necessaryStrength"]
            let armorMissingStrength = getArmorMissingStrength(armorsNecessaryStrength, charStrength, charRace)

            if (armorMissingStrength <= 0) {
                // Save armor if character has enough strength
                lastArmor = armor;
            }
        })

        return lastArmor;
    }

    return false;
}


const autofillScreenArmors = () => {
    let state = store.getState();
    let charStrength = state.getIn(["character", "abilities", "strength"]);
    let charRace = state.getIn(["character", "info", "race"]);

    ["bodyArmors", "helmets"].forEach((armorType) => {
        let charArmorNecessaryStrength = state.getIn(["character", "armors", armorType, "necessaryStrength"]);

        // Continue only if user has chose "no armor" option
        if (charArmorNecessaryStrength == -10) {

            let armorName = getRecommendedArmor(armorType, charStrength, charRace)

            if (armorName) {
                // Add weapon to state
                changeArmor(armorName, armorType)
            }
        }
    })

};

export default autofillScreenArmors;
