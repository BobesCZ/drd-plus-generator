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
    let weaponsCounter = 0;

    // Change key "usingShield" to "shields"
    skills = skills.mapKeys(key => {
      if (key === "usingShield")
        return "shields";
      return key;
    });

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

                    // Count only offensive weapons, shields are excluded
                    if (skill !== "shields") {
                        weaponsCounter++
                    }
                }
            }
        })

        if (weaponsCounter === 0) {
            // No offensive weapon was added (user may chose combat skills like wearingArmor, shields or noWeapon)
            // Add lightStaff as a default weapon (because there is always some stick laying on the ground, right?)
            changeWeapon("lightStaff", "spears", "ADD")
        }
    }

};

export default autofillScreenWeapons;
