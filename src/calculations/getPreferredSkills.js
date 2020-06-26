const orderedSkillsPsychicalPreferred = [
  'readingAndWriting',
  'mythology',
  'technology',
  'magicalObjectsManipulation',
  'zoology',
  'worldKnowledge',
];

const orderedSkillsPsychicalRandom = [
  'astronomy',
  'botanics',
  'foreignLanguage',
  'history',
  'underworldEtiquette',
  'mapDrawing',
  'socialEtiquette',
  'theology',
  'geography',
  'cityKnowledge',
];

const orderedSkillsCombinedPreferred = [
  'firstAid',
  'fightWithShootingWeapons',
  'animalTreatment',
  'brightVision',
];

const orderedSkillsCombinedRandom = [
  'herbalism',
  'gambling',
  'acting',
  'playingAMusicalInstrument',
  'hunting',
  'painting',
  'handwork',
  'sculpture',
  'seduction',
  'dancing',
  'knotting',
  'cooking',
  'largeHandwork',
  'pedagogy',
  'teaching',
  'singing',
];

const getPreferredSkills = () => {
  const orderedSkills = {
    psychical: {
      preferred: orderedSkillsPsychicalPreferred,
      random: orderedSkillsPsychicalRandom,
    },
    combined: {
      preferred: orderedSkillsCombinedPreferred,
      random: orderedSkillsCombinedRandom,
    },
  };

  return orderedSkills;
};

export default getPreferredSkills;
