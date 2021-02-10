const express = require("express")
const https = require("https")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req , res){
  console.log(req.body.cityName);
  const query = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=09a485bca15a45318ec4c70e86cc7bba&units=metric"
  https.get(url, function(response) {
    console.log(response);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp1 = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp1 + " degree Celcius.</h1>")
      res.write("The weather is currently " + weatherData.weather[0].description)
      res.write("<img src=" + imageURL + " >")
      res.send()
    })
  })
});

app.listen(3000, function() {
  console.log("Server is running");
});
