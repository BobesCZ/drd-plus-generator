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
  }
}

export default tables;
