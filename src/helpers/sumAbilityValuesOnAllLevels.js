import { Map } from 'immutable';

const sumAbilityValuesOnAllLevels = (ability, levels) => {
  let sum = 0;

  if (ability.length > 0 && Map.isMap(levels)) {
    levels.keySeq().forEach((level) => {
      const value = levels.getIn([level, 'abilities', ability, 'value']);

      sum += parseInt(value);
    });

    return sum;
  }
  else {
    return false;
  }
};

export default sumAbilityValuesOnAllLevels;
