require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working
const express = require("express");

const https= require("https");

const app = express();
app.get("/",function(req,res){
    const url="https://api.openweathermap.org/data/2.5/weather?q=mangalore&appid=697307ceb5cad87b89b76061a49533b1"
    https.get(url,function(reponse){
        console.log(reponse.statusCode);

        reponse.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherdescp = weatherData.weather[0].description;
           
            console.log(weatherdescp);
        
           
        });

    });
    res.send("server is up and runnning");
});


app.listen(3000,function(){
    console.log("server is running on port 3000")
});