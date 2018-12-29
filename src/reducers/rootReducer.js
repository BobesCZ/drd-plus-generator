import { fromJS } from 'immutable';
import translations from "../translations";
import isTextInputFilled from "../helpers/isTextInputFilled";
import tables from "../data/tables";
import getOrderedSkills from "../calculations/getOrderedSkills";
import sumCollectionValues from "../helpers/sumCollectionValues";
import createLevelsState from "../helpers/createLevelsState";
import isAbilityMain from "../helpers/isAbilityMain";
import isAbilityLeveled from "../helpers/isAbilityLeveled";
import isLevelRowCompleted from "../helpers/isLevelRowCompleted";
import getAbilities from "../calculations/getAbilities";
import getDerivedAbilities from "../calculations/getDerivedAbilities";
import getCombatParameters from "../calculations/getCombatParameters";
import isAbilityOnRaceLimit from "../calculations/isAbilityOnRaceLimit";
import getBackgroundSkillsPoints from "../calculations/getBackgroundSkillsPoints";
import getLevelingSkillsPoints from "../calculations/getLevelingSkillsPoints";
import getDistributedSkillsPoints from "../calculations/getDistributedSkillsPoints";
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
            return state.setIn(["screens", "screenCharacter"], 1)
                        .setIn(["screens", "screenBackground"], 0)
          }
          else {
            // console.log("Screen screenCharacter is not valid :-(");
            return state.setIn(["screens", "screenCharacter"], 0)
                        .setIn(["screens", "screenBackground"], -1)
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
            return state.setIn(["screens", "screenBackground"], 1)
                        .setIn(["screens", "screenAbilities"], 0)
          }
          else {
            // console.log("Screen screenBackground is not valid :-(");
            return state.setIn(["screens", "screenBackground"], 0)
                        .setIn(["screens", "screenAbilities"], -1)
          }
        }
        else if (active == "screenAbilities") {
          // Checks screen no. 2
          var charLevel = state.getIn(["character", "info", "level"]);
          var allLevelsCompleted = true;

          for (var i = 1; i <= parseInt(charLevel); i++) {
            var levelRow = state.getIn(["character", "levels", i]);
            var isCompleted = isLevelRowCompleted(levelRow);

            if (!isCompleted) {
              allLevelsCompleted = false;
              break;
            }
          }

          if (allLevelsCompleted)
          {
            // console.log("Screen screenAbilities is valid!");
            return state.setIn(["screens", "screenAbilities"], 1)
                        .setIn(["screens", "screenSkills"], 0)
          }
          else {
            // console.log("Screen screenAbilities is not valid :-(");
            return state.setIn(["screens", "screenAbilities"], 0)
                        .setIn(["screens", "screenSkills"], -1)
          }
        }

        else if (active == "screenSkills") {
          var skills = state.getIn(["character", "skills", "distributed"]);
          var availablePoints = state.getIn(["character", "skills", "availablePoints"]);
          var currentAvailablePointsArray = []
          var allRowsCompleted = true;

          skills.keySeq().forEach((key) => {
            var distributedSkillsPoints = getDistributedSkillsPoints(state.getIn(["character", "skills"]), key)
            var availableSkillsPoints = availablePoints.get(key)

            // Combat points are equal to physical (except for warriors, that have positive value in combat points)
            if (key === "combat" && availableSkillsPoints === 0) {
              availableSkillsPoints = availablePoints.get("physical")
            }

            let currentAvailablePoints = parseInt(availableSkillsPoints) - parseInt(distributedSkillsPoints)
            currentAvailablePointsArray[key] = currentAvailablePoints
          })

          for (key in currentAvailablePointsArray) {
            if (currentAvailablePointsArray[key] > 0) {
              allRowsCompleted = false
              break;
            }
          }

          if (allRowsCompleted)
          {
            // console.log("Screen screenSkills is valid!");
            return state.setIn(["screens", "screenSkills"], 1)
                        .setIn(["screens", "screenWeapons"], 0)
          }
          else {
            // console.log("Screen screenSkills is not valid :-(");
            return state.setIn(["screens", "screenSkills"], 0)
                        .setIn(["screens", "screenWeapons"], -1)
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
        var levels = state.getIn(["character", "levels"]);

        var finalAbilities =  getAbilities(charRace, charSex, charClass, levels);

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
                    .setIn(["character", "derivedAbilities", "dignity"], parseInt(finalDerivedAbilities["dignity"]))

      case "CALCULATE_COMBAT_PARAMETERS":
        var charRace = state.getIn(["character", "info", "race"]);
        var charClass = state.getIn(["character", "info", "class"]);
        var dexterity = state.getIn(["character", "abilities", "dexterity"]);
        var manualdexterity = state.getIn(["character", "abilities", "manualdexterity"]);
        var intelligence = state.getIn(["character", "abilities", "intelligence"]);
        var charisma = state.getIn(["character", "abilities", "charisma"]);
        var resistance = state.getIn(["character", "derivedAbilities", "resistance"]);

        var finalCombatParameters = getCombatParameters(charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance)

        return state.setIn(["character", "combatParameters", "combatSpeed"], parseInt(finalCombatParameters["combatSpeed"]))
                    .setIn(["character", "combatParameters", "attack"], parseInt(finalCombatParameters["attack"]))
                    .setIn(["character", "combatParameters", "shoot"], parseInt(finalCombatParameters["shoot"]))
                    .setIn(["character", "combatParameters", "defense"], parseInt(finalCombatParameters["defense"]))
                    .setIn(["character", "combatParameters", "health"], parseInt(finalCombatParameters["health"]))


      case "SET_ERRATA":
        var key = action.payload.key;
        var value = action.payload.value;

        return state.setIn(["errata", key], value)

      case "SET_SWITCHER":
        var key = action.payload.key;
        var value = action.payload.value;

        return state.setIn(["switchers", key], value)

      case "RESOLVE_LEVELS":

        let level = parseInt( state.getIn(["character", "info", "level"]) )
        let charBackground = state.getIn(["character", "background", "name"])
        let levelsState

        // TEMP
        // We need background (that user choose at screen 2) at screen 1
        // For now, let assume that user chose something
        if (!isTextInputFilled(charBackground)) {
          charBackground ="goodAbility";
        }

        levelsState = createLevelsState(level, charBackground)

        if (levelsState) {
          return state.setIn(["character", "levels"], levelsState)
        }
        else {
          return state;
        }


      case "CHANGE_ABILITY_VALUE":
        var ability = action.payload.ability;
        var level = action.payload.level;
        var changeValue = action.payload.changeValue;
        // console.log(ability, level, changeValue)

        var currentValue = state.getIn(["character", "levels", parseInt(level), "abilities", ability, "value"])
        var newValue = currentValue + parseInt(changeValue)

        return state.setIn(["character", "levels", parseInt(level), "abilities", ability, "value"], newValue)

      case "RESOLVE_ABILITY_VALUES":
        var level = action.payload.level;
        var charClass = state.getIn(["character", "info", "class"]);
        let charLevel = state.getIn(["character", "info", "level"]);

        // In changeAbility() we try to resolve next level
        // In case of last level, there is no next level => return without changes
        if (level > charLevel) {
          return state
        }

        var levels = state.getIn(["character", "levels"]);
        var abilities = state.getIn(["character", "levels", parseInt(level), "abilities"]);

        var mainDistributedPoints = 0;
        var mainAbilityPoints = state.getIn(["character", "levels", parseInt(level), "mainAbilityPoints"]);
        var mainAbilitiesArray = [];

        var derivedDistributedPoints = 0;
        var secondaryAbilityPoints = state.getIn(["character", "levels", parseInt(level), "secondaryAbilityPoints"]);
        var secondaryAbilitiesArray = [];

        var maximumAbilityPoint = state.getIn(["character", "levels", parseInt(level), "maximumAbilityPoint"]);

        abilities.keySeq().forEach((key) => {

          if ( isAbilityMain(charClass, key) ) {
            mainAbilitiesArray.push(key);
          }
          else {
            secondaryAbilitiesArray.push(key);
          }
        })

        // Sum all main and derived points distributed so far
        mainAbilitiesArray.forEach((key) => {
          var value = abilities.getIn([key, "value"])
          mainDistributedPoints += parseInt(value);
        })

        secondaryAbilitiesArray.forEach((key) => {
          var value = abilities.getIn([key, "value"])
          derivedDistributedPoints += parseInt(value);
        })

        // Ability is disabled when one of these conditions is true:
        // 1. User hit the limit of maximum points for one ability
        // 2. User hit the ability race limit (only at first level)
        // 3. User increased the ability in previous steps (allowed 2x for main and 1x for derived ability)
        // 4. Sum of all main/derived abilities is equal to distributed points (user has no points left)

        abilities.keySeq().forEach((key) => {
          var value = abilities.getIn([key, "value"])

          if (
              parseInt(value) === parseInt(maximumAbilityPoint) ||
              isAbilityOnRaceLimit(parseInt(level), key, charClass, value) ||
              (
                isAbilityMain(charClass, key) &&
                isAbilityLeveled(key, levels, parseInt(level), 2)
              ) ||
              (
                !isAbilityMain(charClass, key) &&
                isAbilityLeveled(key, levels, parseInt(level), 1)
              ) ||
              (
                isAbilityMain(charClass, key) &&
                mainDistributedPoints === mainAbilityPoints
              ) ||
              (
                !isAbilityMain(charClass, key) &&
                derivedDistributedPoints === secondaryAbilityPoints
              )
            )
          {
            abilities = abilities.setIn([key, "disabled"], true)
          }
          else {
            abilities = abilities.setIn([key, "disabled"], false)
          }

        })

        return state.setIn(["character", "levels", parseInt(level), "abilities"], abilities)

      case "SET_SKILLS_POINTS":
        var charClass = state.getIn(["character", "info", "class"])
        var backgroundPoints = state.getIn(["character", "background", "distributed", "skills"])
        var levels = state.getIn(["character", "levels"])

        // TEMP
        // We need background (that user choose at screen 2) at screen 1
        // For now, let assume that user chose something
        if (!isTextInputFilled(backgroundPoints)) {
          backgroundPoints = 0;
        }

        var physicalPoints = 0
        var psychicalPoints = 0
        var combinedPoints = 0

        // TODO: warrior has extra combat points, for other classes combatPoints are equal to physical
        var combatPoints = 0

        var availablePointsBackground = getBackgroundSkillsPoints(charClass, backgroundPoints)
        var availablePointsLeveling = getLevelingSkillsPoints(levels)

        physicalPoints = parseInt(availablePointsBackground["physical"]) + parseInt(availablePointsLeveling["physical"])
        psychicalPoints = parseInt(availablePointsBackground["psychical"]) + parseInt(availablePointsLeveling["psychical"])
        combinedPoints = parseInt(availablePointsBackground["combined"]) + parseInt(availablePointsLeveling["combined"])

        return state.setIn(["character", "skills", "availablePoints", "physical"], physicalPoints)
                    .setIn(["character", "skills", "availablePoints", "psychical"], psychicalPoints)
                    .setIn(["character", "skills", "availablePoints", "combined"], combinedPoints)
                    .setIn(["character", "skills", "availablePoints", "combat"], combatPoints)

      case "RESOLVE_SKILLS":
        var orderedSkills = getOrderedSkills()

        return state.setIn(["character", "skills", "distributed", "physical"], orderedSkills["physical"])
                    .setIn(["character", "skills", "distributed", "psychical"], orderedSkills["psychical"])
                    .setIn(["character", "skills", "distributed", "combined"], orderedSkills["combined"])
                    .setIn(["character", "skills", "distributed", "combat"], orderedSkills["combat"])

      case "SET_SKILL":
        var skillName = action.payload.skillName
        var skillType = action.payload.skillType
        var value = action.payload.value

        return state.setIn(["character", "skills", "distributed", skillType, skillName], parseInt(value))

      default:
        return state;
  	}
};

export default rootReducer;
