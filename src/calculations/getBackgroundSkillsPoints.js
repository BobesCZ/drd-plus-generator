import tables from "../data/tables";

const getBackgroundSkillsPoints = (charClass, backgroundPoints) => {
  var finalSkillsPoints = {
    "physical": "",
    "psychical": "",
    "combined": "",
  };

  if (charClass.length && typeof backgroundPoints === "number") {
    Object.keys(finalSkillsPoints).forEach(key => {
      // @SOURCE: Tabulka dovedností
      var value = tables.skillsDistribution[charClass][backgroundPoints][key];

      finalSkillsPoints[key] = parseInt(value);
    });

    return finalSkillsPoints;
  }
};

export default getBackgroundSkillsPoints;
