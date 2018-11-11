const sumCollectionValues = (collection) => {
	return collection.reduce((sum, x) => sum + x, 0)
};

export default sumCollectionValues;
