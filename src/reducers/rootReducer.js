import { fromJS } from 'immutable';
import translations from "../translations";
import isTextInputFilled from "../helpers/isTextInputFilled";
import tables from "../data/tables";
import sumCollectionValues from "../helpers/sumCollectionValues";

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
      },
      "background": {
        "name": "",
        "total": 0,
        "distributed": {
          "origin": "",
          "property": "",
          "skills": ""
        },
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
        var key = action.payload.key;
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
        else if (active == "screenBackground") {
          // Checks screen no. 2
          var originField = state.getIn(["character", "background", "distributed", "origin"]);
          var propertyField = state.getIn(["character", "background", "distributed", "property"]);
          var skillsField = state.getIn(["character", "background", "distributed", "skills"]);
          // User have to distribute all available points
          var totalPoints = state.getIn(["character", "background", "total"]);
          var distributedPoints = sumCollectionValues( state.getIn(["character", "background", "distributed"]) );

          if (
            isTextInputFilled(originField) &&
            isTextInputFilled(propertyField) &&
            isTextInputFilled(skillsField) &&
            parseInt(totalPoints - distributedPoints) === 0
            )
          {
            // console.log("Screen screenBackground is valid!");
            return state.setIn(["screens", "screenBackground"], 1).setIn(["screens", "screenAbilities"], 0);
          }
          else {
            // console.log("Screen screenBackground is not valid :-(");
            return state.setIn(["screens", "screenBackground"], 0).setIn(["screens", "screenAbilities"], -1);
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

      case "SET_BACKGROUND":
        var name = action.payload.name;

        if (name.length) {
          let totalPoints = tables.background[name]["totalPoints"];

          // Set background name and total points (from tables)
          return state.setIn(["character", "background", "total"], totalPoints)
                      .setIn(["character", "background", "name"], name)
                      .setIn(["character", "background", "distributed", "origin"], "")
                      .setIn(["character", "background", "distributed", "property"], "")
                      .setIn(["character", "background", "distributed", "skills"], "");
        }
        else {
          // Reset background name and total points
          return state.setIn(["character", "background", "total"], "")
                      .setIn(["character", "background", "name"], "")
                      .setIn(["character", "background", "distributed", "origin"], "")
                      .setIn(["character", "background", "distributed", "property"], "")
                      .setIn(["character", "background", "distributed", "skills"], "");
        }
        
      case "DISTRIBUTE_BACKGROUND":
        var key = action.payload.key;
        var value = action.payload.value;
        console.log(key.length)
        console.log(value.length)
        if (key.length && value.length) {

          // Set background name and total points (from tables)
          return state.setIn(["character", "background", "distributed", key], parseInt(value));
        }
        else {
          // Reset background name and total points
          return state;
        }
        
              
	    default:
      	return state;
  	}
};

export default rootReducer;
