const express = require("express");
//a lib to run request from external servers
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){

    //create a request/post from a user
    const query = req.body.cityName;
    const apiKey = "f189c83ed85c53d15a09fe67bcfffdf8";
    const unit = "metric";

    //url for our open weather api
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + unit;

    //http get method we take two parameters the url and response func
    //
    https.get(url, function(response){
        console.log(response.statusCode);

        //send a data back using d response function and on method
        response.on("data", function(data){
            //convert the data in hexadecimal to json format in a var
            const weatherData = JSON.parse(data);

            //pick specific info
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            //add d icon value to d image url
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            //send a response to our app.get(browser) using the res not response
            //res can only be sent once or d server will crash but we can have multiple res.write
            res.write("<p>The weather Description is "+ weatherDesc +"</p>");
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees in celsius.</h1>");
            res.write("<img src="+ imageUrl + ">")
            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log("Server is live on port 3000");
})