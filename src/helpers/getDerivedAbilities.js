import tables from "../data/tables";

const getDerivedAbilities = (charRace, strength, dexterity, manualdexterity, will, intelligence, charisma) => {

    if (
      charRace.length &&
      typeof strength === "number" &&
      typeof dexterity === "number" &&
      typeof manualdexterity === "number" &&
      typeof will === "number" &&
      typeof intelligence === "number" &&
      typeof charisma === "number"
    )
  {
  	let results = [];

    // @SOURCE: Tabulka odvozených vlastností
    results["resistance"] = strength + parseInt(tables.derivedAbilities[charRace]["resistance"]);
    results["fortitude"] = Math.round((strength + will) / 2);
    results["speed"] = Math.round((strength + dexterity) / 2) + parseInt(tables.derivedAbilities[charRace]["speed"]);
    results["senses"] = manualdexterity + parseInt(tables.derivedAbilities[charRace]["senses"]);
    
    // @SOURCE: Tabulka aspektů vzhledu
    results["beauty"] =  Math.round((dexterity + manualdexterity) / 2) + charisma;
    results["danger"] =  Math.round((strength + will) / 2) + charisma;
    results["dignity"] =  Math.round((intelligence + will) / 2) + charisma;

    return results;
  }
  else {
    return false;
  }

};

export default getDerivedAbilities;
