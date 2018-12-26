import { Map } from 'immutable';

const getskillsPoints = (skills, skillType) => {
  var distributedSkillPoints = 0

  if (Map.isMap(skills) && skillType.length > 0) {

    // Combat points are equal to physical (except for warriors, that have positive value in combat points)
    // Sum combat and physical distributed points
    if (
      (
        skillType === "combat" ||
        skillType === "physical"
      ) &&
      skills.getIn(["availablePoints", "combat"]) === 0
    )
    {
       skills.getIn(["distributed", "combat"]).forEach((value) => {
        distributedSkillPoints += parseInt(value)
      })

      skills.getIn(["distributed", "physical"]).forEach((value) => {
        distributedSkillPoints += parseInt(value)
      })
    }
    else {
      skills.getIn(["distributed", skillType]).forEach((value) => {
        distributedSkillPoints += parseInt(value)
      })
    }

    return distributedSkillPoints;
  }
};

export default getskillsPoints;
