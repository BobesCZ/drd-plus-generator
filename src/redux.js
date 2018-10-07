// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import store from "./store/index";


const translations = {
  "name": "Jméno",
  "race": "Rasa",
  "career": "Povolání",
  "level": "Úroveň",
  "sex": "Pohlaví",
  "note": "Poznámka"
};

const changeInfo = item => ({ type: "CHANGE_INFO", payload: item });

// Spuštění akce
store.dispatch( changeInfo({ key: "name", value: 'Vidlák'}) )


// export default redux;