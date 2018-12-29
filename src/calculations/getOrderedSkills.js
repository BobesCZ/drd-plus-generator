import { OrderedMap } from 'immutable';

const orderedSkillsCombat = OrderedMap(
  {
    "wearingArmor": 0,
    "usingShield": 0,
    "noWeapon": 0,
    "knives": 0,
    "axes": 0,
    "sabers": 0,
    "swords": 0,
    "maces": 0,
    "flails": 0,
    "spears": 0,
    "tridents": 0,
    "thrownWeapons": 0
  }
)

const orderedSkillsPhysical = OrderedMap(
  {
    "athletics": 0,
    "riding": 0,
    "blacksmithing": 0,
    "aviation": 0,
    "seamanship": 0,
    "boatControl": 0,
    "swimming": 0,
    "movementInMountains": 0,
    "movementInForrest": 0,
    "movementInCity": 0,
    "fastMarch": 0,
    "driving": 0,
    "climbing": 0
  }
)

const orderedSkillsPsychical = OrderedMap(
  {
    "astronomy": 0,
    "mythology": 0,
    "botanics": 0,
    "foreignLanguage": 0,
    "readingAndWriting": 0,
    "history": 0,
    "underworldEtiquette": 0,
    "mapDrawing": 0,
    "socialEtiquette": 0,
    "technology": 0,
    "theology": 0,
    "magicalObjectsManipulation": 0,
    "geography": 0,
    "cityKnowledge": 0,
    "worldKnowledge": 0,
    "zoology": 0
  }
)

const orderedSkillsCombined = OrderedMap(
  {
    "fightWithShootingWeapons": 0,
    "herbalism": 0,
    "gambling": 0,
    "acting": 0,
    "playingAMusicalInstrument": 0,
    "hunting": 0,
    "painting": 0,
    "firstAid": 0,
    "handwork": 0,
    "sculpture": 0,
    "seduction": 0,
    "brightVision": 0,
    "dancing": 0,
    "knotting": 0,
    "cooking": 0,
    "largeHandwork": 0,
    "pedagogy": 0,
    "teaching": 0,
    "animalTreatment": 0,
    "singing": 0
  }
)
const getOrderedSkills = () => {
  let orderedSkills = {
    "combat": orderedSkillsCombat,
    "physical": orderedSkillsPhysical,
    "psychical": orderedSkillsPsychical,
    "combined": orderedSkillsCombined
  }

  return orderedSkills
}

export default getOrderedSkills;
