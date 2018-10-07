const initialState = {
  // Main character object
  "character": {
    "info": {
      "name": "Default",
      "race": "",
      "career": "",
      "level": "",
      "sex": "",
      "note": ""
    }
  }
};

const rootReducer = (state = initialState, action) => {
 	switch (action.type) {
	    case "CHANGE_INFO":
        let key = action.payload.key;
        // @TODO: Learn how to properly use immutable Object assigning
        // https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread/
        console.log("rootReducer CHANGE_INFO")
        console.log(action.payload)

        let statusCopy = Object.assign({}, state);
        statusCopy.character.info[key] = action.payload.value;
        return {...state, character: statusCopy.character};
              
	    default:
      	return state;
  	}
};

export default rootReducer;