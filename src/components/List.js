// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import React from "react";
import { Provider } from "react-redux";
import { connect } from "react-redux";

const translations = {
  "name": "Jméno",
  "race": "Rasa",
  "career": "Povolání",
  "level": "Úroveň",
  "sex": "Pohlaví",
  "note": "Poznámka"
};

const mapStateToProps = state => {
 	return { info: state.character.info };
};

const ConnectedList = ({info }) => (
  <ul className="list-group list-group-flush">
    {Object.keys(info).map( key => (
      <li key={key} className="list-group-item">
       {translations[key]}: {info[key]}
      </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;