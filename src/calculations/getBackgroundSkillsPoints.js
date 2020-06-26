import tables from '../data/tables';

const getBackgroundSkillsPoints = (charClass, backgroundPoints) => {
  const finalSkillsPoints = {
    physical: '',
    psychical: '',
    combined: '',
  };

  if (charClass.length && typeof backgroundPoints === 'number') {
    Object.keys(finalSkillsPoints).forEach(key => {
      // @SOURCE: Tabulka dovedností
      const value = tables.skillsDistribution[charClass][backgroundPoints][key];

      finalSkillsPoints[key] = parseInt(value);
    });

    return finalSkillsPoints;
  }
};

export default getBackgroundSkillsPoints;
