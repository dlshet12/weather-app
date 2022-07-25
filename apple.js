const express = require("express");

const https= require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended :true}));
app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");

});

 app.post("/",function(req,res){
   
   const query = req.body.cityName;
    const appkey = process.env.API_KEY;
    const unit = "metric";
    const url= process.env.URL + query +"&appid="+appkey+"&units="+unit+"";
    https.get(url,function(reponse){
        console.log(reponse.statusCode);

        reponse.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherdescp = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgurl=" http://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.write("<p>the weather currently is "+ weatherdescp +"</p>");
            res.write("<h1>The temperature is "+ query+" is "+ temp + "degrees celcius.</h1>");
            res.write("<img src="+ imgurl + ">");
        res.send() 
           
        });

    });
   
 }); 


app.listen(3000,function(){
    console.log("server is running on port 3000")
});