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
  "abilityDistribution":
  {
    "warrior":
    {
      0: {"FYZ":2, "PSY":0, "KOM":1},
      1: {"FYZ":3, "PSY":0, "KOM":1},
      2: {"FYZ":4, "PSY":0, "KOM":1},
      3: {"FYZ":4, "PSY":1, "KOM":2},
      4: {"FYZ":5, "PSY":1, "KOM":3},
      5: {"FYZ":6, "PSY":2, "KOM":3},
      6: {"FYZ":8, "PSY":2, "KOM":4},
      7: {"FYZ":10, "PSY":3, "KOM":5},
      8: {"FYZ":12, "PSY":4, "KOM":6}
    },
    "rogue":
    {
      "0": {"FYZ":1, "PSY":1, "KOM":1},
      "1": {"FYZ":2, "PSY":1, "KOM":1},
      "2": {"FYZ":2, "PSY":1, "KOM":2},
      "3": {"FYZ":3, "PSY":2, "KOM":2},
      "4": {"FYZ":4, "PSY":2, "KOM":3},
      "5": {"FYZ":5, "PSY":2, "KOM":4},
      "6": {"FYZ":6, "PSY":3, "KOM":5},
      "7": {"FYZ":8, "PSY":4, "KOM":6},
      "8": {"FYZ":9, "PSY":6, "KOM":7}
    },
    "ranger":
    {
      "0": {"FYZ":2, "PSY":0, "KOM":1},
      "1": {"FYZ":2, "PSY":0, "KOM":2},
      "2": {"FYZ":3, "PSY":0, "KOM":3},
      "3": {"FYZ":3, "PSY":1, "KOM":3},
      "4": {"FYZ":4, "PSY":1, "KOM":4},
      "5": {"FYZ":5, "PSY":1, "KOM":5},
      "6": {"FYZ":6, "PSY":2, "KOM":6},
      "7": {"FYZ":8, "PSY":3, "KOM":7},
      "8": {"FYZ":10, "PSY":4, "KOM":8}
    },
    "sorcerer":
    {
      "0": {"FYZ":0, "PSY":3, "KOM":0},
      "1": {"FYZ":1, "PSY":3, "KOM":0},
      "2": {"FYZ":1, "PSY":4, "KOM":0},
      "3": {"FYZ":2, "PSY":4, "KOM":1},
      "4": {"FYZ":2, "PSY":5, "KOM":2},
      "5": {"FYZ":3, "PSY":6, "KOM":2},
      "6": {"FYZ":4, "PSY":7, "KOM":3},
      "7": {"FYZ":5, "PSY":9, "KOM":4},
      "8": {"FYZ":6, "PSY":11, "KOM":5}
    },
    "theurge":
    {
      "0": {"FYZ":0, "PSY":2, "KOM":1},
      "1": {"FYZ":0, "PSY":3, "KOM":1},
      "2": {"FYZ":0, "PSY":4, "KOM":1},
      "3": {"FYZ":1, "PSY":4, "KOM":2},
      "4": {"FYZ":1, "PSY":5, "KOM":3},
      "5": {"FYZ":2, "PSY":6, "KOM":3},
      "6": {"FYZ":2, "PSY":8, "KOM":4},
      "7": {"FYZ":3, "PSY":10, "KOM":5},
      "8": {"FYZ":4, "PSY":12, "KOM":6}
    },
    "cleric":
    {
      "0": {"FYZ":0, "PSY":1, "KOM":2},
      "1": {"FYZ":0, "PSY":2, "KOM":2},
      "2": {"FYZ":1, "PSY":2, "KOM":2},
      "3": {"FYZ":1, "PSY":3, "KOM":3},
      "4": {"FYZ":2, "PSY":3, "KOM":4},
      "5": {"FYZ":2, "PSY":4, "KOM":5},
      "6": {"FYZ":3, "PSY":5, "KOM":6},
      "7": {"FYZ":4, "PSY":7, "KOM":7},
      "8": {"FYZ":5, "PSY":9, "KOM":8}
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
      "combat":0,
      "note":""
    },
    "mountaineer": {
      "senses":0,
      "resistance":0,
      "speed":0,
      "combat":0,
      "note":""
    },
    "elf": {
      "senses":0,
      "resistance":-1,
      "speed":0,
      "combat":0,
      "note":""
    },
    "greenElf": {
      "senses":0,
      "resistance":-1,
      "speed":0,
      "combat":0,
      "note":""
    },
    "darkElf": {
      "senses":0,
      "resistance":-1,
      "speed":0,
      "combat":0,
      "note":"Infravidění"
    },
    "dwarf": {
      "senses":-1,
      "resistance":1,
      "speed":0,
      "combat":0,
      "note":"Infravidění"
    },
    "mountainDwarf": {
      "senses":-1,
      "resistance":1,
      "speed":0,
      "combat":0,
      "note":"Infravidění"
    },
    "hobbit": {
      "senses":0,
      "resistance":0,
      "speed":-1,
      "combat":-1,
      "note":""
    },
    "kroll": {
      "senses":0,
      "resistance":0,
      "speed":1,
      "combat":1,
      "note":"Regenerace"
    },
    "wildKroll": {
      "senses":0,
      "resistance":0,
      "speed":1,
      "combat":1,
      "note":"Regenerace"
    },
    "orc": {
      "senses":1,
      "resistance":0,
      "speed":0,
      "combat":0,
      "note":"Infravidění"
    },
    "hobgoblin": {
      "senses":1,
      "resistance":0,
      "speed":0,
      "combat":0,
      "note":"Infravidění"
    },
    "goblin": {
      "senses":1,
      "resistance":0,
      "speed":0,
      "combat":0,
      "note":"Infravidění"
    }
  }
}

export default tables;
