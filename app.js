const { response } = require("express");
const express = require("express");
const https = require("https"); 
const bp = require("body-parser");
const app = express();

app.use(bp.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const query = req.body.city;
    console.log(req.body.city);
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=d67a9f74d64884a5af9707c42893dc10&unit=metric";
    console.log(url);
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            console.log(JSON.parse(data).main.temp);

            const img = "http://openweathermap.org/img/wn/"+JSON.parse(data).weather[0].icon+"@2x.png";
            res.write("<h1>temp is "+JSON.parse(data).main.temp+"</h1>");
            res.write("<p>weather is "+JSON.parse(data).weather[0].description+"</p>" );
            res.write("<img src ="+img+">");
            res.send();
        });
    });

});







app.listen(3000,function(){
    console.log("listening on 3000");
});