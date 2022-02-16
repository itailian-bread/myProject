const express = require("express");

const app = express();
const ejs = require("ejs");
const _ = require("lodash")

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


let arrayNotes = []
let idNum = 0

app.get("/",function(req,res){
  res.render("home",{listNotes : arrayNotes})
})

app.post("/add",function(req,res){
  const givenTitle = req.body.titleGiven;
  const givenContent = req.body.textArea
  const newIdGiven = idNum;
  arrayNotes.push({title:givenTitle , simpleTitle:_.kebabCase(givenTitle) ,  idKey:newIdGiven ,  content: givenContent});
  idNum += 1;
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const givenId = (req.body.selectedId)
  const newArray = arrayNotes.filter(note => note.idKey != givenId);
  arrayNotes = newArray;
  res.redirect("/");
})



app.get("/notes/:noteName", function(req,res){
  const givenParam = (req.params.noteName)
  const lastChr = givenParam.charAt(givenParam.length - 1)
  const foundArray = arrayNotes.find(element => element.idKey == lastChr);
  res.render("fullNote" , {title:foundArray.title , content:foundArray.content})

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
