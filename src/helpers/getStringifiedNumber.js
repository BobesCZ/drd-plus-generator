// -1 => string "-1"
// 0 => string "0"
// 1 => string "+1"

const getStringifiedNumber = (num) => {
  let result;

  if (num > 0) {
    result = '+' + num;
  }
  else {
    result = num.toString();
  }
  return result;
};

export default getStringifiedNumber;
