//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// Variables Utilizadas en el codigo
const posts=[];


//app get

app.get("/", function(req, res){
  res.render("home", {
    textHome: homeStartingContent, 
    postContent: posts
  })
})

app.get("/topic/:topic", function(req, res){


  let search = _.lowerCase (req.params.topic);
  let findedTitle = 0
  


  posts.forEach(post => {
    
    let find = _.lowerCase(post.title)
    if (find == search) {

      console.log("Match")
      findedTitle = 1;
      //Publicar post nuevo en direccion buscada por el usuario (si esta existe)
      res.render("post", {
        titleNewPost:post.title,
        textNewPost: post.textL
      })
    } 
  });


  if ( findedTitle==0) {

    console.log("No Match")
    
  }
  
});
  

app.get("/about", function(req, res){
  res.render("about", {textAbout: aboutContent} )
})

app.get("/contact", function(req, res){
  res.render("contact", {textContact: contactContent} )
})

app.get("/compose", function(req, res){
  res.render("compose")
})

app.post("/compose", function(req, res){ 
  var para = req.body.composeText;
  var auxText = para;
  para= "";
  const words = auxText.split(" ");
  for (i = 0; i < 20; i++) {
    para += words[i] + " ";
  }
  para += "...";
  let urlAux= "/topic/"+ req.body.composeTitle
  console.log(urlAux)
  const post ={
    
    title : req.body.composeTitle,
    textS : para,
    textL : req.body.composeText,
    url: urlAux
  }

  posts.push(post);
  
  res.redirect("/")
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
