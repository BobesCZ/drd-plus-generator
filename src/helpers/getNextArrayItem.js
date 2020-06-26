const getNextArrayItem = (array, value) => {
  if (array.length && value.length) {
    const index = array.indexOf(value);

    if (index === array.length) {
      // Last item => no next
      return false;
    }
    else {
      // Item => next item
      return array[index + 1];
    }
  }
  else {
    return false;
  }
};

export default getNextArrayItem;
