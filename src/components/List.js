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
  "note": "Poznámka",
};

const mapStateToProps = (state) => {
  // console.log(JSON.stringify(state.getIn(['character', 'info']), null, 2))
 	return { info: state.getIn(['character', 'info'])};
};

const ConnectedList = ({info }) => (
  <ul className="list-group list-group-flush">
    {info.keySeq().map( key => (
      <li key={key} className="list-group-item">
       {translations[key]}: {info.get(key)}
      </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;