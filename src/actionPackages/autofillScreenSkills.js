import store from "../store/index";
import { Map, OrderedMap } from 'immutable';
import getDistributedSkillsPoints from "../calculations/getDistributedSkillsPoints";
import getRandomInteger from "../helpers/getRandomInteger";
import changeSkill from "./changeSkill";

const orderedSkillsPsychicalPreferred = OrderedMap(
  {
    "readingAndWriting": 0,
    "mythology": 0,
    "technology": 0,
    "magicalObjectsManipulation": 0,
    "zoology": 0,
    "worldKnowledge": 0,
  }
)

const orderedSkillsPsychicalRandom = [
    "astronomy",
    "botanics",
    "foreignLanguage",
    "history",
    "underworldEtiquette",
    "mapDrawing",
    "socialEtiquette",
    "theology",
    "geography",
    "cityKnowledge"
]

const autofillScreenSkills = () => {
    let state = store.getState();
    let availablePoints = state.getIn(["character", "skills", "availablePoints"]);
    let skills = state.getIn(["character", "skills"]);

    let currentAvailablePointsArray = []

    if (skills) {
        skills.get('distributed').keySeq().forEach((key) => {
            let distributedSkillsPoints = getDistributedSkillsPoints(skills, key)
            let availableSkillsPoints = availablePoints.get(key)

            // Combat points are equal to physical (except for warriors, that have positive value in combat points)
            if (key === "combat" && availableSkillsPoints === 0) {
                availableSkillsPoints = availablePoints.get("physical")
            }

            let currentAvailablePoints = parseInt(availableSkillsPoints) - parseInt(distributedSkillsPoints)
            currentAvailablePointsArray[key] = currentAvailablePoints
        })

        // Psychical skills
        if (currentAvailablePointsArray["psychical"] > 0) {
            let pointsLeft = currentAvailablePointsArray["psychical"];

            // 1.Try to increase preferred skills (max. 2 points for each)
            orderedSkillsPsychicalPreferred.keySeq().forEach((skillName) => {
                // console.log(skillName)

                if (pointsLeft >= 2) {
                    changeSkill(skillName, "psychical", 2)
                    pointsLeft -= 2
                }
                else if (pointsLeft >= 1) {
                    changeSkill(skillName, "psychical", 1)
                    pointsLeft -= 1
                }
            })

            // 2. Pick random other skill and increase it with 1 or 2 points
            if (pointsLeft > 0) {

                let arrayLength = orderedSkillsPsychicalRandom.length

                for (var i = 0; i < arrayLength; i++) {

                    let randomKey = getRandomInteger(0, orderedSkillsPsychicalRandom.length - 1)
                    let skillName = orderedSkillsPsychicalRandom[randomKey]

                    if (pointsLeft >= 2) {
                        let skillValue = getRandomInteger(1, 2)
                        changeSkill(skillName, "psychical", skillValue)
                        pointsLeft -= skillValue
                    }
                    else if (pointsLeft >= 1) {
                        changeSkill(skillName, "psychical", 1)
                        pointsLeft -= 1
                    }

                    // Remove item from array (prevents duplicated choices)
                    orderedSkillsPsychicalRandom.splice(randomKey, 1)

                    if (pointsLeft === 0) {
                        break;
                    }
                }
            }

            // 3. Increase preferred skills from degree 2 to degree 3 (difference is 1 point)
            if (pointsLeft > 0) {
                orderedSkillsPsychicalPreferred.keySeq().forEach((skillName) => {

                    if (pointsLeft >= 1) {
                        changeSkill(skillName, "psychical", 3)
                        pointsLeft -= 1
                    }
                })
            }
        }

    }

};

export default autofillScreenSkills;
