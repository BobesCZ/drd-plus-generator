import store from "../store/index";
import getDistributedSkillsPoints from "../calculations/getDistributedSkillsPoints";
import getRandomInteger from "../helpers/getRandomInteger";
import changeSkill from "./changeSkill";

const orderedSkillsPsychicalPreferred = [
    "readingAndWriting",
    "mythology",
    "technology",
    "magicalObjectsManipulation",
    "zoology",
    "worldKnowledge"
]

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

const orderedSkillsCombinedPreferred = [
    "firstAid",
    "fightWithShootingWeapons",
    "animalTreatment",
    "brightVision",
]

const orderedSkillsCombinedRandom = [
    "herbalism",
    "gambling",
    "acting",
    "playingAMusicalInstrument",
    "hunting",
    "painting",
    "handwork",
    "sculpture",
    "seduction",
    "dancing",
    "knotting",
    "cooking",
    "largeHandwork",
    "pedagogy",
    "teaching",
    "singing"
]

const orderedSkills = {
    "psychical": {
        "preferred": orderedSkillsPsychicalPreferred,
        "random": orderedSkillsPsychicalRandom
    },
    "combined": {
        "preferred": orderedSkillsCombinedPreferred,
        "random": orderedSkillsCombinedRandom
    }
}

const autofillScreenSkills = () => {
    let state = store.getState();
    let availablePoints = state.getIn(["character", "skills", "availablePoints"]);
    let skills = state.getIn(["character", "skills"]);

    let currentAvailablePointsArray = []

    if (skills) {
        // Get current available points
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

        // Empty arrays - only user non-assigned skills will be added
        // (deleting items during forEach iteration causes skipping array items due to key manipulation, better copy items into empty array)
        let orderedSkillsFinal = {
           "psychical": {
                "preferred": [],
                "random": []
            },
            "combined": {
                "preferred": [],
                "random": []
            }
        };

        // Iterate Psychical and Combined skills
        ["psychical", "combined"].forEach((skillType) => {

            if (currentAvailablePointsArray[skillType] > 0) {
                // Copy points from state
                // This value is not updating during iteration!
                // We have to handle subtraction of points ourselves and hope that we do not end up with negative value of points
                let pointsLeft = currentAvailablePointsArray[skillType];

                // Remove skills that already have assigned points by user
                Object.keys(orderedSkills[skillType]).forEach((preferType) => {
                    orderedSkills[skillType][preferType].forEach((skillName) => {
                        let distributedValue = skills.getIn(["distributed", skillType, skillName])

                        if (parseInt(distributedValue) === 0) {
                            // Copy non-assigned skills to new array
                            orderedSkillsFinal[skillType][preferType].push(skillName)
                        }
                    })
                })

                // 1.Try to increase preferred skills
                orderedSkillsFinal[skillType]["preferred"].forEach((skillName) => {

                    // Psychical: max. 2 points for each skill
                    // Combined: max. 3 points for each skill
                    if (skillType === "combined" && pointsLeft >= 3) {
                        changeSkill(skillName, skillType, 3)
                        pointsLeft -= 3
                        // console.log(skillName, 3)
                    }
                    else if (pointsLeft >= 2) {
                        changeSkill(skillName, skillType, 2)
                        pointsLeft -= 2
                        // console.log(skillName, 2)
                    }
                    else if (pointsLeft >= 1) {
                        changeSkill(skillName, skillType, 1)
                        pointsLeft -= 1
                        // console.log(skillName, 1)
                    }
                })

                // 2. Pick random other skill and increase it with 1 or 2 points (random value)
                if (pointsLeft > 0) {

                    let skillsArray = orderedSkillsFinal[skillType]["random"]
                    let skillsArrayLength = skillsArray.length

                    for (var i = 0; i < skillsArrayLength; i++) {
                        let randomKey = getRandomInteger(0, skillsArray.length - 1)
                        let skillName = skillsArray[randomKey]

                        if (pointsLeft >= 2) {
                            let skillValue = getRandomInteger(1, 2)
                            changeSkill(skillName, skillType, skillValue)
                            pointsLeft -= skillValue
                            // console.log(skillName, skillValue)
                        }
                        else if (pointsLeft >= 1) {
                            changeSkill(skillName, skillType, 1)
                            pointsLeft -= 1
                            // console.log(skillName, 1)
                        }

                        // Remove item from array (prevents duplicated choices)
                        skillsArray.splice(randomKey, 1)

                        if (pointsLeft === 0) {
                            break;
                        }
                    }
                }

                // 3. Increase preferred skills from degree 2 to degree 3 (difference is 1 point)
                // Only for Psychical (all Combined preferred skills are already at degree 3)
                if (skillType === "psychical" && pointsLeft > 0) {
                    orderedSkillsFinal[skillType]["preferred"].forEach((skillName) => {

                        if (pointsLeft > 0) {
                            changeSkill(skillName, skillType, 3)
                            pointsLeft -= 1
                            // console.log(skillName, 1)
                        }
                    })
                }
            }
        })

    }

};

export default autofillScreenSkills;
