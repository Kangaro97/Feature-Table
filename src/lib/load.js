const loadJSON = (url) => {
	return fetch(url)
		.then((res) => (res = res.json()))
		.then((data) => data)
		.catch((err) => console.error(err));
};
export default loadJSON;
