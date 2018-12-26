import store from "../store/index";
import resolveBackground from "../actions/resolveBackground";
import resolveScreen from "../actions/resolveScreen";
import resetSkills from "../actionPackages/resetSkills";

const resolveBackgroundAndChangeScreen = () => {

	// Always dispatch resolveScreen after resolveBackground
	store.dispatch( resolveBackground({}) )
	store.dispatch( resolveScreen({ active: "screenBackground"}) )

	resetSkills()
};

export default resolveBackgroundAndChangeScreen;
