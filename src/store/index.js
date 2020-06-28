import { fromJS } from 'immutable';
import { createStore } from 'redux';
import repairLoadedState from '../actionPackages/repairLoadedState';
import rootReducer from '../reducers/rootReducer';

let store;

if (window.localStorage && Object.prototype.hasOwnProperty.call(localStorage, 'drdgenState')) {
  // Get the whole state from browser's localStorage
  let savedState = localStorage.getItem('drdgenState');

  // Format state to immutable format
  savedState = fromJS(JSON.parse(savedState));
  // Repair store to immutable objects
  const repairedState = repairLoadedState(savedState);

  // Create store with repaired state
  store = createStore(rootReducer, repairedState);
}
else {
  // Create store with initialState
  store = createStore(rootReducer);
}

// Změna store
store.subscribe(() => {
  // console.log('--------- Store state: ---------');
  // console.log(store.getState());
  // console.log(JSON.stringify(store.getState(), null, 2));
  // const state = store.getState();
  // console.log(JSON.stringify(state.get('screens'), null, 2));
});

export default store;
