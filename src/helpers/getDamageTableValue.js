import convertTables from '../data/convertTables';

const getDamageTableValue = (number) => {
  if (number.toString.length) {
    const result = convertTables.damageTable[number];

    if (result) {
      return result;
    }
  }

  return false;
};

export default getDamageTableValue;
