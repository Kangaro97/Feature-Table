const getPaginated = (data, page, amount) => {
	const start = amount * (page - 1);
	const end = start + amount;
	return data.slice(start, end);
};
export default getPaginated;
