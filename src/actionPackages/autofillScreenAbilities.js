import changeAbility from '../actionPackages/changeAbility';
import resolveAbilityValues from '../actions/resolveAbilityValues';
import getPreferredAbility from '../helpers/getPreferredAbility';
import store from '../store/index';

const increaseAbility = (level, ability) => {
  const changeValue = '+1';
  const state = store.getState();
  const disabled = state.getIn(['character', 'levels', parseInt(level), 'abilities', ability, 'disabled']);

  if (!disabled) {
    changeAbility(ability, level, changeValue);
    // Resolve button state for this level
    store.dispatch(resolveAbilityValues({ level }));
  }
  else {
    return false;
  }
};

const autofillScreenAbilities = () => {
  const state = store.getState();
  const charClass = state.getIn(['character', 'info', 'class']);
  const levels = state.getIn(['character', 'levels']);
  const combatType = state.getIn(['switchers', 'autoFillAbilities']) ? 'nonCombat' : 'combat';

  const primaryPreferred = getPreferredAbility(charClass, 'primaryPreferred', combatType);
  const primaryOther = getPreferredAbility(charClass, 'primaryOther', combatType);
  const primaryEqual = getPreferredAbility(charClass, 'primaryEqual', combatType);
  const secondaryPreferred = getPreferredAbility(charClass, 'secondaryPreferred', combatType);
  const secondaryOther = getPreferredAbility(charClass, 'secondaryOther', combatType);
  const secondaryEqual = getPreferredAbility(charClass, 'secondaryEqual', combatType);
  let primaryEqualLast = '';
  let secondaryEqualLast = [];

  if (levels) {
    // Iterate through all levels in level table
    levels.keySeq().forEach((level) => {
      const maximumAbilityPoint = levels.getIn([parseInt(level), 'maximumAbilityPoint']);
      const secondaryAbilityPoints = levels.getIn([parseInt(level), 'secondaryAbilityPoints']);

      if (primaryPreferred && primaryOther) {
        // MAIN ABILITIES - mode A: primary and secondary distribution

        // 1. Try to click maximum points at primaryPreferred ability
        for (let i = 1; i <= maximumAbilityPoint; i++) {
          increaseAbility(level, primaryPreferred);
        }

        // 2. Try to click maximum points at primaryOther
        for (let i = 1; i <= maximumAbilityPoint; i++) {
          increaseAbility(level, primaryOther);
        }
      }
      else {
        // MAIN ABILITIES - mode B: equal distribution
        const ability1 = primaryEqual[0];
        const ability2 = primaryEqual[1];
        let increasingAbility = ability1;

        // 1. Try to click 1 point at first equal ability
        increasingAbility = primaryEqualLast === ability1 ? ability2 : ability1;
        increaseAbility(level, increasingAbility);
        primaryEqualLast = increasingAbility;

        // 2. Try to click 1 point at second equal ability
        if (maximumAbilityPoint > 1) {
          increasingAbility = primaryEqualLast === ability1 ? ability2 : ability1;
          increaseAbility(level, increasingAbility);
          primaryEqualLast = increasingAbility;
        }

        // 3. Try to click 1 point at first equal ability (in case of 3 ability points from character background)
        if (maximumAbilityPoint > 2) {
          increasingAbility = primaryEqualLast === ability1 ? ability2 : ability1;
          increaseAbility(level, increasingAbility);
          primaryEqualLast = increasingAbility;
        }
      }

      if (secondaryPreferred && secondaryOther) {
        // SECONDARY ABILITIES - mode A: primary and secondary distribution

        // 3. Try to click maximum points at secondaryPreferred ability
        for (let i = 1; i <= maximumAbilityPoint; i++) {
          increaseAbility(level, secondaryPreferred);
        }

        // 4. Try to click maximum points at secondaryOther ability
        for (let i = 1; i <= maximumAbilityPoint; i++) {
          increaseAbility(level, secondaryOther);
        }
      }
      else {
        // SECONDARY ABILITIES - mode B: equal distribution
        const ability1 = secondaryEqual[0];
        const ability2 = secondaryEqual[1];
        const ability3 = secondaryEqual[2];
        let increasingAbility = ability1;

        for (let i = 1; i <= secondaryAbilityPoints; i++) {
          // 1. Try to click 1 point at first equal ability
          secondaryEqualLast = secondaryEqualLast.length === 3 ? [] : secondaryEqualLast;
          increasingAbility = secondaryEqualLast.indexOf(ability1) === -1 ? ability1 : secondaryEqualLast.indexOf(ability2) === -1 ? ability2 : ability3;
          increaseAbility(level, increasingAbility);
          secondaryEqualLast.push(increasingAbility);
        }
      }
    });
  }
};

export default autofillScreenAbilities;
