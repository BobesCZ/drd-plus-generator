import { fromJS } from 'immutable';

const initialState = fromJS(
  {
    // Main character object
    "character": {
      "info": {
        "name": "",
        "race": "",
        "class": "",
        "level": "",
        "sex": "",
        "note": ""
      },
      "background": {
        "name": "",
        "total": 0,
        "rangeLimit": false,
        "distributed": {
          "origin": "",
          "property": "",
          "skills": ""
        },
      },
      "abilities": {
        "strength": "",
        "dexterity": "",
        "manualdexterity": "",
        "will": "",
        "intelligence": "",
        "charisma": ""
      },
      "derivedAbilities": {
        "resistance": "",
        "fortitude": "",
        "speed": "",
        "senses": "",
        "beauty": "",
        "danger": "",
        "dignity": ""
      },
      "combatParameters": {
        "combatSpeed": "",
        "attack": "",
        "shoot": "",
        "defense": "",
        "health": ""
      },
      "levels": {
        "1": {
          "abilities": {
            "strength": {
              "value": 0,
              "disabled": false
            },
            "dexterity": {
              "value": 0,
              "disabled": false
            },
            "manualdexterity": {
              "value": 0,
              "disabled": false
            },
            "will": {
              "value": 0,
              "disabled": false
            },
            "intelligence": {
              "value": 0,
              "disabled": false
            },
            "charisma": {
              "value": 0,
              "disabled": false
            }
          },
          "mainAbilityPoints": 0,
          "secondaryAbilityPoints": 0,
          "maximumAbilityPoint": 0
        }
      },
      "skills": {
        "availablePoints": {
          "combat": 0,
          "physical": 0,
          "psychical": 0,
          "combined": 0
        },
        "distributed": {
          "combat": {
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
          },
          "physical": {
            "athletics": 0,
            "fightWithWeapon": 0,
            "riding": 0,
            "blacksmithing": 0,
            "aviation": 0,
            "seamanship": 0,
            "wearingArmor": 0,
            "boatControl": 0,
            "swimming": 0,
            "movementInMountains": 0,
            "movementInForrest": 0,
            "movementInCity": 0,
            "usingShield": 0,
            "fastMarch": 0,
            "driving": 0,
            "climbing": 0
          },
          "psychical": {
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
          },
          "combined": {
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
        }
      }
    },
    "activeScreen": "screenCharacter",
    "screens": {
      // States:
      // -1 => disabled
      // 0 => not completed
      // 1 => completed
      "screenCharacter": 0,
      "screenBackground": -1,
      "screenAbilities": -1,
      "screenSkills": -1,
      "screenWeapons": -1,
      "screenArmors": -1,
      "screenExport":-1
    },
    "errata": {
      // false => according to official rules
      // true => apply errata
      "backgroundPointsHasNoRangeLimit": false
    },
    "switchers": {
      "autoFillAbilities": false
    }
  }
);

export default initialState;
