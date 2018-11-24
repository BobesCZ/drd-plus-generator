import store from "../store/index";
import calculateAbilities from "../actions/calculateAbilities";
import calculateDerivedAbilities from "../actions/calculateDerivedAbilities";
import calculateCombatParameters from "../actions/calculateCombatParameters";

const actionPackages = (packageType, args = {}) => {
  // console.log("Start: actionPackages " + packageType, args)

  switch (packageType) {

    case "calculateSheet":
      store.dispatch( calculateAbilities({}) )
      store.dispatch( calculateDerivedAbilities({}) )
      store.dispatch( calculateCombatParameters({}) )

  }

};

export default actionPackages;
