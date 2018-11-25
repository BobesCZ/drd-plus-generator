import store from "../store/index";
import resolveBackground from "../actions/resolveBackground";
import resolveScreen from "../actions/resolveScreen";

const resolveBackgroundAndChangeScreen = () => {

	// Always dispatch resolveScreen after resolveBackground
	store.dispatch( resolveBackground({}) )
	store.dispatch( resolveScreen({ active: "screenBackground"}) )

};

export default resolveBackgroundAndChangeScreen;
