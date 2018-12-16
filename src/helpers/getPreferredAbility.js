import preferredAbilitiesByClass from "../data/preferredAbilitiesByClass";

const getPreferredAbility = (charClass, abilityType, combatType) => {
    if
    (
        charClass.length > 0 &&
        (
            abilityType === "primaryPreferred" ||
            abilityType === "primaryOther" ||
            abilityType === "primaryEqual" ||
            abilityType === "secondaryPreferred" ||
            abilityType === "secondaryOther"
        ) &&
        combatType.length > 0
    )
    {
        let tableValue = 0;
        let table = preferredAbilitiesByClass[charClass][combatType];
        let resultAbilityArray = [];

        switch (abilityType) {
            case "primaryPreferred":
                tableValue = 100;
                break;
            case "primaryEqual":
                tableValue = 50;
                break;
            case "primaryOther":
                tableValue = 10;
                break;
            case "secondaryPreferred":
                tableValue = 5;
                break;
            case "secondaryOther":
                tableValue = 1;
                break;
        }

        Object.keys(table).forEach((ability) => {
            if (table[ability] === tableValue) {
                resultAbilityArray.push(ability);
            }
        })

        if (resultAbilityArray.length === 0) {
            return false
        }
        else if (resultAbilityArray.length === 1) {
            return resultAbilityArray[0]
        }
        else {
            return resultAbilityArray
        }
    }
    else {
        return false
    }
}

export default getPreferredAbility;
