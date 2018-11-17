import { fromJS } from 'immutable';
import translations from "../translations";
import isTextInputFilled from "../helpers/isTextInputFilled";
import tables from "../data/tables";
import sumCollectionValues from "../helpers/sumCollectionValues";
import initialState from "./initialState";

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
        else if (screen == "screenBackground") {
          // Autofill screen no. 2
          // Set background to choice no. 1
          let totalPoints = tables.background["goodAbility"]["totalPoints"];
          return state.setIn(["character", "background", "name"], "goodAbility")
                      .setIn(["character", "background", "total"], totalPoints)
                      .setIn(["character", "background", "distributed", "origin"], parseInt(0))
                      .setIn(["character", "background", "distributed", "property"], parseInt(0))
                      .setIn(["character", "background", "distributed", "skills"], parseInt(5));
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

          // Set background points
          return state.setIn(["character", "background", "distributed", key], parseInt(value));
        }
        else {
          return state;
        }

      case "CALCULATE_SHEET":
        var charRace = state.getIn(["character", "info", "race"]);
        var charSex = state.getIn(["character", "info", "sex"]);
        var charClass = state.getIn(["character", "info", "class"]);
        var results = [];

        if (charRace.length && charSex.length && charClass.length) {
          state.getIn(["character", "abilities"]).keySeq().forEach(key => {
            // @SOURCE: Tabulka ras
            var raceValue = tables.abilities.race[charRace][key];

            // @SOURCE: Tabulka oprav pro pohlaví
            var sexValue = 0;
            if (charSex == "female") {
              sexValue = tables.abilities.sex[charRace][key];
            }

            // @SOURCE: Tabulka hlavních vlastností podle povolání
            var classValue = tables.abilities.class[charClass][key];

            // Sum all values
            if (typeof(raceValue) === "number") {
              results[key] = parseInt(raceValue) + parseInt(sexValue) + parseInt(classValue);
            }
          });

          // Set all main abilities
          return state.setIn(["character", "abilities", "strength"], parseInt(results["strength"]))
                      .setIn(["character", "abilities", "dexterity"], parseInt(results["dexterity"]))
                      .setIn(["character", "abilities", "manualdexterity"], parseInt(results["manualdexterity"]))
                      .setIn(["character", "abilities", "will"], parseInt(results["will"]))
                      .setIn(["character", "abilities", "intelligence"], parseInt(results["intelligence"]))
                      .setIn(["character", "abilities", "charisma"], parseInt(results["charisma"]));
        }
        else {
          // Reset
          return state;
        }
        
              
	    default:
      	return state;
  	}
};

export default rootReducer;
