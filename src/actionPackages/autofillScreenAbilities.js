import store from "../store/index";
import resolveAbilityValues from "../actions/resolveAbilityValues";
import changeAbility from "../actionPackages/changeAbility";
import getPreferredAbility from "../helpers/getPreferredAbility";

const increaseAbility = (level, ability) => {
    let changeValue = "+1"
    let state = store.getState();
    let disabled = state.getIn(["character", "levels", parseInt(level), "abilities", ability, "disabled"])

    if (!disabled) {
        changeAbility(ability, level, changeValue)
        // Resolve button state for this level
        store.dispatch( resolveAbilityValues({level}) )
    }
    else {
        return false
    }
}

const autofillScreenAbilities = () => {

    let state = store.getState();
    var charClass = state.getIn(["character", "info", "class"]);
    let levels = state.getIn(["character", "levels"])
    let combatType = state.getIn(["switchers", "autoFillAbilities"]) ? "nonCombat" : "combat"

    let primaryPreferred = getPreferredAbility(charClass, "primaryPreferred", combatType);
    let primaryOther = getPreferredAbility(charClass, "primaryOther", combatType);
    let primaryEqual = getPreferredAbility(charClass, "primaryEqual", combatType);
    let secondaryPreferred = getPreferredAbility(charClass, "secondaryPreferred", combatType);
    let secondaryOther = getPreferredAbility(charClass, "secondaryOther", combatType);
    let primaryEqualLast = '';

    if (levels) {
        // Iterate through all levels in level table
        levels.keySeq().forEach((level) => {
            let maximumAbilityPoint = levels.getIn([parseInt(level), "maximumAbilityPoint"]);

            if (primaryPreferred && primaryOther) {
                // MAIN ABILITIES - mode A: primary and secondary distribution

                // 1. Try to click maximum points at primaryPreferred ability
                for (var i = 1; i <= maximumAbilityPoint; i++) {
                    increaseAbility(level, primaryPreferred)
                }

                // 2. Try to click maximum points at primaryOther
                for (var i = 1; i <= maximumAbilityPoint; i++) {
                    increaseAbility(level, primaryOther)
                }
            } else {
                // MAIN ABILITIES - mode B: equal distribution
                let ability1 = primaryEqual[0]
                let ability2 = primaryEqual[1]
                let increasingAbility = ability1

                // 1. Try to click 1 point at first equal ability
                increasingAbility = primaryEqualLast == ability1 ? ability2 : ability1
                increaseAbility(level, increasingAbility)
                primaryEqualLast = increasingAbility

                // 2. Try to click 1 point at second equal ability
                if (maximumAbilityPoint > 1) {
                    increasingAbility = primaryEqualLast == ability1 ? ability2 : ability1
                    increaseAbility(level, increasingAbility)
                    primaryEqualLast = increasingAbility
                }

                // 3. Try to click 1 point at first equal ability (in case of 3 ability points from character background)
                if (maximumAbilityPoint > 2) {
                    increasingAbility = primaryEqualLast == ability1 ? ability2 : ability1
                    increaseAbility(level, increasingAbility)
                    primaryEqualLast = increasingAbility
                }
            }

            // 3. Try to click maximum points at secondaryPreferred ability
            for (var i = 1; i <= maximumAbilityPoint; i++) {
                increaseAbility(level, secondaryPreferred)
            }

            // 4. Try to click maximum points at secondaryOther ability
            for (var i = 1; i <= maximumAbilityPoint; i++) {
                increaseAbility(level, secondaryOther)
            }

        })
    }

};

export default autofillScreenAbilities;
