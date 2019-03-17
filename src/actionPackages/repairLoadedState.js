const repairLoadedState = (state) => {

    // 1. Convert iterators in Levels from strings to integers
    let levelsState = state.getIn(["character", "levels"])
    levelsState = levelsState.mapKeys(key => {
        return parseInt(key)
    })
    state = state.setIn(["character", "levels"], levelsState)

    return state
};

export default repairLoadedState;
