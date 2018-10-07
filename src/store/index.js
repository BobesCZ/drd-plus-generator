import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";

// Vytvoření store
const store = createStore(rootReducer);

// Změna store
store.subscribe(() => {
	console.log( "--------- Store state: ---------");
	console.log( store.getState() );
});

export default store;