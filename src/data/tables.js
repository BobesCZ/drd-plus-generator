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
      0: {"physical":2, "psychical":0, "combined":1},
      1: {"physical":3, "psychical":0, "combined":1},
      2: {"physical":4, "psychical":0, "combined":1},
      3: {"physical":4, "psychical":1, "combined":2},
      4: {"physical":5, "psychical":1, "combined":3},
      5: {"physical":6, "psychical":2, "combined":3},
      6: {"physical":8, "psychical":2, "combined":4},
      7: {"physical":10, "psychical":3, "combined":5},
      8: {"physical":12, "psychical":4, "combined":6}
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
  }
}

export default tables;
