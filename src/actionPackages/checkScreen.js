import store from "../store/index";
import setScreen from "../actions/setScreen";
import getDistributedSkillsPoints from "../calculations/getDistributedSkillsPoints";
import screensArray from "../helpers/screensArray";
import isLevelRowCompleted from "../helpers/isLevelRowCompleted";
import isTextInputFilled from "../helpers/isTextInputFilled";
import sumCollectionValues from "../helpers/sumCollectionValues";
import getNextArrayItem from "../helpers/getNextArrayItem";

const STATUS_DISABLED = -1;
const STATUS_NOT_COMPLETED = 0;
const STATUS_COMPLETED = 1;

const isScreenValid = (screen) => {
	let state = store.getState();

	switch (screen) {
		case "screenCharacter":
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
				// Screen is valid
				return true;
			}
			else {
				// Screen is not valid
				return false;
			}

		case "screenBackground":
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
				// Screen is valid
				return true;
			}
			else {
				// Screen is not valid
				return false;
			}

		case "screenAbilities":
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
				// Screen is valid
				return true;
			}
			else {
				// Screen is not valid
				return false;
			}

		case "screenSkills":
			var skills = state.getIn(["character", "skills", "distributed"]);
			var charClass = state.getIn(["character", "info", "class"]);
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

				// Handle extra points for Warrior
				if (charClass === "warrior") {

					if (key === "physical") {
						// Distributed Combat points - check if points are "above combat", and if so, add to Physical distributed points
						let distributedSkillsPointsCombat = getDistributedSkillsPoints(state.getIn(["character", "skills"]), "combat") - availablePoints.get("combat")

						if (distributedSkillsPointsCombat < 0) {
							distributedSkillsPointsCombat = 0
						}
						distributedSkillsPoints = distributedSkillsPointsCombat + getDistributedSkillsPoints(state.getIn(["character", "skills"]), "physical")
					}

					else if (key === "combat") {
						// Distributed Physical points are shared with Combat points
						distributedSkillsPoints = getDistributedSkillsPoints(state.getIn(["character", "skills"]), "combat") + getDistributedSkillsPoints(state.getIn(["character", "skills"]), "physical")

						// Combat points = (available Combat points) + (available Physical points)
						availableSkillsPoints += availablePoints.get("physical")
					}
				}

				let currentAvailablePoints = parseInt(availableSkillsPoints) - parseInt(distributedSkillsPoints)

				// Warriors may have negative currentAvailablePoints for Physical => consider it as 0
				if (currentAvailablePoints < 0) {
					currentAvailablePoints = 0
				}

				currentAvailablePointsArray[key] = currentAvailablePoints
			})

			for (var key in currentAvailablePointsArray) {
				if (currentAvailablePointsArray[key] > 0) {
					allRowsCompleted = false
					break;
				}
			}

			if (allRowsCompleted)
			{
				// Screen is valid
				return true;
			}
			else {
				// Screen is not valid
				return false;
			}

		case "screenWeapons":
			var weapons = state.getIn(["character", "weapons"]);

			if (weapons.size > 0)
			{
				// Screen is valid
				return true;
			}
			else {
				// Screen is not valid
				return false;
			}

		case "screenArmors":
			var bodyArmor = state.getIn(["character", "armors", "bodyArmors", "armorName"]);
			var helmet = state.getIn(["character", "armors", "helmets", "armorName"]);

			if (isTextInputFilled(bodyArmor) && isTextInputFilled(helmet))
			{
				// Screen is valid
				return true;
			}
			else {
				// Screen is not valid
				return false;
			}
	}
}

const checkScreen = (checkingScreen) => {

	// Copy array
	let currentScreensArray = screensArray.slice(0);

	// Delete all previous screens (in array will stay only active and following screens)
	for (var key in currentScreensArray) {
		let screen = currentScreensArray[key]
		if (screen !== checkingScreen) {
			delete currentScreensArray[key]
		}
		else {
			break;
		}
	}

	let currentScreenIsValid = false
	let checkNextScreen = true

	for (var key in currentScreensArray) {
		let screen = currentScreensArray[key]
		currentScreenIsValid = isScreenValid(screen)

		if (checkNextScreen && currentScreenIsValid) {
			checkNextScreen = true
			// console.log("screen " + screen + " TRUE")
			store.dispatch( setScreen({ screen: screen, value: STATUS_COMPLETED}) )
		}
		else {
			// Screen is not valid, so all following screens are not valid
			checkNextScreen = false
			// console.log("screen " + screen + " false")
			store.dispatch( setScreen({ screen: screen, value: STATUS_DISABLED}) )
		}
	}

	// Last valid screen has following screen at state "disabled", change it to "not completed" so user can access it
	let state = store.getState()
	let screensObject =  state.get("screens")
	let lastScreenValid = false
	let nextScreen

	screensObject.keySeq().forEach((screen) => {
		if (screensObject.get(screen) === STATUS_COMPLETED) {
			lastScreenValid = screen
		}
	})

	if (lastScreenValid) {
		nextScreen = getNextArrayItem(screensArray, lastScreenValid)
	}
	else {
		// No screen is valid, set first as fallback
		nextScreen = screensObject.keySeq().first()
	}

	if (nextScreen) {
		store.dispatch( setScreen({ screen: nextScreen, value: STATUS_NOT_COMPLETED}) )
	}
};

export default checkScreen;
