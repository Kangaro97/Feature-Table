const sort = (array, key, order) => {
	return array.sort((a, b) => {
		if (a[key] < b[key]) {
			return order === 'ascending' ? -1 : 1;
		}
		if (a[key] > b[key]) {
			return order === 'ascending' ? 1 : -1;
		}
		return 0;
	});
};
export default sort;
