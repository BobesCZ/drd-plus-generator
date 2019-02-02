import store from "../store/index";
import changeWeapon from "./changeWeapon";
import tables from "../data/tables";

const getRecommendedWeapon = (weaponType, charStrength) => {
    let weapons = tables.weapons;

    if (typeof weapons[weaponType] !== "undefined") {
        let lastWeapon = '';

        Object.keys(weapons[weaponType]).forEach((weapon) => {
            let necessaryStrength = weapons[weaponType][weapon]["necessaryStrength"]

            if (necessaryStrength <= charStrength) {
                // Save weapon if character has enough strength
                lastWeapon = weapon;
            }
        })

        return lastWeapon;
    }

    return false;
}


const autofillScreenWeapons = () => {
    let state = store.getState();
    let skills = state.getIn(["character", "skills", "distributed", "combat"]);
    let charStrength = state.getIn(["character", "abilities", "strength"]);

    if (skills) {
        // Iterate through all combat skills
        skills.keySeq().forEach((skill) => {
            let skillLevel = skills.get(skill)
            // Ignore noWeapon skill
            if (skillLevel > 0 && skill !== "noWeapon") {
                let weaponName = getRecommendedWeapon(skill, charStrength)

                if (weaponName) {
                    // Add weapon to state
                    changeWeapon(weaponName, skill, "ADD")
                }
            }
        })

    }

};

export default autofillScreenWeapons;
