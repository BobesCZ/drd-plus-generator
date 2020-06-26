import { Map } from 'immutable';

const isLevelRowCompleted = (levelRow) => {
  const mainAbilityPoints = levelRow.get('mainAbilityPoints');
  const secondaryAbilityPoints = levelRow.get('secondaryAbilityPoints');
  const sumAvailablePoints = parseInt(mainAbilityPoints) + parseInt(secondaryAbilityPoints);
  let sumDistributedPoints = 0;
  let notDisabledCount = 0;

  if (Map.isMap(levelRow)) {
    levelRow.get('abilities').keySeq().forEach((ability) => {
      const disabled = levelRow.getIn(['abilities', ability, 'disabled']);
      const value = levelRow.getIn(['abilities', ability, 'value']);

      sumDistributedPoints += parseInt(value);

      if (!disabled) {
        notDisabledCount += 1;
      }
    });

    // Row is completed when:
    // 1. All (main and secondary) ability points are distributed
    // 2. All abilities are disabled (user cannot increase any of the abilities)

    if (
      parseInt(sumAvailablePoints) === parseInt(sumDistributedPoints) &&
      notDisabledCount === 0
    ) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};

export default isLevelRowCompleted;
