import store from "../store/index";
import calculateAbilities from "../actions/calculateAbilities";
import calculateDerivedAbilities from "../actions/calculateDerivedAbilities";

const actionPackages = (packageType, args = {}) => {
  // console.log("Start: actionPackages " + packageType, args)

  switch (packageType) {

    case "calculateSheet":
      store.dispatch( calculateAbilities({}) )
      store.dispatch( calculateDerivedAbilities({}) )

  }

};

export default actionPackages;
