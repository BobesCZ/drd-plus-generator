import store from "../store/index";
import resolveBackground from "../actions/resolveBackground";
import checkScreen from "../actionPackages/checkScreen";
import resetSkills from "../actionPackages/resetSkills";

const resolveBackgroundAndChangeScreen = () => {

	// Always dispatch checkScreen after resolveBackground
	store.dispatch( resolveBackground({}) )
	checkScreen("screenBackground")

	resetSkills()
};

export default resolveBackgroundAndChangeScreen;
