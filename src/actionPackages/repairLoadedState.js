import screensArray from '../helpers/screensArray.js';

const repairLoadedState = (state) => {
  // 1. set active screen to first screen
  const firstScreen = screensArray[0];
  state = state.setIn(['activeScreen'], firstScreen);

  // 2. Convert iterators in Levels from strings to integers
  let levelsState = state.getIn(['character', 'levels']);
  levelsState = levelsState.mapKeys(key => {
    return parseInt(key);
  });
  state = state.setIn(['character', 'levels'], levelsState);

  return state;
};

export default repairLoadedState;
