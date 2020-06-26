import { fromJS, Map } from 'immutable';
import tables from '../data/tables';

const levelObject = fromJS(
  {
    abilities: {
      strength: {
        value: 0,
        disabled: false,
      },
      dexterity: {
        value: 0,
        disabled: false,
      },
      manualdexterity: {
        value: 0,
        disabled: false,
      },
      will: {
        value: 0,
        disabled: false,
      },
      intelligence: {
        value: 0,
        disabled: false,
      },
      charisma: {
        value: 0,
        disabled: false,
      },
    },
    mainAbilityPoints: 0,
    secondaryAbilityPoints: 0,
    maximumAbilityPoint: 0,
  },
);

const createLevelsState = (level, charBackground) => {
  if (typeof level === 'number' && level > 0) {
    let finalObject = Map();

    // Create immutable Map, copy levelObject as default state for each level
    for (let i = 1; i <= level; i++) {
      finalObject = finalObject.set(i, levelObject);
    }

    // Fill object with relevant values for each level
    finalObject.mapKeys(level => {
      // Set available points
      let mainAbilityPoints;
      let secondaryAbilityPoints;
      let maximumAbilityPoint;

      if (level === 1) {
        mainAbilityPoints = tables.background[charBackground].mainAbilityPoints;
        secondaryAbilityPoints = tables.background[charBackground].secondaryAbilityPoints;
        maximumAbilityPoint = tables.background[charBackground].maximumAbilityPoint;
      }
      else {
        mainAbilityPoints = 1;
        secondaryAbilityPoints = 1;
        maximumAbilityPoint = 1;
      }

      finalObject = finalObject.setIn([level, 'mainAbilityPoints'], mainAbilityPoints)
        .setIn([level, 'secondaryAbilityPoints'], secondaryAbilityPoints)
        .setIn([level, 'maximumAbilityPoint'], maximumAbilityPoint);
    });

    return finalObject;
  }
  else {
    return false;
  }
};

export default createLevelsState;
