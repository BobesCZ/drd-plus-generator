import store from "../store/index";
import resolveBackground from "../actions/resolveBackground";
import resolveScreen from "../actions/resolveScreen";
import setSkillsPoints from "../actions/setSkillsPoints";

const resolveBackgroundAndChangeScreen = () => {

	// Always dispatch resolveScreen after resolveBackground
	store.dispatch( resolveBackground({}) )
	store.dispatch( resolveScreen({ active: "screenBackground"}) )

	store.dispatch( setSkillsPoints({}) )
};

export default resolveBackgroundAndChangeScreen;
