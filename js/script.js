const navCity = document.getElementById("navigatorCity")
const buttons = document.querySelectorAll(".listCityItem")
const weatherInfo = document.querySelector(".weatherInfo")

import Api from "/api/api.js"

buttons.forEach(el => {
	el.addEventListener("click", e => {
		e.preventDefault()
		buttons.forEach(el => el.classList.remove("active"))
		let self = e.currentTarget
		self.classList.add("active")
		const cityName = self.firstChild.data
		const id = self.id
		Api.searchCityWeather(`${id}`).then(data => {
			const dataWeather = data.weather[0]
			const dataMain = data.main
			const dataWind = data.wind
			weatherInfo.innerHTML = generateWeather(dataWeather, dataMain, cityName, dataWind)
		})
	})
})

const generateWeather = (dataWeather, dataMain, cityName, dataWind) => {
	let iconString = "https://openweathermap.org/img/wn/" + `${dataWeather.icon}` + "@2x.png"
	return `<h2>Погода у місті ${cityName}</h2>
    <img class='weatherImg' src="${iconString}" />
    <h3>${dataWeather.description}</h3>
    <ul class="weatherInfoList">
        <li class="weatherInfoItem">
            <p >Тиск</p>
            <p >${Math.round(dataMain.pressure)}</p>
        </li>
        <li class="weatherInfoItem">
            <p >Вологість</p>
            <p >${Math.round(dataMain.humidity)}</p>
        </li>
        <li class="weatherInfoItem">
            <p >Максимальна Температура</p>
            <p >${Math.round(dataMain.temp_max)}</p>
        </li>
        <li class="weatherInfoItem">
            <p >Мінімальна Температура</p>
            <p >${Math.round(dataMain.temp_min)}</p>
        </li>
        <li class="weatherInfoItem">
            <p >Відчувається як</p>
            <p >${Math.round(dataMain.feels_like)}</p>
        </li>
        <li class="weatherInfoItem">
            <p >Швидкість вітру</p>
            <p >${Math.round(dataWind.speed)}</p>
        </li>    
    </ul>`
}

const addNavigation = () => {
	console.dir(navCity)
	navCity.setAttribute("style", "display:flex")
	navigator.geolocation.getCurrentPosition(success)
	function success(pos) {
		const crd = pos.coords
		Api.searchCity(crd.latitude, crd.longitude).then(data => {
			navCity.textContent = navCity.id = data[0].local_names.uk
		})
	}
}

addNavigation()
