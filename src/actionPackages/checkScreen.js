import setScreen from '../actions/setScreen';
import getDistributedSkillsPoints from '../calculations/getDistributedSkillsPoints';
import getNextArrayItem from '../helpers/getNextArrayItem';
import isLevelRowCompleted from '../helpers/isLevelRowCompleted';
import isTextInputFilled from '../helpers/isTextInputFilled';
import screensArray from '../helpers/screensArray';
import sumCollectionValues from '../helpers/sumCollectionValues';
import store from '../store/index';

const STATUS_DISABLED = -1;
const STATUS_NOT_COMPLETED = 0;
const STATUS_COMPLETED = 1;

const isScreenValid = (screen) => {
  const state = store.getState();

  switch (screen) {
    case 'screenCharacter': {
      const nameField = state.getIn(['character', 'info', 'name']);
      const raceField = state.getIn(['character', 'info', 'race']);
      const classField = state.getIn(['character', 'info', 'class']);
      const levelField = state.getIn(['character', 'info', 'level']);
      const sexField = state.getIn(['character', 'info', 'sex']);

      if (
        isTextInputFilled(nameField) &&
        isTextInputFilled(raceField) &&
        isTextInputFilled(classField) &&
        isTextInputFilled(levelField) &&
        isTextInputFilled(sexField)
      ) {
        // Screen is valid
        return true;
      }
      else {
        // Screen is not valid
        return false;
      }
    }

    case 'screenBackground': {
      const originField = state.getIn(['character', 'background', 'distributed', 'origin']);
      const propertyField = state.getIn(['character', 'background', 'distributed', 'property']);
      const skillsField = state.getIn(['character', 'background', 'distributed', 'skills']);
      // User have to distribute all available points
      const totalPoints = state.getIn(['character', 'background', 'total']);
      const distributedPoints = sumCollectionValues(state.getIn(['character', 'background', 'distributed']));
      const rangeLimit = state.getIn(['character', 'background', 'rangeLimit']);

      if (
        isTextInputFilled(originField) &&
        isTextInputFilled(propertyField) &&
        isTextInputFilled(skillsField) &&
        rangeLimit &&
        parseInt(totalPoints - distributedPoints) === 0
      ) {
        // Screen is valid
        return true;
      }
      else {
        // Screen is not valid
        return false;
      }
    }

    case 'screenAbilities': {
      const charLevel = state.getIn(['character', 'info', 'level']);
      let allLevelsCompleted = true;

      for (let i = 1; i <= parseInt(charLevel); i++) {
        const levelRow = state.getIn(['character', 'levels', i]);

        // When changing level on 1. screen, this function is called before resolveLevels()
        // For now, consider screen as not-completed, and wait until resolveLevels() creates correct levelRow objects
        if (typeof levelRow === 'undefined') {
          allLevelsCompleted = false;
          break;
        }
        const isCompleted = isLevelRowCompleted(levelRow);

        if (!isCompleted) {
          allLevelsCompleted = false;
          break;
        }
      }

      if (allLevelsCompleted) {
        // Screen is valid
        return true;
      }
      else {
        // Screen is not valid
        return false;
      }
    }

    case 'screenSkills': {
      const skills = state.getIn(['character', 'skills', 'distributed']);
      const charClass = state.getIn(['character', 'info', 'class']);
      const availablePoints = state.getIn(['character', 'skills', 'availablePoints']);
      const currentAvailablePointsArray = [];
      let allRowsCompleted = true;

      skills.keySeq().forEach((key) => {
        let distributedSkillsPoints = getDistributedSkillsPoints(state.getIn(['character', 'skills']), key);
        let availableSkillsPoints = availablePoints.get(key);

        // Combat points are equal to physical (except for warriors, that have positive value in combat points)
        if (key === 'combat' && availableSkillsPoints === 0) {
          availableSkillsPoints = availablePoints.get('physical');
        }

        // Handle extra points for Warrior
        if (charClass === 'warrior') {
          if (key === 'physical') {
            // Distributed Combat points - check if points are "above combat", and if so, add to Physical distributed points
            let distributedSkillsPointsCombat = getDistributedSkillsPoints(state.getIn(['character', 'skills']), 'combat') - availablePoints.get('combat');

            if (distributedSkillsPointsCombat < 0) {
              distributedSkillsPointsCombat = 0;
            }
            distributedSkillsPoints = distributedSkillsPointsCombat + getDistributedSkillsPoints(state.getIn(['character', 'skills']), 'physical');
          }

          else if (key === 'combat') {
            // Distributed Physical points are shared with Combat points
            distributedSkillsPoints = getDistributedSkillsPoints(state.getIn(['character', 'skills']), 'combat') + getDistributedSkillsPoints(state.getIn(['character', 'skills']), 'physical');

            // Combat points = (available Combat points) + (available Physical points)
            availableSkillsPoints += availablePoints.get('physical');
          }
        }

        let currentAvailablePoints = parseInt(availableSkillsPoints) - parseInt(distributedSkillsPoints);

        // Warriors may have negative currentAvailablePoints for Physical => consider it as 0
        if (currentAvailablePoints < 0) {
          currentAvailablePoints = 0;
        }

        currentAvailablePointsArray[key] = currentAvailablePoints;
      });

      for (const key in currentAvailablePointsArray) {
        if (currentAvailablePointsArray[key] > 0) {
          allRowsCompleted = false;
          break;
        }
      }

      if (allRowsCompleted) {
        // Screen is valid
        return true;
      }
      else {
        // Screen is not valid
        return false;
      }
    }

    case 'screenWeapons': {
      const weapons = state.getIn(['character', 'weapons']);

      if (weapons.size > 0) {
        // Screen is valid
        return true;
      }
      else {
        // Screen is not valid
        return false;
      }
    }

    case 'screenArmors': {
      const bodyArmor = state.getIn(['character', 'armors', 'bodyArmors', 'armorName']);
      const helmet = state.getIn(['character', 'armors', 'helmets', 'armorName']);

      if (isTextInputFilled(bodyArmor) && isTextInputFilled(helmet)) {
        // Screen is valid
        return true;
      }
      else {
        // Screen is not valid
        return false;
      }
    }
  }
};

