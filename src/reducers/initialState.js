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
    }
  }
);

export default initialState;
