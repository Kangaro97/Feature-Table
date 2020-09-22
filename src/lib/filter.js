const filter = (data, filterStr) => {
	return data.filter((item) => {
		const hasMatch = Object.values(item).some((el) => {
			return el.toString().includes(filterStr);
		});
		return hasMatch;
	});
};
export default filter;
