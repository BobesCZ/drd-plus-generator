import convertTables from '../data/convertTables';

const getDamageNumberTableValue = (column, row) => {
  if (column.toString.length && row.toString.length) {
    const result = convertTables.damageNumberTable[column][row];

    if (result) {
      return result;
    }
  }

  return false;
};

export default getDamageNumberTableValue;
