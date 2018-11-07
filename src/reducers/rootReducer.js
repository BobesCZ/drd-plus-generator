import { fromJS } from 'immutable';
import translations from "../translations";

const initialState = fromJS(
  {
    // Main character object
    "character": {
      "info": {
        "name": "",
        "race": "",
        "class": "",
        "level": "",
        "sex": "",
        "note": ""
      }
    },
    "screens": {
      "active": "1",
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0
    }
  }
);

const rootReducer = (state = initialState, action) => {
 	switch (action.type) {
	    case "CHANGE_INFO":
        let key = action.payload.key;
        // console.log(action.payload)
        return state.setIn(["character", "info", key], action.payload.value);
      
      case "CHANGE_SCREEN":
        let active = action.payload.active;
        // console.log(action.payload)
        return state.setIn(["screens", "active"], active);
              
	    default:
      	return state;
  	}
};

export default rootReducer;
