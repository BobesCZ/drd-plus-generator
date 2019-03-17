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
          // Skills objects are inserted as OrderedMap via getOrderedSkills
          "combat": {},
          "physical": {},
          "psychical": {},
          "combined": {}
        }
      },
      // Weapons object are inserted as Map via addWeapon
      "weapons": {},
      "armors": {
        "bodyArmors": {
          "armorName": "",
          "necessaryStrength": -10,
          "limitation": 0,
          "protection": 0,
        },
        "helmets": {
          "armorName": "",
          "necessaryStrength": -10,
          "limitation": 0,
          "protection": 0,
        },
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
    "saveOptions": {
      "saveTimestamp": 0,
      "useSavedState": false
    },
    "errata": {
      // false => according to official rules
      // true => apply errata
      "backgroundPointsHasNoRangeLimit": false,
      "warriorHasAdditionalWeaponSkillsDegrees": false
    },
    "switchers": {
      "autoFillAbilities": false,
      "showCharNumbersInWeaponTable": false
    },
    // debugBox objects are inserted as Map via addDebugBox
    "debugBoxes": {}
  }
);

export default initialState;
