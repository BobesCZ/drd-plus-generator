// returns a random number between min and max (both included)
const getRandomInteger = (min, max) => {

  if (typeof min === "number" && typeof max === "number" ) {
  	return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

};

export default getRandomInteger;
