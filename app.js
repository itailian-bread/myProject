const express = require("express");

const app = express();
const ejs = require("ejs");
const _ = require("lodash")

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


let arrayNotes = []

app.get("/",function(req,res){
  res.render("home",{listNotes : arrayNotes})
})

app.post("/add",function(req,res){
  const givenTitle = req.body.titleGiven;
  const givenContent = req.body.textArea
  arrayNotes.push({title:givenTitle , simpleTitle:givenTitle ,  content: givenContent});
  console.log(arrayNotes)
  res.redirect("/");
});

app.get("/notes/:noteName", function(req,res){
  const givenParam = req.params.noteName
  const foundArray = arrayNotes.find(element => element.simpleTitle === givenParam);
  res.render("fullNote" , {title:foundArray.title , content:foundArray.content})

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
