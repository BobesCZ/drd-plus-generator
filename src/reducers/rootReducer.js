import { fromJS } from 'immutable';

const initialState = fromJS(
  {
    // Main character object
    "character": {
      "info": {
        "name": "Default",
        "race": "",
        "career": "",
        "level": "",
        "sex": "",
        "note": ""
      }
    }
  }
);

const rootReducer = (state = initialState, action) => {
 	switch (action.type) {
	    case "CHANGE_INFO":
        let key = action.payload.key;
        // console.log(action.payload)
        return state.setIn(["character", "info", key], action.payload.value);
              
	    default:
      	return state;
  	}
};

export default rootReducer;