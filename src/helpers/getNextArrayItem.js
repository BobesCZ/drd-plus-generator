const getNextArrayItem = (array, value) => {

  if (array.length && value.length ) {
  	let index = array.indexOf(value);

  	if (index === array.length) {
  		// Last item => no next
    	return false;
  	} 
  	else {
  		// Item => next item
  		return array[index + 1];
  	}
  	return index;
  }
  else {
    return false;
  }

};

export default getNextArrayItem;
