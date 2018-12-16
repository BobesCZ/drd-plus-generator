import store from "../store/index";
import resolveAbilityValues from "../actions/resolveAbilityValues";
import changeAbility from "../actionPackages/changeAbility";
import preferredAbilitiesByClass from "../data/preferredAbilitiesByClass";
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

    let primaryPreferred = getPreferredAbility(charClass, "primaryPreferred");
    let primaryOther = getPreferredAbility(charClass, "primaryOther");
    let secondaryPreferred = getPreferredAbility(charClass, "secondaryPreferred");
    let secondaryOther = getPreferredAbility(charClass, "secondaryOther");
    let maxBackgroundPoints = 3;

    console.log(primaryPreferred, primaryOther, secondaryPreferred, secondaryOther)

    if (levels) {
        // Iterate through all levels in level table
        levels.keySeq().forEach((level) => {
            let levelRow = levels.get(level)

            // 1. Try to click maximum points at primaryPreferred ability
            for (var i = 1; i <= maxBackgroundPoints; i++) {
                increaseAbility(level, primaryPreferred)
            }

            // 2. Try to click maximum points at primaryOther
            for (var i = 1; i <= maxBackgroundPoints; i++) {
                increaseAbility(level, primaryOther)
            }

            // 3. Try to click maximum points at secondaryPreferred ability
            for (var i = 1; i <= maxBackgroundPoints; i++) {
                increaseAbility(level, secondaryPreferred)
            }

            // 4. Try to click maximum points at secondaryOther ability
            for (var i = 1; i <= maxBackgroundPoints; i++) {
                increaseAbility(level, secondaryOther)
            }

        })
    }

};

export default autofillScreenAbilities;
