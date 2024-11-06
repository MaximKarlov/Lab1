axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/"
const limits = 5

const ApiKey = "150824fb8212adaf980d1e30dab97125"

async function searchCity(lat, lon) {
	try {
		const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limits}&appid=${ApiKey}&lang=ua&units=metric`)
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

async function searchCityWeather(query) {
	try {
		const response = await axios.get(`weather?q=${query}&appid=${ApiKey}&lang=ua&units=metric`)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export default {searchCityWeather, searchCity}
