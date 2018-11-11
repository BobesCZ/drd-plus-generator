const isTextInputFilled = (value) => {

	if (value.toString().trim().length > 0 ) {
		return true;
	}
	else {
		return false;
	}
};

export default isTextInputFilled;
