const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apikey="7efabb514883dd5b2b8b5d8fc318dec0";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
  const weatherData=JSON.parse(data)
  const temp=weatherData.main.temp;
  const weatherDescription=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
  const weatherReport=`<h3>The Weather is currently ${weatherDescription}</h3>
                        <h1>The temperature in ${query} is ${temp} degrees Celcius</h1>
                        <img src=${imgURL}>`;


  res.send(weatherReport);
  });
  });

});


app.listen(3000,function(){
  console.log("Server is started at port 3000");
});
