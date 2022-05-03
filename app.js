const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');


const homeStartingContent = "Hi, this is the Home page and this is where all my posts are going to be shown to you all. Enjoy!"
const aboutContent = "Hi, My name is Sushant Seth. I am a full stack developer. \nI love learning new latest technologies and am very passionate about my work";
const contactContent = "My mail id is email: sethsushantwork@gmail.com"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let allpost = [];
let alltitle = [];

app.get("/" ,function(req,res){


  res.render("home.ejs", {homeStartingContent:homeStartingContent, hometitle:alltitle, homepost:allpost });
});


app.get("/compose" ,function(req,res){

  res.render("compose.ejs");
});

app.post("/compose" , function(req,res){

  alltitle.push(req.body.title);

  allpost.push(req.body.post);
  res.redirect("/");
})

app.post("/" , function(req,res){
res.redirect("/");

})

app.get("/about" , function(req,res){
res.render("about.ejs", {aboutContent:aboutContent})

})

app.get("/contact" , function(req,res){
res.render("contact.ejs", {contactContent:contactContent})

})

app.get("/post/:t" , function(req,res){


  for(let i =0 ;i <alltitle.length ; i++){
    if(_.lowerCase(alltitle[i]) === _.lowerCase(req.params.t)){
      res.render("post.ejs", {posttitle:alltitle[i], postpost:allpost[i]});
    }else continue;

  } res.redirect("/")
})




app.listen(3000, function (){
  console.log("app working")
});
