export function getNews() {
	return new Promise((resolve, reject) => {
		import("../news/data.json")
			.then(data => {
				resolve(data);
			})
			.catch(e => reject(e));
	});
}
