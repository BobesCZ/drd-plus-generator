const isTextInputFilled = (value) => {

  if (value.trim().length > 0 ) {
    return true;
  }
  else {
    return false;
  }

};

export default isTextInputFilled;
