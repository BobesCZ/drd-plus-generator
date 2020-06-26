import checkScreen from '../actionPackages/checkScreen';
import resetSkills from '../actionPackages/resetSkills';
import resolveBackground from '../actions/resolveBackground';
import store from '../store/index';

const resolveBackgroundAndChangeScreen = () => {
  // Always dispatch checkScreen after resolveBackground
  store.dispatch(resolveBackground({}));
  checkScreen('screenBackground');

  resetSkills();
};

export default resolveBackgroundAndChangeScreen;
