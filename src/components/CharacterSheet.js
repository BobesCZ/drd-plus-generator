// https://www.valentinog.com/blog/react-redux-tutorial-beginners/

import React from "react";
import { Provider, connect } from "react-redux";
import translations from "../translations";

const mapStateToProps = (state) => {
  // console.log(JSON.stringify(state.getIn(['character', 'info']), null, 2))
  return { info: state.getIn(['character', 'info'])};
};

const ConnectedSheets = ({info }) => (
  <ul className="list-group list-group-flush">
    {info.keySeq().map( key => (
      <li key={key} className="list-group-item">
       {translations[key]}: {info.get(key)}
      </li>
    ))}
  </ul>
);

const CharacterSheet = connect(mapStateToProps)(ConnectedSheets);

export default CharacterSheet;
