import { OrderedMap } from 'immutable';
import tables from '../data/tables';

const getDerivedAbilities = (charRace, strength, dexterity, manualdexterity, will, intelligence, charisma, returnDebugBox = false) => {
  if (
    charRace.length &&
      typeof strength === 'number' &&
      typeof dexterity === 'number' &&
      typeof manualdexterity === 'number' &&
      typeof will === 'number' &&
      typeof intelligence === 'number' &&
      typeof charisma === 'number'
  ) {
    const results = [];
    const debugBox = {};

    // @SOURCE: Tabulka odvozených vlastností
    const resistanceRaceCorrection = tables.derivedAbilities[charRace].resistance;
    results.resistance = strength + parseInt(resistanceRaceCorrection);
    let debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('derivedAbilitiesBase', strength);
    debugBoxObject = debugBoxObject.set('raceCorrection', parseInt(resistanceRaceCorrection));
    debugBoxObject = debugBoxObject.set('total', parseInt(results.resistance));
    debugBox.resistance = debugBoxObject;

    results.fortitude = Math.round((strength + will) / 2);
    debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('derivedAbilitiesBase', results.fortitude);
    debugBoxObject = debugBoxObject.set('total', parseInt(results.fortitude));
    debugBox.fortitude = debugBoxObject;

    const speedRaceCorrection = tables.derivedAbilities[charRace].speed;
    results.speed = Math.round((strength + dexterity) / 2) + parseInt(speedRaceCorrection);
    debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('derivedAbilitiesBase', Math.round((strength + dexterity) / 2));
    debugBoxObject = debugBoxObject.set('raceCorrection', parseInt(speedRaceCorrection));
    debugBoxObject = debugBoxObject.set('total', parseInt(results.speed));
    debugBox.speed = debugBoxObject;

    const sensesRaceCorrection = tables.derivedAbilities[charRace].senses;
    results.senses = manualdexterity + parseInt(sensesRaceCorrection);
    debugBoxObject = OrderedMap();
    debugBoxObject = debugBoxObject.set('derivedAbilitiesBase', manualdexterity);
    debugBoxObject = debugBoxObject.set('raceCorrection', parseInt(sensesRaceCorrection));
    debugBoxObject = debugBoxObject.set('total', parseInt(results.senses));
    debugBox.senses = debugBoxObject;

    // @SOURCE: Tabulka aspektů vzhledu
    results.beauty = Math.round((dexterity + manualdexterity) / 2) + charisma;
    results.danger = Math.round((strength + will) / 2) + charisma;
    results.dignity = Math.round((intelligence + will) / 2) + charisma;

    if (returnDebugBox) {
      return debugBox;
    }
    else {
      return results;
    }
  }
  else {
    return false;
  }
};

export default getDerivedAbilities;
