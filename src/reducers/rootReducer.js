import { fromJS } from 'immutable';
import translations from "../translations";
import isTextInputFilled from "../helpers/isTextInputFilled";

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
    "activeScreen": "screenCharacter",
    "screens": {
      // States: 
      // -1 => disabled 
      // 0 => not completed
      // 1 => completed
      "screenCharacter": 0,
      "screenBackground": -1,
      "screenAbilities": -1,
      "screenSkills": -1,
      "screenWeapons": -1,
      "screenArmors": -1,
      "screenExport":-1
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
        var active = action.payload.active;
        // console.log(action.payload)
        return state.set("activeScreen", active);
              
      case "RESOLVE_SCREEN":
        var active = action.payload.active;

        if (active == "screenCharacter") {
          // Checks screen no. 1
          var nameField = state.getIn(["character", "info", "name"]);
          var raceField = state.getIn(["character", "info", "race"]);
          var classField = state.getIn(["character", "info", "class"]);
          var levelField = state.getIn(["character", "info", "level"]);
          var sexField = state.getIn(["character", "info", "sex"]);

          if (
            isTextInputFilled(nameField) &&
            isTextInputFilled(raceField) &&
            isTextInputFilled(classField) &&
            isTextInputFilled(levelField) &&
            isTextInputFilled(sexField)
            )
          {
            // console.log("Screen screenCharacter is valid!");
            return state.setIn(["screens", "screenCharacter"], 1).setIn(["screens", "screenBackground"], 0);
          }
          else {
            // console.log("Screen screenCharacter is not valid :-(");
            return state.setIn(["screens", "screenCharacter"], 0).setIn(["screens", "screenBackground"], -1);
          }
        }

        return state;

      case "AUTOFILL_SCREEN":
        var screen = action.payload.screen;

        if (screen == "screenCharacter") {
          // Autofill screen no. 1
          var nameField = state.getIn(["character", "info", "name"]);

          if (!isTextInputFilled(nameField)) {
            // console.log("Field: Name not filled, fill it!");
            // Set initial name to Random peasant
            let nameValue = translations["default-name"] + Math.floor(Math.random() * 100);
            return state.setIn(["character", "info", "name"], nameValue);
          }          
        }
        
        return state;
              
	    default:
      	return state;
  	}
};

export default rootReducer;
