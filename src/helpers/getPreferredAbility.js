import preferredAbilitiesByClass from '../data/preferredAbilitiesByClass';

const getPreferredAbility = (charClass, abilityType, combatType) => {
  if
  (
    charClass.length > 0 &&
        (
          abilityType === 'primaryPreferred' ||
          abilityType === 'primaryOther' ||
          abilityType === 'primaryEqual' ||
          abilityType === 'secondaryPreferred' ||
          abilityType === 'secondaryOther' ||
          abilityType === 'secondaryEqual'
        ) &&
        combatType.length > 0
  ) {
    let tableValue = 0;
    const table = preferredAbilitiesByClass[charClass][combatType];
    const resultAbilityArray = [];

    switch (abilityType) {
      case 'primaryPreferred':
        tableValue = 100;
        break;
      case 'primaryEqual':
        tableValue = 50;
        break;
      case 'primaryOther':
        tableValue = 10;
        break;
      case 'secondaryPreferred':
        tableValue = 5;
        break;
      case 'secondaryEqual':
        tableValue = 3;
        break;
      case 'secondaryOther':
        tableValue = 1;
        break;
    }

    Object.keys(table).forEach((ability) => {
      if (table[ability] === tableValue) {
        resultAbilityArray.push(ability);
      }
    });

    if (resultAbilityArray.length === 0) {
      return false;
    }
    else if (resultAbilityArray.length === 1) {
      return resultAbilityArray[0];
    }
    else {
      return resultAbilityArray;
    }
  }
  else {
    return false;
  }
};

export default getPreferredAbility;
