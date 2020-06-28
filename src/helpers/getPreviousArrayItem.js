const getPreviousArrayItem = (array, value) => {
  if (array.length && value.length) {
    const index = array.indexOf(value);

    if (index < 1) {
      // First item => no previous
      return false;
    }
    else {
      // Item => previous item
      return array[index - 1];
    }
  }
  else {
    return false;
  }
};

export default getPreviousArrayItem;
