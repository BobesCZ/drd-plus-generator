const preferredAbilitiesByClass = {
    "warrior": {
        "combat": {
            "strength": 100,
            "dexterity": 10,
            "manualdexterity": 1,
            "will": 5,
            "intelligence": 0,
            "charisma": 0
        },
        "nonCombat": {
            "strength": 50,
            "dexterity": 50,
            "manualdexterity": 0,
            "will": 5,
            "intelligence": 1,
            "charisma": 0
        }
    },
    "rogue": {
        "combat": {
            "strength": 5,
            "dexterity": 100,
            "manualdexterity": 10,
            "will": 1,
            "intelligence": 0,
            "charisma": 0
        },
        "nonCombat": {
            "strength": 5,
            "dexterity": 100,
            "manualdexterity": 10,
            "will": 1,
            "intelligence": 0,
            "charisma": 0
        }
    },
    "ranger": {
        "combat": {
            "strength": 10,
            "dexterity": 5,
            "manualdexterity": 100,
            "will": 1,
            "intelligence": 0,
            "charisma": 0
        },
        "nonCombat": {
            "strength": 10,
            "dexterity": 5,
            "manualdexterity": 100,
            "will": 1,
            "intelligence": 0,
            "charisma": 0
        }
    },
    "sorcerer": {
        "combat": {
            "strength": 5,
            "dexterity": 1,
            "manualdexterity": 0,
            "will": 10,
            "intelligence": 100,
            "charisma": 0
        },
        "nonCombat": {
            "strength": 5,
            "dexterity": 1,
            "manualdexterity": 0,
            "will": 10,
            "intelligence": 100,
            "charisma": 0
        }
    },
    "theurge": {
        "combat": {
            "strength": 1,
            "dexterity": 0,
            "manualdexterity": 0,
            "will": 5,
            "intelligence": 100,
            "charisma": 10
        },
        "nonCombat": {
            "strength": 1,
            "dexterity": 0,
            "manualdexterity": 0,
            "will": 5,
            "intelligence": 100,
            "charisma": 10
        }
    },
    "cleric": {
        "combat": {
            "strength": 5,
            "dexterity": 1,
            "manualdexterity": 0,
            "will": 10,
            "intelligence": 0,
            "charisma": 100
        },
        "nonCombat": {
            "strength": 5,
            "dexterity": 1,
            "manualdexterity": 0,
            "will": 10,
            "intelligence": 0,
            "charisma": 100
        }
    }
};

export default preferredAbilitiesByClass;
