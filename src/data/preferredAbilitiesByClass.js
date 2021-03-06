const preferredAbilitiesByClass = {
  warrior: {
    combatFocus: {
      strength: 100,
      dexterity: 10,
      manualdexterity: 1,
      will: 5,
      intelligence: 0,
      charisma: 0,
    },
    nonCombatFocus: {
      strength: 100,
      dexterity: 10,
      manualdexterity: 0,
      will: 0,
      intelligence: 1,
      charisma: 5,
    },
  },
  rogue: {
    combatFocus: {
      strength: 5,
      dexterity: 100,
      manualdexterity: 10,
      will: 1,
      intelligence: 0,
      charisma: 0,
    },
    nonCombatFocus: {
      strength: 0,
      dexterity: 10,
      manualdexterity: 100,
      will: 1,
      intelligence: 0,
      charisma: 5,
    },
  },
  ranger: {
    combatFocus: {
      strength: 50,
      dexterity: 5,
      manualdexterity: 50,
      will: 1,
      intelligence: 0,
      charisma: 0,
    },
    nonCombatFocus: {
      strength: 10,
      dexterity: 0,
      manualdexterity: 100,
      will: 1,
      intelligence: 0,
      charisma: 5,
    },
  },
  sorcerer: {
    combatFocus: {
      strength: 5,
      dexterity: 1,
      manualdexterity: 0,
      will: 10,
      intelligence: 100,
      charisma: 0,
    },
    nonCombatFocus: {
      strength: 3,
      dexterity: 3,
      manualdexterity: 0,
      will: 10,
      intelligence: 100,
      charisma: 3,
    },
  },
  theurge: {
    combatFocus: {
      strength: 1,
      dexterity: 0,
      manualdexterity: 0,
      will: 5,
      intelligence: 100,
      charisma: 10,
    },
    nonCombatFocus: {
      strength: 0,
      dexterity: 0,
      manualdexterity: 1,
      will: 5,
      intelligence: 100,
      charisma: 10,
    },
  },
  cleric: {
    combatFocus: {
      strength: 5,
      dexterity: 1,
      manualdexterity: 0,
      will: 100,
      intelligence: 0,
      charisma: 10,
    },
    nonCombatFocus: {
      strength: 3,
      dexterity: 0,
      manualdexterity: 3,
      will: 10,
      intelligence: 3,
      charisma: 100,
    },
  },
};

export default preferredAbilitiesByClass;
