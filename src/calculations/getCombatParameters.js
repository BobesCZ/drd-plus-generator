import tables from "../data/tables";
import getDamageTableValue from "../helpers/getDamageTableValue";

const getCombatParameters = (charRace, charClass, dexterity, manualdexterity, intelligence, charisma, resistance) => {

 if (
      charRace.length &&
      charClass.length &&
      typeof dexterity === "number" &&
      typeof manualdexterity === "number" &&
      typeof intelligence === "number" &&
      typeof charisma === "number" &&
      typeof resistance === "number"
    )
  {
    let results = [];

    // @SOURCE: Tabulka boje
    let combatSpeed = 0;

    switch (charClass) {
      case "warrior":
        combatSpeed = parseInt(dexterity);
        break;

      case "sorcerer":
        combatSpeed = Math.round((intelligence + dexterity) / 2);
        break;

      case "rogue":
        combatSpeed = Math.round((manualdexterity + dexterity) / 2);
        break;

      case "ranger":
        combatSpeed = Math.round((manualdexterity + dexterity) / 2);
        break;

      case "theurge":
        combatSpeed = Math.round((intelligence + dexterity) / 2);
        break;

      case "cleric":
        combatSpeed = Math.round((charisma + dexterity) / 2);
        break;
    }

    results["combatSpeed"] = combatSpeed + parseInt(tables.derivedAbilities[charRace]["combatSpeed"]);

    // @SOURCE: Tabulka bojových charakteristik
    results["attack"] = Math.floor(dexterity / 2);
    results["shoot"] = Math.round(dexterity / 2);
    results["defense"] = Math.floor(manualdexterity / 2);

    // @SOURCE: Tabulka Meze zranění a únavy
    let healthNumber = resistance + 10;
    results["health"] = getDamageTableValue(healthNumber);

    return results;
  }
  else {
    return false;
  }

};

export default getCombatParameters;
