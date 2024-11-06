const express = require("express")
const path = require("path")
let hbs = require("hbs")
let app = express()

app.listen(3000, () => {
	console.log("Example apps listening on port 3000")
})

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")
app.use(express.static(__dirname + ""))

app.get("/", (req, res) => {
	const weather = {
		description: "Clear sky",
	}
	res.render("index.hbs", {weather})
})
app.get("/weather", (req, res) => {
	const weather = {
		description: "Clear sky",
	}
	res.render("weather.hbs", {weather})
})
