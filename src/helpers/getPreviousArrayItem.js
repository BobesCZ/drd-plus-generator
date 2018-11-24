const getPreviousArrayItem = (array, value) => {

  if (array.length && value.length ) {
  	let index = array.indexOf(value);

  	if (index < 1) {
  		// First item => no previous
    	return false;
  	}
  	else {
  		// Item => previous item
  		return array[index - 1];
  	}
  	return index;
  }
  else {
    return false;
  }

};

export default getPreviousArrayItem;
