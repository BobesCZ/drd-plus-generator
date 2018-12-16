import preferredAbilitiesByClass from "../data/preferredAbilitiesByClass";

const getPreferredAbility = (charClass, abilityType) => {
    if
    (
        charClass.length > 0 &&
        (
            abilityType === "primaryPreferred" ||
            abilityType === "primaryOther" ||
            abilityType === "secondaryPreferred" ||
            abilityType === "secondaryOther"
        )
    )
    {
        let tableValue = 0;
        let table = preferredAbilitiesByClass[charClass];
        let resultAbility = '';

        switch (abilityType) {
            case "primaryPreferred":
                tableValue = 100;
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
                resultAbility = ability;
            }
        })

        return resultAbility
    }
    else {
        return false
    }
}

export default getPreferredAbility;