const checkScreen = (checkingScreen) => {
  // Copy array
  const currentScreensArray = screensArray.slice(0);

  // Delete all previous screens (in array will stay only active and following screens)
  for (const key in currentScreensArray) {
    const screen = currentScreensArray[key];
    if (screen !== checkingScreen) {
      delete currentScreensArray[key];
    }
    else {
      break;
    }
  }

  let currentScreenIsValid = false;
  let checkNextScreen = true;

  for (const key in currentScreensArray) {
    const screen = currentScreensArray[key];
    currentScreenIsValid = isScreenValid(screen);

    if (checkNextScreen && currentScreenIsValid) {
      checkNextScreen = true;
      store.dispatch(setScreen({ screen: screen, value: STATUS_COMPLETED }));
    }
    else {
      // Screen is not valid, so all following screens are not valid
      checkNextScreen = false;
      store.dispatch(setScreen({ screen: screen, value: STATUS_DISABLED }));
    }
  }

  // Last valid screen has following screen at state "disabled", change it to "not completed" so user can access it
  const state = store.getState();
  const screensObject = state.get('screens');
  let lastScreenValid = false;
  let nextScreen;

  screensObject.keySeq().forEach((screen) => {
    if (screensObject.get(screen) === STATUS_COMPLETED) {
      lastScreenValid = screen;
    }
  });

  if (lastScreenValid) {
    nextScreen = getNextArrayItem(screensArray, lastScreenValid);
  }
  else {
    // No screen is valid, set first as fallback
    nextScreen = screensObject.keySeq().first();
  }

  if (nextScreen) {
    store.dispatch(setScreen({ screen: nextScreen, value: STATUS_NOT_COMPLETED }));
  }
};

export default checkScreen;
