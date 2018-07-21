const URL = 'http://localhost:5000'

export const getData = () => {
	fetch(URL, {method: 'GET'})
		.then(res => res.json())
		.then(data => {
			return data
		})
		.catch(err => {
			console.log(err)
		})
}