const tables = {
 "background":
  {
    "goodAbility":
    {
      "totalPoints":5,
      "mainAbilityPoints":3,
      "secondaryAbilityPoints":6,
      "maximumAbilityPoint":3
    },
    "combinationBackground":
    {
      "totalPoints":10,
      "mainAbilityPoints":2,
      "secondaryAbilityPoints":4,
      "maximumAbilityPoint":2
    },
    "goodBackground":
    {
      "totalPoints":15,
      "mainAbilityPoints":1,
      "secondaryAbilityPoints":2,
      "maximumAbilityPoint":1
    }
  },
  "skillsDistribution":
  {
    "warrior":
    {
      "0": {"physical":2, "psychical":0, "combined":1},
      "1": {"physical":3, "psychical":0, "combined":1},
      "2": {"physical":4, "psychical":0, "combined":1},
      "3": {"physical":4, "psychical":1, "combined":2},
      "4": {"physical":5, "psychical":1, "combined":3},
      "5": {"physical":6, "psychical":2, "combined":3},
      "6": {"physical":8, "psychical":2, "combined":4},
      "7": {"physical":10, "psychical":3, "combined":5},
      "8": {"physical":12, "psychical":4, "combined":6}
    },
    "rogue":
    {
      "0": {"physical":1, "psychical":1, "combined":1},
      "1": {"physical":2, "psychical":1, "combined":1},
      "2": {"physical":2, "psychical":1, "combined":2},
      "3": {"physical":3, "psychical":2, "combined":2},
      "4": {"physical":4, "psychical":2, "combined":3},
      "5": {"physical":5, "psychical":2, "combined":4},
      "6": {"physical":6, "psychical":3, "combined":5},
      "7": {"physical":8, "psychical":4, "combined":6},
      "8": {"physical":9, "psychical":6, "combined":7}
    },
    "ranger":
    {
      "0": {"physical":2, "psychical":0, "combined":1},
      "1": {"physical":2, "psychical":0, "combined":2},
      "2": {"physical":3, "psychical":0, "combined":3},
      "3": {"physical":3, "psychical":1, "combined":3},
      "4": {"physical":4, "psychical":1, "combined":4},
      "5": {"physical":5, "psychical":1, "combined":5},
      "6": {"physical":6, "psychical":2, "combined":6},
      "7": {"physical":8, "psychical":3, "combined":7},
      "8": {"physical":10, "psychical":4, "combined":8}
    },
    "sorcerer":
    {
      "0": {"physical":0, "psychical":3, "combined":0},
      "1": {"physical":1, "psychical":3, "combined":0},
      "2": {"physical":1, "psychical":4, "combined":0},
      "3": {"physical":2, "psychical":4, "combined":1},
      "4": {"physical":2, "psychical":5, "combined":2},
      "5": {"physical":3, "psychical":6, "combined":2},
      "6": {"physical":4, "psychical":7, "combined":3},
      "7": {"physical":5, "psychical":9, "combined":4},
      "8": {"physical":6, "psychical":11, "combined":5}
    },
    "theurge":
    {
      "0": {"physical":0, "psychical":2, "combined":1},
      "1": {"physical":0, "psychical":3, "combined":1},
      "2": {"physical":0, "psychical":4, "combined":1},
      "3": {"physical":1, "psychical":4, "combined":2},
      "4": {"physical":1, "psychical":5, "combined":3},
      "5": {"physical":2, "psychical":6, "combined":3},
      "6": {"physical":2, "psychical":8, "combined":4},
      "7": {"physical":3, "psychical":10, "combined":5},
      "8": {"physical":4, "psychical":12, "combined":6}
    },
    "cleric":
    {
      "0": {"physical":0, "psychical":1, "combined":2},
      "1": {"physical":0, "psychical":2, "combined":2},
      "2": {"physical":1, "psychical":2, "combined":2},
      "3": {"physical":1, "psychical":3, "combined":3},
      "4": {"physical":2, "psychical":3, "combined":4},
      "5": {"physical":2, "psychical":4, "combined":5},
      "6": {"physical":3, "psychical":5, "combined":6},
      "7": {"physical":4, "psychical":7, "combined":7},
      "8": {"physical":5, "psychical":9, "combined":8}
    }
  },
  "abilities":
  {
    "race":
    {
      "human": {
        "strength":0,
        "dexterity":0,
        "manualdexterity":0,
        "will":0,
        "intelligence":0,
        "charisma":0
      },
      "mountaineer": {
        "strength":1,
        "dexterity":0,
        "manualdexterity":0,
        "will":1,
        "intelligence":-1,
        "charisma":-1
      },
      "elf": {
        "strength":-1,
        "dexterity":1,
        "manualdexterity":1,
        "will":-2,
        "intelligence":1,
        "charisma":1
      },
      "greenElf": {
        "strength":-1,
        "dexterity":1,
        "manualdexterity":0,
        "will":-1,
        "intelligence":1,
        "charisma":1
      },
      "darkElf": {
        "strength":0,
        "dexterity":0,
        "manualdexterity":0,
        "will":0,
        "intelligence":1,
        "charisma":0
      },
      "dwarf": {
        "strength":1,
        "dexterity":-1,
        "manualdexterity":0,
        "will":2,
        "intelligence":-1,
        "charisma":-2
      },
      "mountainDwarf": {
        "strength":2,
        "dexterity":-1,
        "manualdexterity":0,
        "will":2,
        "intelligence":-2,
        "charisma":-2
      },
      "hobbit": {
        "strength":-3,
        "dexterity":1,
        "manualdexterity":1,
        "will":0,
        "intelligence":-1,
        "charisma":2
      },
      "kroll": {
        "strength":3,
        "dexterity":-2,
        "manualdexterity":-1,
        "will":1,
        "intelligence":-3,
        "charisma":-1
      },
      "wildKroll": {
        "strength":3,
        "dexterity":-1,
        "manualdexterity":-2,
        "will":2,
        "intelligence":-3,
        "charisma":-2
      },
      "orc": {
        "strength":0,
        "dexterity":2,
        "manualdexterity":0,
        "will":-1,
        "intelligence":0,
        "charisma":-2
      },
      "hobgoblin": {
        "strength":1,
        "dexterity":1,
        "manualdexterity":-1,
        "will":0,
        "intelligence":0,
        "charisma":-2
      },
      "goblin": {
        "strength":-1,
        "dexterity":2,
        "manualdexterity":1,
        "will":-2,
        "intelligence":0,
        "charisma":-1
      }
    },
    "sex":
     {
      "human": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":0,
        "will":0,
        "intelligence":0,
        "charisma":1
      },
      "mountaineer": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":0,
        "will":0,
        "intelligence":0,
        "charisma":1
      },
      "elf": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":1,
        "will":0,
        "intelligence":-1,
        "charisma":1
      },
      "greenElf": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":1,
        "will":0,
        "intelligence":-1,
        "charisma":1
      },
      "darkElf": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":1,
        "will":0,
        "intelligence":-1,
        "charisma":1
      },
      "dwarf": {
        "strength":0,
        "dexterity":0,
        "manualdexterity":-1,
        "will":0,
        "intelligence":1,
        "charisma":0
      },
      "mountainDwarf": {
        "strength":0,
        "dexterity":0,
        "manualdexterity":-1,
        "will":0,
        "intelligence":1,
        "charisma":0
      },
      "hobbit": {
        "strength":-1,
        "dexterity":1,
        "manualdexterity":-1,
        "will":0,
        "intelligence":0,
        "charisma":1
      },
      "kroll": {
        "strength":-1,
        "dexterity":1,
        "manualdexterity":0,
        "will":-1,
        "intelligence":0,
        "charisma":1
      },
      "wildKroll": {
        "strength":-1,
        "dexterity":1,
        "manualdexterity":0,
        "will":-1,
        "intelligence":0,
        "charisma":1
      },
      "orc": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":0,
        "will":1,
        "intelligence":0,
        "charisma":0
      },
      "hobgoblin": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":0,
        "will":1,
        "intelligence":0,
        "charisma":0
      },
      "goblin": {
        "strength":-1,
        "dexterity":0,
        "manualdexterity":0,
        "will":1,
        "intelligence":0,
        "charisma":0
      }
    },
    "class":
    {
      "warrior": {
        "strength":1,
        "dexterity":1,
        "manualdexterity":0,
        "will":0,
        "intelligence":0,
        "charisma":0
      },
      "rogue": {
        "strength":0,
        "dexterity":1,
        "manualdexterity":1,
        "will":0,
        "intelligence":0,
        "charisma":0
      },
      "ranger": {
        "strength":1,
        "dexterity":0,
        "manualdexterity":1,
        "will":0,
        "intelligence":0,
        "charisma":0
      },
      "sorcerer": {
        "strength":0,
        "dexterity":0,
        "manualdexterity":0,
        "will":1,
        "intelligence":1,
        "charisma":0
      },
      "theurge": {
        "strength":0,
        "dexterity":0,
        "manualdexterity":0,
        "will":0,
        "intelligence":1,
        "charisma":1
      },
      "cleric": {
        "strength":0,
        "dexterity":0,
        "manualdexterity":0,
        "will":1,
        "intelligence":0,
        "charisma":1
      }
    }
  },
  "derivedAbilities":
   {
    "human": {
      "senses":0,
      "resistance":0,
      "speed":0,
      "combatSpeed":0,
      "note":""
    },
    "mountaineer": {
      "senses":0,
      "resistance":0,
      "speed":0,
      "combatSpeed":0,
      "note":""
    },
    "elf": {
      "senses":0,
      "resistance":-1,
      "speed":0,
      "combatSpeed":0,
      "note":""
    },
    "greenElf": {
      "senses":0,
      "resistance":-1,
      "speed":0,
      "combatSpeed":0,
      "note":""
    },
    "darkElf": {
      "senses":0,
      "resistance":-1,
      "speed":0,
      "combatSpeed":0,
      "note":"Infravidění"
    },
    "dwarf": {
      "senses":-1,
      "resistance":1,
      "speed":0,
      "combatSpeed":0,
      "note":"Infravidění"
    },
    "mountainDwarf": {
      "senses":-1,
      "resistance":1,
      "speed":0,
      "combatSpeed":0,
      "note":"Infravidění"
    },
    "hobbit": {
      "senses":0,
      "resistance":0,
      "speed":-1,
      "combatSpeed":-1,
      "note":""
    },
    "kroll": {
      "senses":0,
      "resistance":0,
      "speed":1,
      "combatSpeed":1,
      "note":"Regenerace"
    },
    "wildKroll": {
      "senses":0,
      "resistance":0,
      "speed":1,
      "combatSpeed":1,
      "note":"Regenerace"
    },
    "orc": {
      "senses":1,
      "resistance":0,
      "speed":0,
      "combatSpeed":0,
      "note":"Infravidění"
    },
    "hobgoblin": {
      "senses":1,
      "resistance":0,
      "speed":0,
      "combatSpeed":0,
      "note":"Infravidění"
    },
    "goblin": {
      "senses":1,
      "resistance":0,
      "speed":0,
      "combatSpeed":0,
      "note":"Infravidění"
    }
  },
  "weaponSkillDegrees": {
    "0": { "attackNumber":-3, "cover":-2, "damageNumber":-1},
    "1": { "attackNumber":-2, "cover":-1, "damageNumber":-1},
    "2": { "attackNumber":-1, "cover":-1, "damageNumber":0},
    "3": { "attackNumber":0, "cover":0, "damageNumber":0},
    "4": { "attackNumber":1, "cover":1, "damageNumber":0},
    "5": { "attackNumber":2, "cover":1, "damageNumber":1},
    "6": { "attackNumber":3, "cover":2, "damageNumber":1}
  },
    "weapons": {
    "noWeapon": {
      "hand": {
        "hold": "onehanded",
        "necessaryStrength": -10,
        "length": 0,
        "weaponAttack": 0,
        "weaponDamage": -2,
        "weaponCover": 0
      },
      "hobnailedGauntlet": {
        "hold": "onehanded",
        "necessaryStrength": -10,
        "length": 0,
        "weaponAttack": 0,
        "weaponDamage": 0,
        "weaponCover": 0
      },
      "combatGauntlet": {
        "hold": "onehanded",
        "necessaryStrength": -10,
        "length": 0,
        "weaponAttack": 0,
        "weaponDamage": 3,
        "weaponCover": 0
      },
      "foot": {
        "hold": "onehanded",
        "necessaryStrength": -10,
        "length": 0,
        "weaponAttack": -1,
        "weaponDamage": 1,
        "weaponCover": 0
      },
      "hobnailedBoot": {
        "hold": "onehanded",
        "necessaryStrength": -10,
        "length": 0,
        "weaponAttack": -2,
        "weaponDamage": 4,
        "weaponCover": 0
      },
      "body": {
        "hold": "onehanded",
        "necessaryStrength": -10,
        "length": 0,
        "weaponAttack": 0,
        "weaponDamage": 3,
        "weaponCover": 0
      },
      "head": {
        "hold": "onehanded",
        "necessaryStrength": -10,
        "length": 0,
        "weaponAttack": 0,
        "weaponDamage": 0,
        "weaponCover": 0
      }
    },
    "knives": {
      "knife": {
        "hold": "onehanded",
        "necessaryStrength": -4,
        "length": 0,
        "weaponAttack": 0,
        "weaponDamage": -2,
        "weaponCover": 1
      },
      "longKnife": {
        "hold": "onehanded",
        "necessaryStrength": -2,
        "length": 1,
        "weaponAttack": 1,
        "weaponDamage": -1,
        "weaponCover": 1
      },
      "dagger": {
        "hold": "onehanded",
        "necessaryStrength": -1,
        "length": 0,
        "weaponAttack": 0,
        "weaponDamage": 1,
        "weaponCover": 2
      },
      "stabDagger": {
        "hold": "onehanded",
        "necessaryStrength": -1,
        "length": 0,
        "weaponAttack": 2,
        "weaponDamage": 0,
        "weaponCover": 1
      },
      "curvedKnife": {
        "hold": "onehanded",
        "necessaryStrength": 0,
        "length": 1,
        "weaponAttack": 1,
        "weaponDamage": 2,
        "weaponCover": 1
      },
      "toothedDagger": {
        "hold": "onehanded",
        "necessaryStrength": 1,
        "length": 0,
        "weaponAttack": 1,
        "weaponDamage": 3,
        "weaponCover": 2
      },
      "longDagger": {
        "hold": "onehanded",
        "necessaryStrength": 1,
        "length": 1,
        "weaponAttack": 1,
        "weaponDamage": 2,
        "weaponCover": 2
      },
      "longToothedDagger": {
        "hold": "onehanded",
        "necessaryStrength": 3,
        "length": 1,
        "weaponAttack": 2,
        "weaponDamage": 4,
        "weaponCover": 2
      }
    },
    "axes": {
      "lightAxe": {
        "hold": "onehanded",
        "necessaryStrength": 3,
        "length": 1,
        "weaponAttack": 3,
        "weaponDamage": 3,
        "weaponCover": 2
      },
      "axe": {
        "hold": "onehanded",
        "necessaryStrength": 6,
        "length": 2,
        "weaponAttack": 3,
        "weaponDamage": 5,
        "weaponCover": 2
      },
      "warAxe": {
        "hold": "onehanded",
        "necessaryStrength": 9,
        "length": 3,
        "weaponAttack": 3,
        "weaponDamage": 7,
        "weaponCover": 3
      },
      "twohandedAxe": {
        "hold": "onehanded",
        "necessaryStrength": 12,
        "length": 3,
        "weaponAttack": 4,
        "weaponDamage": 10,
        "weaponCover": 3
      },
      "doublesidedAxe": {
        "hold": "onehanded",
        "necessaryStrength": 13,
        "length": 3,
        "weaponAttack": 4,
        "weaponDamage": 11,
        "weaponCover": 3
      },
      "doublesidedTwohandedAxe": {
        "hold": "onehanded",
        "necessaryStrength": 15,
        "length": 3,
        "weaponAttack": 4,
        "weaponDamage": 13,
        "weaponCover": 3
      }
    },
    "sabers": {
      "machete": {
        "hold": "onehanded",
        "necessaryStrength": 2,
        "length": 1,
        "weaponAttack": 2,
        "weaponDamage": 2,
        "weaponCover": 2
      },
      "fang": {
        "hold": "onehanded",
        "necessaryStrength": 3,
        "length": 1,
        "weaponAttack": 2,
        "weaponDamage": 3,
        "weaponCover": 3
      },
      "lightSaber": {
        "hold": "onehanded",
        "necessaryStrength": 3,
        "length": 2,
        "weaponAttack": 3,
        "weaponDamage": 1,
        "weaponCover": 3
      },
      "saber": {
        "hold": "onehanded",
        "necessaryStrength": 6,
        "length": 2,
        "weaponAttack": 4,
        "weaponDamage": 4,
        "weaponCover": 3
      },
      "toothedSaber": {
        "hold": "onehanded",
        "necessaryStrength": 8,
        "length": 2,
        "weaponAttack": 4,
        "weaponDamage": 6,
        "weaponCover": 3
      },
      "heavySaber": {
        "hold": "onehanded",
        "necessaryStrength": 9,
        "length": 2,
        "weaponAttack": 4,
        "weaponDamage": 6,
        "weaponCover": 4
      },
      "warSaber": {
        "hold": "onehanded",
        "necessaryStrength": 10,
        "length": 2,
        "weaponAttack": 4,
        "weaponDamage": 8,
        "weaponCover": 4
      }
    },
    "swords": {
      "shortSword": {
        "hold": "onehanded",
        "necessaryStrength": 2,
        "length": 1,
        "weaponAttack": 3,
        "weaponDamage": 1,
        "weaponCover": 4
      },
      "shortWideSword": {
        "hold": "onehanded",
        "necessaryStrength": 4,
        "length": 1,
        "weaponAttack": 3,
        "weaponDamage": 3,
        "weaponCover": 5
      },
      "wideSword": {
        "hold": "onehanded",
        "necessaryStrength": 6,
        "length": 2,
        "weaponAttack": 4,
        "weaponDamage": 4,
        "weaponCover": 5
      },
      "longSword": {
        "hold": "onehanded",
        "necessaryStrength": 7,
        "length": 3,
        "weaponAttack": 5,
        "weaponDamage": 3,
        "weaponCover": 5
      },
      "oneandahalfSword": {
        "hold": "onehanded",
        "necessaryStrength": 8,
        "length": 2,
        "weaponAttack": 5,
        "weaponDamage": 5,
        "weaponCover": 6
      },
      "barbarianSword": {
        "hold": "onehanded",
        "necessaryStrength": 10,
        "length": 2,
        "weaponAttack": 6,
        "weaponDamage": 6,
        "weaponCover": 5
      },
      "twohandedSword": {
        "hold": "onehanded",
        "necessaryStrength": 12,
        "length": 3,
        "weaponAttack": 5,
        "weaponDamage": 9,
        "weaponCover": 5
      },
      "fierySword": {
        "hold": "onehanded",
        "necessaryStrength": 14,
        "length": 3,
        "weaponAttack": 5,
        "weaponDamage": 10,
        "weaponCover": 5
      },
      "giantSword": {
        "hold": "onehanded",
        "necessaryStrength": 17,
        "length": 4,
        "weaponAttack": 6,
        "weaponDamage": 12,
        "weaponCover": 5
      }
    },
    "maces": {
      "baton": {
        "hold": "onehanded",
        "necessaryStrength": 1,
        "length": 1,
        "weaponAttack": 1,
        "weaponDamage": 2,
        "weaponCover": 1
      },
      "club": {
        "hold": "onehanded",
        "necessaryStrength": 3,
        "length": 1,
        "weaponAttack": 2,
        "weaponDamage": 3,
        "weaponCover": 2
      },
      "hobnailedClub": {
        "hold": "onehanded",
        "necessaryStrength": 5,
        "length": 1,
        "weaponAttack": 2,
        "weaponDamage": 5,
        "weaponCover": 2
      },
      "lightMace": {
        "hold": "onehanded",
        "necessaryStrength": 5,
        "length": 2,
        "weaponAttack": 3,
        "weaponDamage": 4,
        "weaponCover": 2
      },
      "heavyClub": {
        "hold": "onehanded",
        "necessaryStrength": 8,
        "length": 2,
        "weaponAttack": 3,
        "weaponDamage": 7,
        "weaponCover": 3
      },
      "mace": {
        "hold": "onehanded",
        "necessaryStrength": 8,
        "length": 2,
        "weaponAttack": 4,
        "weaponDamage": 6,
        "weaponCover": 3
      },
      "warHammer": {
        "hold": "onehanded",
        "necessaryStrength": 10,
        "length": 3,
        "weaponAttack": 5,
        "weaponDamage": 7,
        "weaponCover": 3
      },
      "twohandedClub": {
        "hold": "onehanded",
        "necessaryStrength": 11,
        "length": 2,
        "weaponAttack": 3,
        "weaponDamage": 10,
        "weaponCover": 2
      },
      "ironClub": {
        "hold": "onehanded",
        "necessaryStrength": 13,
        "length": 2,
        "weaponAttack": 3,
        "weaponDamage": 13,
        "weaponCover": 2
      },
      "heavySledge": {
        "hold": "onehanded",
        "necessaryStrength": 13,
        "length": 3,
        "weaponAttack": 4,
        "weaponDamage": 11,
        "weaponCover": 2
      },
      "warSledge": {
        "hold": "onehanded",
        "necessaryStrength": 15,
        "length": 3,
        "weaponAttack": 4,
        "weaponDamage": 14,
        "weaponCover": 2
      },
      "giantHammer": {
        "hold": "onehanded",
        "necessaryStrength": 16,
        "length": 3,
        "weaponAttack": 5,
        "weaponDamage": 3,
        "weaponCover": 3
      }
    },
    "flails": {
      "lightRingflail": {
        "hold": "onehanded",
        "necessaryStrength": 3,
        "length": 2,
        "weaponAttack": 2,
        "weaponDamage": 3,
        "weaponCover": 2
      },
      "ringflail": {
        "hold": "onehanded",
        "necessaryStrength": 7,
        "length": 3,
        "weaponAttack": 3,
        "weaponDamage": 6,
        "weaponCover": 3
      },
      "heavyRingflail": {
        "hold": "onehanded",
        "necessaryStrength": 11,
        "length": 3,
        "weaponAttack": 3,
        "weaponDamage": 9,
        "weaponCover": 3
      },
      "threeheadedRingflail": {
        "hold": "onehanded",
        "necessaryStrength": 13,
        "length": 3,
        "weaponAttack": 3,
        "weaponDamage": 12,
        "weaponCover": 3
      },
      "woodenflail": {
        "hold": "Obouruční",
        "necessaryStrength": 2,
        "length": 4,
        "weaponAttack": 2,
        "weaponDamage": 4,
        "weaponCover": 2
      },
      "flail": {
        "hold": "Obouruční",
        "necessaryStrength": 6,
        "length": 4,
        "weaponAttack": 3,
        "weaponDamage": 8,
        "weaponCover": 2
      },
      "hobnailedWoodenflail": {
        "hold": "Obouruční",
        "necessaryStrength": 7,
        "length": 4,
        "weaponAttack": 2,
        "weaponDamage": 10,
        "weaponCover": 2
      },
      "heavyFlail": {
        "hold": "Obouruční",
        "necessaryStrength": 11,
        "length": 4,
        "weaponAttack": 3,
        "weaponDamage": 13,
        "weaponCover": 2
      },
      "threeheadedWoodenflail": {
        "hold": "Obouruční",
        "necessaryStrength": 13,
        "length": 4,
        "weaponAttack": 4,
        "weaponDamage": 15,
        "weaponCover": 2
      }
    },
    "spears": {
      "lightStaff": {
        "hold": "Obouruční",
        "necessaryStrength": -1,
        "length": 4,
        "weaponAttack": 2,
        "weaponDamage": 0,
        "weaponCover": 3
      },
      "lightSpear": {
        "hold": "Obouruční",
        "necessaryStrength": 1,
        "length": 3,
        "weaponAttack": 3,
        "weaponDamage": 2,
        "weaponCover": 3
      },
      "hobnailedStaff": {
        "hold": "Obouruční",
        "necessaryStrength": 1,
        "length": 4,
        "weaponAttack": 2,
        "weaponDamage": 2,
        "weaponCover": 3
      },
      "heavyHobnailedStaff": {
        "hold": "Obouruční",
        "necessaryStrength": 2,
        "length": 4,
        "weaponAttack": 2,
        "weaponDamage": 4,
        "weaponCover": 3
      },
      "spear": {
        "hold": "Obouruční",
        "necessaryStrength": 3,
        "length": 4,
        "weaponAttack": 3,
        "weaponDamage": 4,
        "weaponCover": 3
      },
      "metalStaff": {
        "hold": "Obouruční",
        "necessaryStrength": 5,
        "length": 4,
        "weaponAttack": 2,
        "weaponDamage": 7,
        "weaponCover": 3
      },
      "longSpear": {
        "hold": "Obouruční",
        "necessaryStrength": 5,
        "length": 5,
        "weaponAttack": 3,
        "weaponDamage": 6,
        "weaponCover": 2
      },
      "steelLongStaff": {
        "hold": "Obouruční",
        "necessaryStrength": 7,
        "length": 5,
        "weaponAttack": 2,
        "weaponDamage": 8,
        "weaponCover": 3
      },
      "pike": {
        "hold": "Obouruční",
        "necessaryStrength": 7,
        "length": 6,
        "weaponAttack": 3,
        "weaponDamage": 8,
        "weaponCover": 2
      },
      "steelSpear": {
        "hold": "Obouruční",
        "necessaryStrength": 9,
        "length": 5,
        "weaponAttack": 3,
        "weaponDamage": 10,
        "weaponCover": 2
      }
    },
    "tridents": {
      "pitchfork": {
        "hold": "Obouruční",
        "necessaryStrength": 0,
        "length": 3,
        "weaponAttack": 2,
        "weaponDamage": 2,
        "weaponCover": 3
      },
      "lightGuisarme": {
        "hold": "Obouruční",
        "necessaryStrength": 2,
        "length": 4,
        "weaponAttack": 4,
        "weaponDamage": 4,
        "weaponCover": 3
      },
      "lightTrident": {
        "hold": "Obouruční",
        "necessaryStrength": 5,
        "length": 4,
        "weaponAttack": 3,
        "weaponDamage": 6,
        "weaponCover": 4
      },
      "halberd": {
        "hold": "Obouruční",
        "necessaryStrength": 6,
        "length": 4,
        "weaponAttack": 3,
        "weaponDamage": 7,
        "weaponCover": 3
      },
      "heavyGuisarme": {
        "hold": "Obouruční",
        "necessaryStrength": 7,
        "length": 4,
        "weaponAttack": 4,
        "weaponDamage": 9,
        "weaponCover": 3
      },
      "heavyTrident": {
        "hold": "Obouruční",
        "necessaryStrength": 9,
        "length": 4,
        "weaponAttack": 3,
        "weaponDamage": 10,
        "weaponCover": 4
      },
      "heavyHalberd": {
        "hold": "Obouruční",
        "necessaryStrength": 10,
        "length": 4,
        "weaponAttack": 3,
        "weaponDamage": 12,
        "weaponCover": 3
      },
      "warTrident": {
        "hold": "Obouruční",
        "necessaryStrength": 10,
        "length": 4,
        "weaponAttack": 5,
        "weaponDamage": 10,
        "weaponCover": 4
      },
      "warHalberd": {
        "hold": "Obouruční",
        "necessaryStrength": 13,
        "length": 5,
        "weaponAttack": 3,
        "weaponDamage": 14,
        "weaponCover": 3
      }
    }
  }
}

export default tables;
