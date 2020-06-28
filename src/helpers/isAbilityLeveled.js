import { Map } from 'immutable';

const isAbilityLeveled = (ability, levels, currentLevel, previousLevelsCount) => {
  let sum = 0;

  if (
    ability.length > 0 &&
    Map.isMap(levels) &&
    typeof currentLevel === 'number' &&
    typeof previousLevelsCount === 'number'
  ) {
    if (
      currentLevel > 2 &&
      currentLevel - previousLevelsCount > 1
    ) {
      for (var i = 1; i <= previousLevelsCount; i++) {
        const level = parseInt(currentLevel) - i;
        const value = levels.getIn([level, 'abilities', ability, 'value']);
        sum += parseInt(value);
      }

      if (sum === previousLevelsCount) {
        // Ability was leveled in (all) previous levels
        return true;
      }
    }

    return false;
  }
  else {
    return false;
  }
};

export default isAbilityLeveled;
