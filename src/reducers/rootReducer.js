import { fromJS } from 'immutable';
import translations from "../translations";
import isTextInputFilled from "../helpers/isTextInputFilled";
import tables from "../data/tables";
import sumCollectionValues from "../helpers/sumCollectionValues";
import getDerivedAbilities from "../calculations/getDerivedAbilities";
import getAbilities from "../calculations/getAbilities";
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
          var rangeLimit =  state.getIn(["character", "background", "rangeLimit"]);

          if (
            isTextInputFilled(originField) &&
            isTextInputFilled(propertyField) &&
            isTextInputFilled(skillsField) &&
            rangeLimit &&
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

          let distributeArray = {};
          if (state.getIn(["errata", "backgroundPointsHasNoRangeLimit"])) {
            // Apply errata => all points to skills
            distributeArray["origin"] = 0;
            distributeArray["property"] = 0;
            distributeArray["skills"] = 5;
          }
          else {
            distributeArray["origin"] = 1;
            distributeArray["property"] = 0;
            distributeArray["skills"] = 4;
          }

          return state.setIn(["character", "background", "name"], "goodAbility")
                      .setIn(["character", "background", "total"], totalPoints)
                      .setIn(["character", "background", "distributed", "origin"], parseInt(distributeArray["origin"]))
                      .setIn(["character", "background", "distributed", "property"], parseInt(distributeArray["property"]))
                      .setIn(["character", "background", "distributed", "skills"], parseInt(distributeArray["skills"]));
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
        // console.log(key.length)
        // console.log(value.length)

        if (key.length && value.length) {
          // Set background points
          return state.setIn(["character", "background", "distributed", key], parseInt(value));
        }
        else {
          return state;
        }

      case "RESOLVE_BACKGROUND":
        let rangeLimit = false;

        if (state.getIn(["errata", "backgroundPointsHasNoRangeLimit"])) {
          // Apply errata => rangeLimit always true (no limitation)
          rangeLimit = true;
        }
        else {

          // Set value for background to current value from argument OR value from state OR 0
          let distributedOrigin = 0;
          if (state.getIn(["character", "background", "distributed", "origin"]) > 0) {
            distributedOrigin = state.getIn(["character", "background", "distributed", "origin"])
          }

          let distributedProperty = 0;
          if (state.getIn(["character", "background", "distributed", "property"]) > 0) {
            distributedProperty = state.getIn(["character", "background", "distributed", "property"])
          }

          let distributedSkills = 0;
          if (state.getIn(["character", "background", "distributed", "skills"]) > 0) {
            distributedSkills = state.getIn(["character", "background", "distributed", "skills"])
          }
          // console.log(distributedOrigin, distributedProperty, distributedSkills)

          if ( (distributedProperty - distributedOrigin) <= 3 && (distributedSkills - distributedOrigin) <= 3 ) {
            rangeLimit = true;
          }
        }
        // console.log("rangeLimit: " + rangeLimit)

        // Set background points
        return state.setIn(["character", "background", "rangeLimit"], rangeLimit);

      case "CALCULATE_ABILITIES":
        var charRace = state.getIn(["character", "info", "race"]);
        var charSex = state.getIn(["character", "info", "sex"]);
        var charClass = state.getIn(["character", "info", "class"]);

        var finalAbilities =  getAbilities(charRace, charSex, charClass);

        // Set all main abilities
        return state.setIn(["character", "abilities", "strength"], parseInt(finalAbilities["strength"]))
                    .setIn(["character", "abilities", "dexterity"], parseInt(finalAbilities["dexterity"]))
                    .setIn(["character", "abilities", "manualdexterity"], parseInt(finalAbilities["manualdexterity"]))
                    .setIn(["character", "abilities", "will"], parseInt(finalAbilities["will"]))
                    .setIn(["character", "abilities", "intelligence"], parseInt(finalAbilities["intelligence"]))
                    .setIn(["character", "abilities", "charisma"], parseInt(finalAbilities["charisma"]))

      case "CALCULATE_DERIVED_ABILITIES":
        var charRace = state.getIn(["character", "info", "race"]);
        var strength = state.getIn(["character", "abilities", "strength"]);
        var dexterity = state.getIn(["character", "abilities", "dexterity"]);
        var manualdexterity = state.getIn(["character", "abilities", "manualdexterity"]);
        var will = state.getIn(["character", "abilities", "will"]);
        var intelligence = state.getIn(["character", "abilities", "intelligence"]);
        var charisma = state.getIn(["character", "abilities", "charisma"]);

        var finalDerivedAbilities = getDerivedAbilities(charRace, strength, dexterity, manualdexterity, will, intelligence, charisma);

        // Set all main abilities
        return state.setIn(["character", "derivedAbilities", "resistance"], parseInt(finalDerivedAbilities["resistance"]))
                    .setIn(["character", "derivedAbilities", "fortitude"], parseInt(finalDerivedAbilities["fortitude"]))
                    .setIn(["character", "derivedAbilities", "speed"], parseInt(finalDerivedAbilities["speed"]))
                    .setIn(["character", "derivedAbilities", "senses"], parseInt(finalDerivedAbilities["senses"]))
                    .setIn(["character", "derivedAbilities", "beauty"], parseInt(finalDerivedAbilities["beauty"]))
                    .setIn(["character", "derivedAbilities", "danger"], parseInt(finalDerivedAbilities["danger"]))
                    .setIn(["character", "derivedAbilities", "dignity"], parseInt(finalDerivedAbilities["dignity"]));

      case "SET_ERRATA":
        var key = action.payload.key;
        var value = action.payload.value;

        return state.setIn(["errata", key], value)


	    default:
      	return state;
  	}
};

export default rootReducer;
