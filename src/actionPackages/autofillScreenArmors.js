import getArmorMissingStrength from '../calculations/getArmorMissingStrength';
import tables from '../data/tables';
import store from '../store/index';
import changeArmor from './changeArmor';

// Global points for both bodyArmor and helmets
let availableLimitationPoints = 0;

const getRecommendedArmor = (armorType, charStrength, charRace) => {
  const armors = tables.armors;

  if (typeof armors[armorType] !== 'undefined') {
    let lastArmor = '';
    let lastLimitation = 0;

    Object.keys(armors[armorType]).forEach((armor) => {
      const armorsNecessaryStrength = armors[armorType][armor].necessaryStrength;
      const armorMissingStrength = getArmorMissingStrength(armorsNecessaryStrength, charStrength, charRace);
      const armorLimitation = armors[armorType][armor].limitation;

      if (armorMissingStrength <= 0 && (availableLimitationPoints + armorLimitation) >= 0) {
        // Save armor if character has enough strength
        lastArmor = armor;
        lastLimitation = armorLimitation;
      }
    });

    // Substract limitation of recommended weapon from global points
    availableLimitationPoints += lastLimitation;

    return lastArmor;
  }

  return false;
};

const autofillScreenArmors = () => {
  const state = store.getState();
  const charStrength = state.getIn(['character', 'abilities', 'strength']);
  const charRace = state.getIn(['character', 'info', 'race']);
  const wearingArmorLevel = state.getIn(['character', 'skills', 'distributed', 'combat', 'wearingArmor']);
  // Set global points
  availableLimitationPoints = wearingArmorLevel;

  ['bodyArmors', 'helmets'].forEach((armorType) => {
    const charArmorNecessaryStrength = state.getIn(['character', 'armors', armorType, 'necessaryStrength']);

    // Continue only if user has chose "no armor" option
    if (charArmorNecessaryStrength === -10) {
      const armorName = getRecommendedArmor(armorType, charStrength, charRace);

      if (armorName) {
        // Add weapon to state
        changeArmor(armorName, armorType);
      }
    }
    else {
      // Substract limitation of user chosen weapon from global points
      const charArmorLimitation = state.getIn(['character', 'armors', armorType, 'limitation']);
      availableLimitationPoints += charArmorLimitation;
    }
  });
};

export default autofillScreenArmors;
