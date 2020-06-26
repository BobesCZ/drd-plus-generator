import getDistributedSkillsPoints from '../calculations/getDistributedSkillsPoints';
import getPreferredSkills from '../calculations/getPreferredSkills';
import getRandomInteger from '../helpers/getRandomInteger';
import store from '../store/index';
import changeSkill from './changeSkill';

const autofillScreenSkills = (autofillCombatSkills = false) => {
  const state = store.getState();
  const availablePoints = state.getIn(['character', 'skills', 'availablePoints']);
  const skills = state.getIn(['character', 'skills']);
  const orderedSkills = getPreferredSkills();

  const currentAvailablePointsArray = [];

  if (skills) {
    // Get current available points
    skills.get('distributed').keySeq().forEach((key) => {
      const distributedSkillsPoints = getDistributedSkillsPoints(skills, key);
      let availableSkillsPoints = availablePoints.get(key);

      // Combat points are equal to physical (except for warriors, that have positive value in combat points)
      if (key === 'combat' && availableSkillsPoints === 0) {
        availableSkillsPoints = availablePoints.get('physical');
      }

      const currentAvailablePoints = parseInt(availableSkillsPoints) - parseInt(distributedSkillsPoints);
      currentAvailablePointsArray[key] = currentAvailablePoints;
    });

    // Empty arrays - only user non-assigned skills will be added
    // (deleting items during forEach iteration causes skipping array items due to key manipulation, better copy items into empty array)
    const orderedSkillsFinal = {
      psychical: {
        preferred: [],
        random: [],
      },
      combined: {
        preferred: [],
        random: [],
      },
    };

    // Iterate Psychical and Combined skills
    ['psychical', 'combined'].forEach((skillType) => {
      if (currentAvailablePointsArray[skillType] > 0) {
        // Copy points from state
        // This value is not updating during iteration!
        // We have to handle subtraction of points ourselves and hope that we do not end up with negative value of points
        let pointsLeft = currentAvailablePointsArray[skillType];

        // Remove skills that already have assigned points by user
        Object.keys(orderedSkills[skillType]).forEach((preferType) => {
          orderedSkills[skillType][preferType].forEach((skillName) => {
            const distributedValue = skills.getIn(['distributed', skillType, skillName]);

            if (parseInt(distributedValue) === 0) {
              // Copy non-assigned skills to new array
              orderedSkillsFinal[skillType][preferType].push(skillName);
            }
          });
        });

        // 1.Try to increase preferred skills
        orderedSkillsFinal[skillType].preferred.forEach((skillName) => {
          // Psychical: max. 2 points for each skill
          // Combined: max. 3 points for each skill
          if (skillType === 'combined' && pointsLeft >= 3) {
            changeSkill(skillName, skillType, 3);
            pointsLeft -= 3;
          }
          else if (pointsLeft >= 2) {
            changeSkill(skillName, skillType, 2);
            pointsLeft -= 2;
          }
          else if (pointsLeft >= 1) {
            changeSkill(skillName, skillType, 1);
            pointsLeft -= 1;
          }
        });

        // 2. Pick random other skill and increase it with 1 or 2 points (random value)
        if (pointsLeft > 0) {
          const skillsArray = orderedSkillsFinal[skillType].random;
          const skillsArrayLength = skillsArray.length;

          for (let i = 0; i < skillsArrayLength; i++) {
            const randomKey = getRandomInteger(0, skillsArray.length - 1);
            const skillName = skillsArray[randomKey];

            if (pointsLeft >= 2) {
              const skillValue = getRandomInteger(1, 2);
              changeSkill(skillName, skillType, skillValue);
              pointsLeft -= skillValue;
            }
            else if (pointsLeft >= 1) {
              changeSkill(skillName, skillType, 1);
              pointsLeft -= 1;
            }

            // Remove item from array (prevents duplicated choices)
            skillsArray.splice(randomKey, 1);

            if (pointsLeft === 0) {
              break;
            }
          }
        }

        // 3. Increase preferred skills from degree 2 to degree 3 (difference is 1 point)
        // Only for Psychical (all Combined preferred skills are already at degree 3)
        if (skillType === 'psychical' && pointsLeft > 0) {
          orderedSkillsFinal[skillType].preferred.forEach((skillName) => {
            if (pointsLeft > 0) {
              changeSkill(skillName, skillType, 3);
              pointsLeft -= 1;
            }
          });
        }
      }
    });

    // ONLY FOR TESTING
    // Choose first combat skills with type "fightWithWeapon" and continue to next until all points are assigned
    if (autofillCombatSkills) {
      let pointsLeft = currentAvailablePointsArray.combat + currentAvailablePointsArray.physical;
      const allCombatSkills = [
        'wearingArmor',
        'usingShield',
        'knives',
        'axes',
        'sabers',
        'swords',
        'maces',
        'flails',
        'spears',
        'tridents',
        'noWeapon',
        'thrownWeapons',
      ];

      if (pointsLeft > 0) {
        allCombatSkills.forEach((skillName) => {
          if (pointsLeft >= 3) {
            changeSkill(skillName, 'combat', 3);
            pointsLeft -= 3;
          }
          else if (pointsLeft >= 2) {
            changeSkill(skillName, 'combat', 2);
            pointsLeft -= 2;
          }
          else if (pointsLeft >= 1) {
            changeSkill(skillName, 'combat', 1);
            pointsLeft -= 1;
          }
        });
      }
    }
  }
};

export default autofillScreenSkills;
