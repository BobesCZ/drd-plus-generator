import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { fromJS } from 'immutable';

let store;

if (window.localStorage && localStorage.hasOwnProperty("drdgenState")) {
	// Get the whole state from browser's localStorage
	let savedState = localStorage.getItem("drdgenState");
	// Format state to immutable format
	savedState = fromJS(JSON.parse(savedState))
	// Create store with savedState
	store = createStore(rootReducer, savedState);
}
else {
	// Create store with initialState
	store = createStore(rootReducer);
}

// Změna store
store.subscribe(() => {
	// console.log( "--------- Store state: ---------");
	// console.log( store.getState() );
 	// console.log(JSON.stringify(store.getState(), null, 2))
	// let state = store.getState();
 	// console.log(JSON.stringify(state.get("screens"), null, 2))
});

export default store;
