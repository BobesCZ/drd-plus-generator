const sumCollectionValues = (collection) => {
  return collection.reduce((sum, x) => parseInt(sum + x), 0);
};

export default sumCollectionValues;
